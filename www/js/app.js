'use strict';

angular.module('saaps', ['ionic', 'saaps.controllers','saaps.services','ui.utils.masks','Mac'])

    .run(function($ionicPlatform, $rootScope, $state, Session) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (!Session.getUser().objectId === undefined){
                $state.go('login');
            }else{

                //$state.go('app.services');
            }
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            //Checks if state requires auth
            if (toState.data.authenticate) {
                //Check if user has auth
                if(Session.getUser().objectId === undefined){
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    })
    .value('PARSE_CREDENTIALS',{
        APP_ID: 'g1KDgiOsfu9jvqtSQu4l5xGhgpMJ0gJw2ndEnjgd',
        REST_API_KEY:'q5INJRFqH2FMEFW4AkeL3d4ueQfEqqPfuO6lAd8T'
    });

angular.module('saaps.controllers',[]);
angular.module('saaps.services',[]);