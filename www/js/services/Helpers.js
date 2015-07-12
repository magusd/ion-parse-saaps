'use strict';

angular.module('saaps.services')
    .factory('Helpers',['Session', '$state',function(Session,$state){
        return {
            checkAuth : function(event){
                var user = Session.getUser();
                if (user.objectId === undefined){
                    return true;
                }else{
                    return false;
                }

            },
            checkProfile : function(){
                var user = Session.getUser();
                if(user.cpf === "" || user.phone === ""){
                    return true;
                }else{
                    return false;
                }
            }
        };
    }]);