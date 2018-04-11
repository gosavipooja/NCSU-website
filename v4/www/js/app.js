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
    }

}]);