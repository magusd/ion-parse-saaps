'use strict';

angular.module('saaps.services')
    .constant("FACEBOOK_APP_ID", "851341254973418")
    .factory('Auth',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
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
                    });
            },
            /**
             * Attempts to login user
             * @param data
             * @returns {HttpPromise}
             */
            attempt:function(data){
                return $http({
                    url: 'https://api.parse.com/1/login',
                    method: 'GET',
                    params:{
                        username: data.email,
                        password: data.password
                    },
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                    }
                });
            },
            /**
             * Asks for password reset link
             * @param data
             * @returns {HttpPromise}
             */
            lostPassword:function(data){
                return $http.post('https://api.parse.com/1/requestPasswordReset',data,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type':'application/json'
                    }
                });
            },
            logout:function(data){
                return $http.post('https://api.parse.com/1/logout',{
                    headers: {
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                        'X-Parse-Session-Token': data.sessionToken
                    }
                });
            },
            facebook:function(){
                alert('Doing facebook login');
            }
        }
    }]);