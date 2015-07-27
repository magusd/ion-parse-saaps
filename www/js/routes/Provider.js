'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.provider', {
                url: "/provider",
                views: {
                    'menuContent': {
                        templateUrl: "templates/provider/index.html",
                        controller: "ProviderCtrl"
                    }
                },
                data: {
                    authenticate: true
                }
            })
            .state('app.providerAccessRequest', {
                url: "/provider/request",
                views: {
                    'menuContent': {
                        templateUrl: "templates/provider/requestForm.html",
                        controller: "ProviderRequestCtrl"
                    }
                },
                data: {
                    authenticate: true
                }
            });
    });