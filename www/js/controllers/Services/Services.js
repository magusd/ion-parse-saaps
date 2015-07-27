angular.module('saaps.controllers')
    .controller('ServicesCtrl', function($scope, $ionicLoading, $state, Session, User) {
        $scope.classname = "";
        $scope.categories = [];
        $scope.categoryRows = [];

        $scope.categoryToRows = function(){
            for(var i = 0; i < $scope.categories.length ; i+=3){
                var row = [];
                for(var j = 0 ; j < 3; j++){
                    row.push($scope.categories[i+j]);
                }
                $scope.categoryRows.push(row);
            }
        };

        $scope.index = function(){
            User.getCategories().then(function(categories){
                $scope.categories = categories;
                $scope.categoryToRows();
            });




            var today = new Date();
            var hours = today.getHours();
            $scope.todayString = ("0"+today.getDate()).slice(-2) + "/" + ("0"+(today.getMonth()+1)).slice(-2);
            if(hours < 12){
                $scope.saudation = "Bom dia";
            }else if(hours < 18){
                $scope.saudation = "Boa tarde";
            }else{
                $scope.saudation = "Boa noite";
            }
            $scope.user = Session.getUser();
        };




        $scope.index();
    });
