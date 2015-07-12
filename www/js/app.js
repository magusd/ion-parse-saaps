'use strict';

angular.module('saaps', ['ionic', 'saaps.controllers','saaps.services','ui.utils.masks','Mac'])

    .run(function($ionicPlatform, $rootScope, $state, Session, Helpers) {
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

            if(Helpers.checkAuth())
                $state.go('facebook');
            if(Helpers.checkProfile())
                $state.go('app.profile');

        });
        $ionicPlatform.on("resume", function(){
            if(Helpers.checkAuth())
                $state.go('facebook');
            if(Helpers.checkProfile())
                $state.go('app.profile');
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            //Checks if state requires auth
            if (toState.data.authenticate) {
                if(Helpers.checkAuth()){
                    event.preventDefault();
                    $state.go('facebook');
                }
                if(toState.name != 'app.profile'){
                    if(Helpers.checkProfile()) {
                        event.preventDefault();
                        $state.go('app.profile');
                    }
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