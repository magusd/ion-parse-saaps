'use strict';
angular.module('saaps.controllers')
    .controller('ProviderCtrl', function($scope, $state, User, Session) {
        User.isProvider().then(function(isProvider){
                $scope.isProvider = isProvider;
            });
        User.hasRequestedProvider().then(function(hasRequestedProvider){
                $scope.hasRequestedProvider = hasRequestedProvider;
            });
    });
