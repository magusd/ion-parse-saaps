'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.services', {
                url: "/services",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                },
                data: {
                    authenticate: true
                }
            });
    });