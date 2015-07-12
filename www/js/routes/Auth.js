'use strict';

angular.module('saaps')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "templates/auth/login.html",
                controller: 'AuthCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('facebook', {
                url: "/facebook",
                templateUrl: "templates/auth/facebookLogin.html",
                controller: 'FacebookCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('lostpassword', {
                url: "/lostpassword",
                templateUrl: "templates/auth/lostPassword.html",
                controller: 'AuthCtrl',
                data: {
                    authenticate: false
                }
            })
            .state('register', {
                url: "/register",
                templateUrl: "templates/auth/register.html",
                controller: 'AuthCtrl',
                data: {
                    authenticate: false
                }
            })
    });