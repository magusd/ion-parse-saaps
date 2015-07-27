angular.module('saaps.controllers')
    .controller('FacebookCtrl', function($scope, $state, Auth, $ionicPopup, Session, REST, $q, $ionicLoading, FACEBOOK_APP_ID) {
        $scope.classname = 'User';

        var fbLogged = $q.defer();

        var randomPass = function()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

//This is the success callback from the login method
        var fbLoginSuccess = function(response) {
            if (!response.authResponse){
                fbLoginError("Cannot find the authResponse");
                return;
            }
            var expDate = new Date(
                new Date().getTime() + response.authResponse.expiresIn * 1000
            ).toISOString();

            var authData = {
                id: String(response.authResponse.userID),
                access_token: response.authResponse.accessToken,
                expiration_date: expDate
            }
            fbLogged.resolve(authData);
        };

        //This is the fail callback from the login method
        var fbLoginError = function(error){
            fbLogged.reject(error);
            alert(error);
            $ionicLoading.hide();
        };

        //this method is to get the user profile info from the facebook api
        var getFacebookProfileInfo = function () {
            var info = $q.defer();
            facebookConnectPlugin.api('/me', "",
                function (response) {
                    info.resolve(response);
                },
                function (response) {
                    info.reject(response);
                }
            );
            return info.promise;
        };

        $scope.login = function () {
            if (!window.cordova) {
                //this is for browser only
                facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
            }
            facebookConnectPlugin.getLoginStatus(function (success) {

                facebookConnectPlugin.login(['email','public_profile'], fbLoginSuccess, fbLoginError);
                fbLogged.promise.then(function (authData) {
                    user = {
                        authData:{
                            facebook : {
                                id: authData.id,
                                access_token: authData.access_token,
                                expiration_date: authData.expiration_date

                            }
                        }
                    };
                    Auth.facebook(user).success(function(parseUser, status){
                        if(status == 200){
                        // login
                            Session.setUser(parseUser);
                            $state.go('app.services');
                        //login
                        }else if(status == 201){
                        //sign up
                            getFacebookProfileInfo().then(function (fbinfo) {
                                var user = {
                                    email : fbinfo.email,
                                    username : fbinfo.email,
                                    name : fbinfo.name
                                };
                                //Set facebook data
                                Auth.update(parseUser.objectId,user,parseUser.sessionToken).success(function(data){
                                    //Set local data
                                    Auth.check(parseUser.sessionToken).success(function(data){
                                        Session.setUser(data);
                                        $state.go('app.profile');
                                    });
                                });
                            });
                        //sign up
                        }
                    });
                });
            });
        };
        $scope.logout = function(){
            Session.deleteUser();
        }
    });