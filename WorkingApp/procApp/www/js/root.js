function initializeTabs() {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabcontent[0].style.display = "block";
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    tablinks[0].className += " active";
}

function eventColor(evt, tdbox) {
    document.getElementsByClassName("box").addClass("taphold");
    
}
function tapholdHandler( event ){
    event.target.addClass( "taphold" );
 }
/*
    <script>
            $(function(){
              $( "td.box" ).bind( "taphold", tapholdHandler );
             
              function tapholdHandler( event ){
                $( event.target ).addClass( "taphold" );
              }
            });
    </script>

*/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set the date we're counting down to
var countDownDate = new Date("Sep 1, 2018 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var timerContent = '';

    if (days) {
        timerContent += days + ' days ';
    }
    if (hours) {
        timerContent += hours + ' hours ';
    }
    if (minutes) {
        timerContent += minutes + ' minutes ';
    }
    if (seconds) {
        timerContent += seconds + 'seconds ';
    }

    // Display the result in the element with id="demo"
    document.getElementById("timerPlaceholder").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timerPlaceholder").innerHTML = "EXPIRED";
    }
}, 1000);


angular.module('root', []).controller("index", ["$scope", "$http", function ($scope, $http) {
    console.log("welcome");

    $scope.procName = "Tooth Extraction";
    
}]);


