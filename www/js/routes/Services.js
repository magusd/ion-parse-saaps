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
                    authenticate: false
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });