angular.module('saaps.controllers')
.controller('AuthCtrl', function($scope, $ionicLoading, $ionicPopup, $state, Auth, Session) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.lostPassword = false;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.registerData = {};
    $scope.lostPasswordData = {};

    $scope.$on('$ionicView.enter',function(e){
        $scope.user = Session.getUser();
    });


    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log($scope.loginData);
        Auth.attempt($scope.loginData)
            .success(function(data, status, headers, config) {
                Session.setUser(data);
                $state.go('app.services');
            })
            .error(function(data, status, headers, config) {
                switch (status){
                    case 401:
                        alert('email ou senha invalidos');
                        break;
                    default:
                        alert('não é possível fazer seu login neste momento, verifique seus dados ou tente mais tarde');
                };
                console.log(data,status,headers,config);
            });;

    };
    // Perform the login action when the user submits the login form
    $scope.doLoginFacebook = function() {
        Auth.facebook();
        //register user with fb login in authData

    };
    $scope.doRegister = function() {
        if(!$scope.registerForm.$valid){
            alert('verifique seus dados');
            return;
        }
        $scope.registerData.username = $scope.registerData.email;
        Auth.register($scope.registerData)
            .success(function(data, status, headers, config) {
                var session = data;
                var user = config.data;
                user.createdAt = session.createdAt;
                user.objectId = session.objectId;
                user.sessionToken = session.sessionToken;

                Session.setUser(user);
                $state.go('app.services');
            }).
            error(function(data, status, headers, config) {
                switch (data.code){
                    case 125:
                        alert('email inválido');
                    case 202:
                        alert('username já cadastrado');
                        break;
                    case 203:
                        alert('email já cadastrado');
                        break;
                    default:
                        alert('não é possível fazer seu registro neste momento, verifique seus dados ou tente mais tarde');
                };
                console.log(data,status,headers,config);
            });
    };
    $scope.lostPassword = function(){

        Auth.lostPassword($scope.lostPasswordData)
            .success(function(data, status, headers, config) {
                $scope.passwordSent = true;
            })
            .error(function(data, status, headers, config) {
                switch(data.code){
                    case 125:
                        alert('email inválido, verifique seus dados');
                        break;
                    case 205:
                        alert('usuario não encontrado com este email');

                }
            });
    };
    $scope.doLogout = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Log out',
            template: 'Você tem certeza que quer sair?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                //logout
                $ionicLoading.show({
                    template: 'Saindo...'
                });
                Session.deleteUser();
                $state.go('facebook');
                $ionicLoading.hide();
            }
        });
        /*

        Auth.logout(Session.getUser())
            .success(function(data, status, headers, config){
                $state.go('facebook');
                console.log(data, status, headers, config);
            })
            .error(function(data, status, headers, config){
                console.log(data, status, headers, config);
            });
        */
    }
});