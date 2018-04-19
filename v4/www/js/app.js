var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

app.config(function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/list.html',
        controller: 'index'
    }).when('/details', {
        templateUrl: 'partials/details.html',
        controller: 'index'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});

app.factory('Storage', ['$window', function ($window) {
    return {
        get: function (key) {
            var value = $window.localStorage[key];
            return value ? JSON.parse(value) : null;
        },
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        }
    }
}]);

app.controller('index', ['$scope', '$location', 'Storage', function ($scope, $location, Storage) {

    $scope.proclist = {};
    $scope.data = {};
    $scope.procedure = {};
    $scope.selected_step = {};

    $scope.init = function () {
        console.log('init called');
        if (Storage.get('data')) {
            console.log('Stored data found.');
            $scope.data = Storage.get('data');
            $scope.proclist = Storage.get('proclist');
        } else {
            console.log('No stored data found.');
            initializeData();
            console.log('Data is set: ' + Storage.get('data'));
        }
        $scope.procedure = Storage.get('procedure');
        $scope.selected_step = Storage.get('selected_step');
    };

    $scope.itemOnLongPress = function (pstep) {
        console.log("Long Press event. For step: " + JSON.stringify(pstep));
    };
    $scope.itemOnTouchEnd = function (pstep) {
        console.log("Touch end event. For step: " + JSON.stringify(pstep));
    };

    $scope.openStep = function (pstep) {
        console.log('displaying step: ' + pstep);
        Storage.set('selected_step', pstep);
        $scope.selected_step = pstep;
        console.log('selected step is: ' + Storage.get('selected_step').id);
    }

    $scope.openProc = function (proc) {
        console.log('opening proc: ' + JSON.stringify(proc))
        Storage.set('procedure', proc);
        console.log('set the following proc in storage: ' + JSON.stringify(Storage.get('procedure')));
        $location.path('details');
    };

    $scope.goBack = function () {
        $location.path('');
    };

    var initializeData = function () {
        console.log('initializing data.');
        var proclist = [
            { 'id': 1, 'name': 'TOOTH EXTRACTION' },
            { 'id': 2, 'name': 'DENTAL - CROWN REPLACEMENT' },
            { 'id': 3, 'name': 'Procedure 3' },
            { 'id': 4, 'name': 'Procedure 4' }
        ];
        var data = {
            'TOOTH EXTRACTION': [
                { 'id': '1', 'text': 'Unstow from Dental Subpack: Elevator,301 (Dental-4) 34S (Dental-4)' },
                { 'id': '2', 'text': 'Anesthetize area where tooth is to be extracted' },
                { 'id': '2.1', 'text': 'Place correct Forceps on tooth to be extracted exerting force toward root of tooth and squeeze Forceps with moderate force. Use other hand to grasp onto both sides of gum tissue of tooth to be extracted (if an upper tooth) or to hold lower jaw from moving (if a lower tooth) ' },
                { 'id': '2.2', 'text': 'Exert moderate side-to-side force (tongue to cheek) holding for 30 seconds in each direction. Continue this motion until tooth loosens and comes up out of socket on its own. ' },
                { 'id': '2.3', 'text': 'If after several minutes, tooth has not increased in mobility, continue to step 6.' },
                { 'id': '4', 'text': 'From cheek side, place small Elevator 301 between tooth to be extracted and adjacent tooth with lower edge of Elevator against tooth to be extracted. Apply moderate rotational force to Elevator (as if turning a screwdriver) creating a lifting force on tooth to be extracted and hold for 60 seconds. Apply this force sequentially on both front and back side of tooth. Once tooth is slightly elevated then repeat with large Elevator 34S.' },
                { 'id': '5', 'text': 'When tooth removed, fold Gauze Pad and apply to bleeding socket until bleeding stops.' },
                { 'id': '6', 'text': 'Dispose of blood soaked Gauze Pad in Ziplock Bag (P4-B7). (blue) Affix appropriate Biohazard Decal (CCPK) and dispose of Ziplock Bag in biohazardous trash.' }
            ],
            'DENTAL - CROWN REPLACEMENT': [
                { 'id': '1', 'text': 'Unstow:\nAMP Carver File (Dental-1)\n(blue) Tongue Depressor (P3-A9)\nDycal Base (Dental-8)\nDycal Catalyst (Dental-8)\nCotton Swabs (P2-B3)\nGauze Pads (4) (P3-B4)\nDental Floss (Dental-10)' },
                { 'id': '2', 'text': 'Remove residual cement from crown and tooth utilizing Carver File.' },
                { 'id': '3', 'text': 'Carefully check fit of crown by replacing on tooth and biting down.' },
                { 'id': '4', 'text': 'Remove and dry off crown.' },
                { 'id': '5', 'text': 'Dry off with Gauze Pads and isolate tooth as well as possible.' },
                { 'id': '6', 'text': 'Place a 1.5 cm (0.5 inch) line of both Dycal Base and Dycal Catalyst on one end of Tongue Depressor and mix well with stick end of Cotton Swab.' },
                { 'id': '7', 'text': 'Place small portion of Dycal mixture around inside walls of crown and seat crown on tooth using a positive rocking force.' },
                { 'id': '8', 'text': 'Have patient bite down on cotton tip end of Cotton Swab for 3 seconds. Remove Cotton Swab and have patient bite down to determine if crown is fully seated.' },
                { 'id': '9', 'text': 'If crown not fully seated, carefully remove crown by prying up at different locations on crown margin with Carver File until crown is loose. Remove crown and return to step 2.' },
                { 'id': '10', 'text': 'If crown is fully seated, replace Cotton Swab over crown and have patient continue biting on Cotton Swab with moderate pressure for 5 minutes.' },
                { 'id': '11', 'text': 'Gently clean remaining cement from around gum with Carver File and Dental Floss. Place a knot in center of a 45-cm (18-inch) piece of Dental Floss and glide it back and forth gently between crown and adjacent teeth to clean cement from between teeth.' },
                { 'id': '12', 'text': 'Contact Surgeon for further instructions.' },
            ],
            'Procedure 3': [],
            'Procedure 4': []
        };
        var sidenotes = [
            {
                'TOOTH EXTRACTION': {
                    'notes': 'Tooth Extraction is a last resort and is reserved only for those cases where pain is excessive or an infective process has set in and the amount of time remaining for the mission is greater than the time to safely control infection with antibiotics. A course of antibiotics will not cure a tooth infection, and more definitive care is always necessary. Extraction should only be done when all other treatment options have been exhausted and on consultation with Surgeon.',
                    'media': '',
                    'comments': '',
                    'timer': true
                }
            },
            {
                'DENTAL - CROWN REPLACEMENT': {
                    'notes': 'If there is no pain, especially when eating or drinking, stow crown in secure location and crown can safely be placed upon return. Perform crown replacement procedure in event of pain and discomfort.',
                    'media': '',
                    'comments': '',
                    'timer': false
                }
            },
            {
                'Procedure 3': {
                    'notes': '',
                    'media': '',
                    'comments': '',
                    'timer': false
                }
            },
            {
                'Procedure 4': {
                    'notes': '',
                    'media': '',
                    'comments': '',
                    'timer': false
                }
            }
        ]
        Storage.set('data', data);
        Storage.set('proclist', proclist);
        $scope.data = data;
        $scope.proclist = proclist;
        console.log('data initialized');
    };

    $scope.resetLocalStorage = function() {
        console.log('clearing local data');
        Storage.set('data', null);
        Storage.set('proclist', null);
    };

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
