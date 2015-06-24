'use strict';

angular.module('saaps.services')
    .factory('Session',function(){
        /**
         * Sets user data in local storage
         * @param user_data
         */
        var setUser = function(user_data) {
            window.localStorage['user'] = JSON.stringify(user_data);
        };
        /**
         * Returns user data from local storage, defaults to {}
         * @returns {*}
         */
        var getUser = function(){
            return JSON.parse(window.localStorage['user'] || '{}');
        };
        /**
         * Deletes user from local storage, used in logout
         */
        var deleteUser = function(){
            window.localStorage.clear();
        };

        return {
            getUser: getUser,
            setUser : setUser,
            deleteUser : deleteUser
        }
    });