'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings/settings.html"
                    }
                },
                data: {
                    authenticate: false
                }
            })
            .state('app.address', {
                url: "/settings/address",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings/address.html",
                        controller: "AddressCtrl"
                    }
                },
                data: {
                    authenticate: false
                }
            })
            .state('app.newAddress', {
                url: "/settings/address/:objectId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings/address.create.html",
                        controller: "AddressCreateCtrl"
                    }
                },
                data: {
                    authenticate: false
                }
            });
    });