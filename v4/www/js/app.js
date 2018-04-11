var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

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
    var saved = { proc: {'id': 1, 'name': 'Procedure 1'} };
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
    //$scope.myVar = 'Trial Display';
    $scope.procedure = Proc.get();
    $scope.itemOnLongPress = function(){
        $scope.myVar = "Long Press";
    };
    $scope.itemOnTouchEnd = function(){
        $scope.myVar = "Touch end";
      };
}]);

app.directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart', function(evt) {
				// Locally scoped variable that will keep track of the long press
				$scope.longPress = true;

				// We'll set a timeout for 600 ms for a long press
				$timeout(function() {
					if ($scope.longPress) {
						// If the touchend event hasn't fired,
						// apply the function given in on the element's on-long-press attribute
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
						});
					}
				}, 600);
			});
            
			$elm.bind('touchend', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
});
