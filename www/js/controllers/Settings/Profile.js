angular.module('saaps.controllers')
    .controller('ProfileCtrl', function($scope, $state, Session, REST, Auth, $ionicLoading) {
        $scope.user = {};

        $scope.cancel = function(){
            angular.copy(Session.getUser(),$scope.user);
        };

        $scope.save = function(){
            $ionicLoading.show({
                template: 'Salvando...'
            });
            console.log(Session.getUser());
            if($scope.myForm.$valid){
                var user = Session.getUser();
                delete $scope.user.emailVerified;
                user.sessionToken;
                Auth.update(user.objectId, $scope.user, user.sessionToken).success(
                    function(data){
                            user.cpf = data.cpf;
                            user.email = data.email;
                            user.name = data.name;
                            user.phone = data.phone;
                            user.updatedAt = data.updatedAt;
                            user.username = data.username;
                        Session.setUser(user);
                        $state.go('app.settings');
                }).error(function(data){
                        console.log(data);
                        alert('Falha ao atualizar os dados, tente novamente.');
                    });
            }else{
                alert('Todos os dados são obrigatórios.');
            }
            $ionicLoading.hide();
        };

        $scope.cancel();
    });