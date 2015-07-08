'use strict';

angular.module('saaps.services')
    .factory('Maps',function($rootScope,$q,$http){
        var initialize = function(){
            var deferred = $q.defer();
            var location = new google.maps.LatLng(43.07493,-89.381388);
            var mapOptions = {
                center: location,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);


            var geocoder = new google.maps.Geocoder();

           var marker = new google.maps.Marker({
                position: location,
                map: map
                //draggable: true
            });


            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
                e.preventDefault();
                return false;
            });
            $rootScope.map = map;
            $rootScope.geocoder = geocoder;
            $rootScope.marker = marker;

            deferred.resolve();
            return deferred.promise;
        };

        var centerOnMe = function() {
            var deferred = $q.defer();

            if(!$rootScope.map) {
                deferred.reject('Greeting ' + name + ' is not allowed.');
                return;
            }

            navigator.geolocation.getCurrentPosition(function(pos) {
                $rootScope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                markerPosition(pos.coords.latitude,pos.coords.longitude);
                deferred.resolve(pos);
            }, function(error) {
                deferred.reject('Unable to get location: ' + error.message);
            });
            return deferred.promise;
        };

        var marker = function(lat,lng){
            var location = new google.maps.LatLng(lat,lng);
            $rootScope.marker = new google.maps.Marker({
                position: location,
                map: $rootScope.map,
                draggable: true
            });
        };

        var markerPosition = function(lat,lng){
            var location = new google.maps.LatLng(lat,lng);
            $rootScope.marker.setPosition(location);
        };

        var markerMoveCallback = function(move){
            google.maps.event.addListener($rootScope.marker, 'drag', function () {
                $rootScope.geocoder.geocode({ 'latLng': $rootScope.marker.getPosition() }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            move(results[0]);
                        }
                    }
                });
            });
        }

        var mapPosition = function(lat,lng){
            var location = new google.maps.LatLng(lat,lng);
            $rootScope.map.setCenter(location);
            //$rootScope.map.setZoom(16);
        };

        var centerOnAddress = function(address){
            var deferred = $q.defer();
            $rootScope.geocoder.geocode({ 'address': address + ' , Brasil', 'region': 'BR' }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        deferred.resolve(results);
                    }else{
                        deferred.reject('Unable to get location results.');
                    }
                }else{
                    deferred.reject('Unable to get location.');
                }
            });
            return deferred.promise;
        };

        var getAddressFromLocation = function(lat,lng){
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true';
            return $http.get(url);
        };

        var LocationToLat = function(location){
            if(typeof location['lat'] == 'function'){
                return location.lat();
            }else{
                return location.lat;
            }
        };
        var LocationToLng = function(location){
            if(typeof location['lng'] == 'function'){
                return location.lng();
            }else{
                return location.lng;
            }
        };
        return {
            initialize : initialize,
            centerOnMe : centerOnMe,
            markerPosition : markerPosition,
            mapPosition : mapPosition,
            centerOnAddress: centerOnAddress,
            markerMoveCallback : markerMoveCallback,
            getAddressFromLocation : getAddressFromLocation,
            LocationToLat : LocationToLat,
            LocationToLng : LocationToLng
        };
    });