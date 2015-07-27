angular.module('saaps.services')
    .factory('User',function(Session, Auth, $state, $http, Storage,$q, Helpers, $ionicLoading, REST){

        var hasRequestedProvider = function () {
            var promise = $q.defer();
            var token = Session.getUser().sessionToken;
            Auth.check(token)
                .success(function(data){
                    promise.resolve(data.providerRequest === true);
                })
                .error(function(data){
                    Session.deleteUser();
                    $state.go('facebook');
                });
            return promise.promise;
        };

        var isProvider = function () {
            var promise = $q.defer();
            var token = Session.getUser().sessionToken;
            Auth.check(token)
                .success(function(data){
                    promise.resolve(data.providerApproved === true);
                })
                .error(function(data){
                    Session.deleteUser();
                    $state.go('facebook');
                });
            return promise.promise;
        };
        var fetchCategories = function(){
            var info = $q.defer();
            var categories = Storage.get('categories',Storage.TIME.DAY * 7);
            if(categories.isCached){
                info.resolve(categories.data);
            }else{
                REST.index("Category").success(function(data){
                    Storage.set('categories',data.results);
                    info.resolve(data.results);
                });
            }
            return info.promise;
        };

        var fetchSubCategories = function(){
            var info = $q.defer();
            var subcategories = Storage.get('subcategories', Storage.TIME.DAY * 7);
            if(subcategories.isCached){
                info.resolve(subcategories.data);
            }else{
                REST.index("Subcategory").success(function (data) {
                    Storage.set('subcategories',data.results);
                    info.resolve(data.results);
                });
            }
            return info.promise;
        };

        var fetchSubCategoryItems = function(){
            var info = $q.defer();
            var subcategoryItems = Storage.get('subcategoryItems', Storage.TIME.DAY * 7);
            if(subcategoryItems.isCached){
                info.resolve(subcategoryItems.data);
            }else{
                REST.index("SubcategoryItem").success(function (data) {
                    Storage.set('subcategoryItems',data.results);
                    info.resolve(data.data);
                });
            }
            return info.promise;
        };
        var getCategories = function(){
            var info = $q.defer();

            $ionicLoading.show({
                template: 'Carregando...'
            });
            var categories = [];
            var subcategories = [];
            var subcategoryItems = [];
            fetchCategories().then(function(data){
                categories = data;
                fetchSubCategories().then(function(data){
                    subcategories = data;
                    fetchSubCategoryItems().then(function(data){
                        subcategoryItems = data;
                        for(var i = 0; i<categories.length ; i++){
                            var sub = Helpers.getEqual(subcategories, 'category.objectId', categories[i].objectId);
                            categories[i].subcategories = sub;
                            for(var j = 0 ; j < sub.length; j++){
                                var id = categories[i].subcategories[j].objectId;
                                var items = Helpers.getEqual(subcategoryItems, 'Subcategory.objectId', id);
                                categories[i].subcategories[j].items = items;
                            }
                        }
                        info.resolve(categories);
                        $ionicLoading.hide();
                    });
                });
            });
            return info.promise;
        };
        return {
            hasRequestedProvider : hasRequestedProvider,
            isProvider : isProvider,
            getCategories : getCategories,
            fetchCategories: fetchCategories,
            fetchSubCategories: fetchSubCategories,
            fetchSubCategoryItems: fetchSubCategoryItems
        };
    });