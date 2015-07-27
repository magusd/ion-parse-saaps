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
            },
            getEqual : function(array, key, value){
                var ret = [];
                if(array){
                    for(var i =0 ; i<array.length ; i++){
                        if(eval('array[i].'+key) === value){
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            },
            pointer : function(classname,objectId){
                return {
                    __type: "Pointer",
                    className: classname,
                    objectId: objectId
                };
            }
        };
    }]);