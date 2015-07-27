'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.services', {
                url: "/services",
                views: {
                    'menuContent': {
                        templateUrl: "templates/services/search.html",
                        controller: "ServicesCtrl"
                    }
                },
                data: {
                    authenticate: true
                }
            })
            .state('app.category', {
                url: "/services/:categoryId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/services/category.html",
                        controller: 'ServiceCtrl'
                    }
                },
                data: {
                    authenticate: true
                }
            })
            .state('app.requestCreate', {
                url: "/services/create/:categoryId/:itemId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/services/create.html",
                        controller: 'ServiceCtrl'
                    }
                },
                data: {
                    authenticate: true
                }
            })
            .state('app.searchSettings', {
                url: "/searchSettings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/services/settings.html",
                        controller: "ServiceSettingsCtrl"
                    }
                },
                data: {
                    authenticate: true
                }
            });
    });