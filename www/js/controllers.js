angular.module('saaps.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, Auth) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};
        $scope.registerData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.loginModal = modal;
        });
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.registerModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.loginModal.hide();
        };
        // Triggered in the login modal to close it
        $scope.closeRegister = function() {
            $scope.registerModal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.loginModal.show();
        };
        $scope.register = function() {
            $scope.registerModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);


        };
        // Perform the login action when the user submits the login form
        $scope.doLoginFacebook = function() {
            alert('Doing facebook login');


        };
        $scope.doRegister = function() {
            console.log('Doing registration', $scope.registerData);

            Auth.register($scope.registerData)
                .success(function(data, status, headers, config) {
                    alert(data.objectId);
                    alert(data.sessionToken);
                    console.log(data,status,headers,config);
                }).
                error(function(data, status, headers, config) {
                    switch (data.code){
                        case 202:
                            alert('username taken');
                            break;
                        case 203:
                            alert('email taken');
                            break;
                        default:
                            alert('não é possível fazer seu registro neste momento, verifique seus dados e tente mais tarde');
                    };
                    console.log(data,status,headers,config);
                });
        };
    })

    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })

    .controller('AuthCtrl', function($scope, Auth) {

    });
