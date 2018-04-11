var app = angular.module('myApp', ['ngRoute']);

app.config(function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/list.html',
        controller: 'listController'
    }).when('/details', {
        templateUrl: 'partials/details.html',
        controller: 'detailsController'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});

app.factory('Proc', function ($rootScope) {
    var saved = {
    	proc: {'id': 1, 'name': 'Procedure 1'}
    };
    function set(p){    	
    	saved.proc = p;    	
    }
    function get(){
    	return saved.proc;
    }
    return {
    	set: set,
    	get: get
    }
});

app.controller('listController', ['$scope', '$location', 'Proc', function ($scope, $location, Proc) {

    $scope.global = {};

    $scope.proclist = [
        { 'id': 1, 'name': 'Procedure 1' }, { 'id': 2, 'name': 'Procedure 2' }, { 'id': 3, 'name': 'Procedure 3' }, { 'id': 4, 'name': 'Procedure 4' }
    ];

    $scope.openProc = function (proc) {
        console.log('opening proc: ' + proc)
        Proc.set(proc);
        console.log('factory saved proc is: ' + JSON.stringify(Proc.get()));
        $location.path('details');
    }
}]);

app.controller('detailsController', ['$scope', '$location', 'Proc', function ($scope, $location, Proc) {

    $scope.global = Proc.get();

    $scope.check_value = function() {
        console.log('global value in this controller is: ' + JSON.stringify($scope.global));
    }
}]);