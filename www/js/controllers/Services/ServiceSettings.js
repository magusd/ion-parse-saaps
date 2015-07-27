angular.module('saaps.controllers')
    .controller('ServiceSettingsCtrl', function($scope, $state, Session, REST, Auth, $ionicLoading) {
        $scope.settings = {
          distance: 12
        };
    });
