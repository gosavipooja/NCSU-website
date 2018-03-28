angular.module('root', []).controller("index", ["$scope", "$http", function ($scope, $http) {
    console.log("welcome");
    $scope.pageTitle = "ProcApp";
    $scope.procName = "Tooth Extraction";
}]);