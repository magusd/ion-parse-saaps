'use strict';
angular.module('saaps.controllers')
    .controller('ProviderRequestCtrl', function($scope, Storage, Helpers, $state, User, Session, Auth) {
        $scope.formData = {
            items : {}
        };
        $scope.pushQueue = [];

        $scope.display = {
            cat: false,
            sub: false,
            item: false
        };

        User.getCategories().then(function(categories){
            $scope.categories = categories;
        });

        $scope.showCats = function(){
            $scope.display.cat = true;
            $scope.display.sub = false;
            $scope.display.item = false;
        };

        $scope.showSub = function(cat){
            $scope.display.cat = false;
            $scope.display.sub = true;
            $scope.display.cat = false;
            $scope.category = cat;
        };
        $scope.showItems = function(sub){
            $scope.display.cat = false;
            $scope.display.sub = false;
            $scope.display.item = true;
            $scope.subcategory = sub;
        };

        $scope.isActive = function(item){
            return !($scope.formData.items[item.objectId] === undefined);
        };

        $scope.toggleItem = function(item){
            if($scope.formData.items[item.objectId] === undefined){
                item.subcategory = $scope.subcategory;
                item.category = $scope.category;
                $scope.formData.items[item.objectId] = item;
                $scope.showCats();
                $scope.display.cat = false;
            }else{
                delete $scope.formData.items[item.objectId];
            }

        };

        $scope.requestAccess = function(){
            var items = [];
            angular.forEach($scope.formData.items, function(value, key) {
                this.push(key);
            }, items);

            var user = Session.getUser();
            var data = {
                providerItems: items,
                providerRequest: true
            };
            Auth.update(user.objectId, data, user.sessionToken)
                .success(function(data){
                    $state.go('app.provider');
                });

        };

    });