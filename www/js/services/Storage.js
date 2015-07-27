'use strict';

angular.module('saaps.services')
    .factory('Storage',function(){
        /**
         * Sets data in local storage
         * @param key key as in key-value
         * @param data data is value as in key-value
         */
        var set = function(key, data) {
            var store = {
                data : data,
                time : new Date().getTime()
            };
            window.localStorage[key] = JSON.stringify(store);
        };
        /**
         * Returns data from local storage, defaults to {}
         * @param key key to be looked in localstorage
         * @param expires_in if passed will check if data in local storage is newer then today+expires_in
         * @returns {*}
         */
        var get = function(key,expires_in){

            var data = JSON.parse(window.localStorage[key] || '{}');

            //Does not check for expiration
            if(expires_in === undefined){
                if(data.hasOwnProperty('data'))
                    return data.data;
                else
                    return data;
            }else{
                //Checking expiration
                var expiration = new Date();
                expiration.setTime(data.time + expires_in);
                if(data.hasOwnProperty('time')
                    && new Date().getTime() < expiration.getTime()){
                    data.isCached = true;
                    return data;
                }else{
                    return {};
                }
            }
        };
        /**
         * Deletes data from key from local storage
         */
        var clear = function(key){
            window.localStorage.removeItem(key);
        };

        /**
         * helper object for constants
         * @type {{SECOND: number, MINUTE: number, HOUR: number, DAY: number}}
         */
        var TIME = {
            SECOND : 1000,
            MINUTE : 60000,
            HOUR : 3600000,
            DAY : 86400000
        };
        return {
            get: get,
            set : set,
            clear : clear,
            TIME : TIME
        }
    });