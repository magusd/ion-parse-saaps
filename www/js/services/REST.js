'use strict';

angular.module('saaps.services')
    .factory('REST',['$http', 'Session', 'PARSE_CREDENTIALS',function($http, Session, PARSE_CREDENTIALS){
        function url(classname, data){
            if(classname != 'User'){
                classname = 'classes/'+classname+'';
            }else{
                classname = 'users';
            }
            var url = 'https://api.parse.com/1/'+classname;
            if(data != undefined){
                url = url + '/' + data.objectId;
            }
            return url;
        };
        return {
            index:function(classname,params){
                return $http.get(url(classname),{
                        headers:{
                            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                        },
                        params: params
                    }
                );
            },
            create:function(classname, data, params){
                return $http.post(url(classname),data,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    params : params
                });
            },
            update:function(classname, data, params){
                return $http.put(url(classname,data),data,{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    params : params
                });
            },
            delete:function(classname, data){
                return $http.delete(url(classname,data),{
                    headers:{
                        'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                        'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                    }
                });
            },
            query:function(classname, params){
                return $http.get(url(classname),{
                        headers:{
                            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
                        },
                        params: params
                    }
                );
            },
            helpers:{
                userPointer : {
                    where:{
                        user: {
                            "__type": "Pointer",
                            "className":"_User",
                            "objectId": Session.getUser().objectId
                        }
                    }
                }
            }
        }
    }]);