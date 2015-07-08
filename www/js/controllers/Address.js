'use strict';
angular.module('saaps.controllers')
    .controller('AddressCtrl', function($scope, REST, Session, $ionicGesture, $ionicLoading) {
        $scope.classname = 'Address';
        $scope.addresses = [{}];

        $scope.loading = function(){
            $ionicLoading.show({
                template: 'Carregando...'
            });
        };
        $scope.remove = function(addr){
            $scope.loading();
            REST.delete($scope.classname,addr).success(function(data){
                $scope.index();
                $ionicLoading.hide();
            });
        };


        $ionicGesture.on('dragend',function(){
            $scope.index();
        },angular.element(document.getElementById('list')));

        $scope.index = function(){
            $scope.loading();
            var params = REST.helpers.userPointer;
            REST.query($scope.classname, params).success(function(data){
                $scope.addresses = data.results;
                $ionicLoading.hide();
            });
        };

        $scope.index();

    });