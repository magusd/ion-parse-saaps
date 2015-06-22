'use strict';

angular.module('saaps.services',[]).factory('Auth',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        /**
         * Sends registration data and returns promise for success/error callbacks
         * @param data
         * @returns {HttpPromise}
         */
        register:function(data){
            return $http.post('https://api.parse.com/1/users',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },

        /**
         * Returns the user or false if sessionToken has expired or is incorrect
         * @param sessionToken
         * @returns {*}
         */
        check:function(sessionToken){
            return $http.get('https://api.parse.com/1/users/me',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'X-Parse-Session-Token:': sessionToken
                }
            })
                .success(function(data){
                    return data;
                })
                .error(function(){
                    return false;
                })
            ;

        },
        attempt:function(data){

        }
    }
}])
    .factory('Session',function(){
    //for the purpose of this example I will store user data on ionic local storage
    var setUser = function(user_data) {
        window.localStorage['user'] = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage['user'] || '{}');
    };

    var deleteUser = function(){
        window.localStorage.clear();
    };

    return {
        getUser: getUser,
        setUser : setUser,
        deleteUser : deleteUser
    }
});