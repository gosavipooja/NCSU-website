angular.module('root', []).controller("index", ["$scope", "$http", function ($scope, $http) {
    console.log("welcome");

    $scope.procName = "Tooth Extraction";
    
}]);
