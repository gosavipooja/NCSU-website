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
    var saved = { proc: { 'id': 1, 'name': 'Procedure 1' } };
    function set(p) {
        saved.proc = p;
    }
    function get() {
        return saved.proc;
    }
    return {
        set: set,
        get: get
    }
});

app.controller('listController', ['$scope', '$location', 'Proc', function ($scope, $location, Proc) {

    $scope.global = {};

    // this would be fetched from local database later.
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

    $scope.procedure = Proc.get();

    $scope.itemOnLongPress = function () {
        console.log("Long Press event.");
    };
    $scope.itemOnTouchEnd = function () {
        console.log("Touch end event.");
    };

    $scope.selected_step = {};

    // this would be fetched from local database later.
    $scope.procsteps = [
        { 'id': '1', 'text': 'Unstow from Dental Subpack: Elevator,301 (Dental-4) 34S (Dental-4)' },
        { 'id': '2', 'text': 'Anesthetize area where tooth is to be extracted' },
        { 'id': '2.1', 'text': 'Place correct Forceps on tooth to be extracted exerting force toward root of tooth and squeeze Forceps with moderate force. Use other hand to grasp onto both sides of gum tissue of tooth to be extracted (if an upper tooth) or to hold lower jaw from moving (if a lower tooth) ' },
        { 'id': '2.2', 'text': 'Exert moderate side-to-side force (tongue to cheek) holding for 30 seconds in each direction. Continue this motion until tooth loosens and comes up out of socket on its own. ' },
        { 'id': '2.3', 'text': 'If after several minutes, tooth has not increased in mobility, continue to step 6.' },
        { 'id': '4', 'text': 'From cheek side, place small Elevator 301 between tooth to be extracted and adjacent tooth with lower edge of Elevator against tooth to be extracted. Apply moderate rotational force to Elevator (as if turning a screwdriver) creating a lifting force on tooth to be extracted and hold for 60 seconds. Apply this force sequentially on both front and back side of tooth. Once tooth is slightly elevated then repeat with large Elevator 34S.' },
        { 'id': '5', 'text': 'When tooth removed, fold Gauze Pad and apply to bleeding socket until bleeding stops.' },
        { 'id': '6', 'text': 'Dispose of blood soaked Gauze Pad in Ziplock Bag (P4-B7). (blue) Affix appropriate Biohazard Decal (CCPK) and dispose of Ziplock Bag in biohazardous trash.' }
    ];

    $scope.openStep = function (pstep) {
        console.log('displaying step: ' + pstep);
        $scope.selected_step = pstep;
        console.log('selected step is: ' + $scope.selected_step.id);
    }

}]);

app.directive('onLongPress', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            $elm.bind('touchstart', function (evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                $timeout(function () {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function () {
                            $scope.$eval($attrs.onLongPress)
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function (evt) {
                // Prevent the onLongPress event from firing
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.onTouchEnd)
                    });
                }
            });
        }
    };
});
