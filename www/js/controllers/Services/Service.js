angular.module('saaps.controllers')
    .controller('ServiceCtrl', function($scope, $state, $ionicLoading, Session, User, Helpers, REST) {
        $scope.category = {};
        $scope.item = {};
        $scope.requestData = {};


        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.index = function() {
            User.getCategories().then(function(categories){
                $scope.categories = categories;
                var categoryId = $state.params.categoryId;
                $scope.category = Helpers.getEqual($scope.categories, 'objectId', categoryId)[0];

                if($state.params.itemId){
                    User.fetchSubCategoryItems().then(function(subcategoryItems){
                        $scope.item = Helpers.getEqual(subcategoryItems, 'objectId', $state.params.itemId)[0];
                        var params = {
                            where:{
                                user: {
                                    "__type": "Pointer",
                                    "className":"_User",
                                    "objectId": Session.getUser().objectId
                                }
                            }
                        };
                        REST.query('Address', params).success(function(data){
                            $scope.addresses = data.results;
                        });
                    });
                }
            });
        };

        $scope.save = function(){
            if($scope.requestForm.$valid){
                var addr = JSON.parse($scope.requestData.address);
                var data = {
                    item : Helpers.pointer("SubcategoryItem",$scope.item.objectId),
                    title : $scope.requestData.title,
                    description : $scope.requestData.description,
                    location : addr.geopoint,
                    address : Helpers.pointer("Address",addr.objectId),
                    user : Helpers.pointer("_User",Session.getUser().objectId)
                };
                REST.create('ServiceRequest',data).success(function(response,status){
                    if(status === 201){
                        //$state.go('')
                    }else{
                        alert('Erro ao salvar seu pedido! Tente novamente mais tarde.');
                    }
                });
            }else{
                //alert('preencha os campos corretamente');
            }


        }
    });
