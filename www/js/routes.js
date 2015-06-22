'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'AuthCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('register', {
                url: "/register",
                templateUrl: "templates/register.html",
                controller: 'AuthCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl',
                data: {
                    authenticate: false
                }
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                },
                data: {
                    authenticate: false
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                },
                data: {
                    authenticate: false
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                },
                data: {
                    authenticate: false
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                },
                data: {
                    authenticate: false
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });