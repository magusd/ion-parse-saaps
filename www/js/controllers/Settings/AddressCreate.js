'use strict';
angular.module('saaps.controllers')
    .controller('AddressCreateCtrl', function($scope, $ionicScrollDelegate, $state, REST, Maps, Auth, Session, $ionicLoading) {
        $scope.classname = 'Address';
        $scope.formData = {};
        $scope.addressResults = [];
        $scope.parseData = {};
        $scope.cleanParseData = {
            name: '',
            place: '',
            components: {
                placeId: '',
                nick: '',
                cep: '',
                streetNumber: '',
                street: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                location: {
                    lat: '',
                    lng: ''
                }
            }
        };
        angular.copy($scope.cleanParseData, $scope.parseData);
        $scope.save = function(){
            if($scope.parseData.components.streetNumber.length < 1){
                alert('Preencha o número do seu endereço.');
                return;
            }
            if($scope.parseData.components.street.length < 5){
                alert('Preencha o nome da sua rua.');
                return;
            }
            if($scope.parseData.components.nick.length < 3){
                alert('Dê um nome para este endereço.');
                return;
            }
            if(!$scope.parseData.components.location.lat ||
                !$scope.parseData.components.location.lng){
                alert('Encontre seu endereço no mapa.');
                return;
            }
            var data = $scope.parseData.components;
            var location = data.location;
            delete data.location;
            delete data.placeId;
            data.geopoint = {
                "__type": "GeoPoint",
                    "latitude": location.lat,
                    "longitude": location.lng
            };
            data.user = {
                "__type": "Pointer",
                "className":"_User",
                "objectId": Session.getUser().objectId
            };
            $scope.loading();
            REST.create($scope.classname,data).success(function(){
                angular.copy($scope.cleanParseData, $scope.parseData);
                $ionicScrollDelegate.scrollTop();
                $ionicLoading.hide();
                $state.go('app.address');
            });

        };
        $scope.setParseData = function(addr){
            angular.copy($scope.cleanParseData, $scope.parseData);
            angular.forEach(addr.address_components, function(value, key) {
                switch(value.types[0]){
                    case "postal_code":
                        $scope.parseData.components.cep = value.long_name;
                        break;
                    case "neighborhood":
                        $scope.parseData.components.neighborhood = value.long_name;
                        break;
                    case "sublocality_level_1":
                        if(!$scope.parseData.components.neighborhood){
                            $scope.parseData.components.neighborhood = value.long_name;
                        }
                        break;
                    case "locality":
                        $scope.parseData.components.city = value.long_name;
                        break;
                    case "administrative_area_level_2":
                        if(!$scope.parseData.components.city){
                            $scope.parseData.components.city = value.long_name;
                        }
                        break;
                    case "administrative_area_level_1":
                        if(!$scope.parseData.components.state){
                            $scope.parseData.components.state = value.long_name;
                        }
                        break;
                    case "street_number":
                        $scope.parseData.components.streetNumber = value.long_name;
                        break;
                    case "route":
                        $scope.parseData.components.street = value.long_name;
                        break;
                }
            });
            $scope.parseData.name = addr.formatted_address;
            $scope.parseData.components.placeId = addr.place_id;
            $scope.parseData.components.location.lat = Maps.LocationToLat(addr.geometry.location);
            $scope.parseData.components.location.lng = Maps.LocationToLng(addr.geometry.location);
            console.log(Maps.LocationToLat(addr.geometry.location));
            console.log(Maps.LocationToLng(addr.geometry.location));
            if( $scope.parseData.components.location.lat
              && $scope.parseData.components.location.lng
            ){
                $scope.parseData.valid = true;
            }else{
                $scope.parseData.valid = false;
            }
        };
        $scope.pick = function(addr){
            $scope.setParseData(addr);
            $scope.addressResults = [];
            var lat = Maps.LocationToLat(addr.geometry.location);
            var lng = Maps.LocationToLng(addr.geometry.location);

            Maps.mapPosition(lat,lng);
            Maps.markerPosition(lat,lng);
        };
        $scope.centerOnAddress = function(){
            Maps.centerOnAddress($scope.formData.cep).then(
                function(results){
                    $scope.addressResults = results;
                }
            );
        };

        $scope.centerOnMe = function(){
            $scope.loading();
            Maps.centerOnMe().then(
                function(success){
                    var location = success.coords;
                    Maps.getAddressFromLocation(location.latitude,location.longitude)
                        .success(function(data){
                            console.log(data.results[0]);
                            $scope.pick(data.results[0]);
                        });
                    $ionicLoading.hide();
                },
                function(error){
                    console.log(error)
                },
                function(update){}
            );
        };

        $scope.loading = function(){
            $ionicLoading.show({
                template: 'Localizando...'
            });
        };

        Maps.initialize().then(function(){
            /*
            $ionicLoading.show({
                template: 'Localizando...'
            });
            $scope.centerOnMe();
            */
        });
        Maps.markerMoveCallback(function(result){
            $scope.pick(result);
        });
    });