/*
Remaining Sub Tasks: 
    Most Important
    1) Write code to test and check distance of child from center point.
    2) Integrate with settings page
    3) Include email alert function

    1)Clicking enter key after entering street address does not show marker on map. It refreshes the page. We need to fix this. 
    2) Formatting all the elements on this page
    3) Include days of week settings for alert
    
*/


var geocoder;
var map;
var addressMarker;
var alertSettings;


function initialize(){
    //Executed on page load. Displays default map settings.

    geocoder = new google.maps.Geocoder();
    addressMarker = new google.maps.Marker();    
    var mapOptions = {
        center: new google.maps.LatLng(39.083333,-98.583333),
        zoom: 2
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

function mapAddress(){
    //When user inputs an address and clicks the 'Show on Map' buttone, 
    //the address is shown on map with a marker

    var address = document.getElementById("streetAddress").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(17);
            addressMarker.setMap(map);
            addressMarker.setPosition(results[0].geometry.location);
            addressMarker.setDraggable(true);

            //draw default circle on map
            var radius = document.getElementById('radius');
            var r = Number(radius.options[radius.selectedIndex].value);
            var circleOptions = {
                strokeColor: '#FF0000',
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: map,
                center: results[0].geometry.location,
                radius: r
            };
            Circle = new google.maps.Circle(circleOptions);
            Circle.bindTo('center', addressMarker, 'position');
        } 
        else {
        alert(status +"Address not found");
      }
    });
}


function drawCircle(radius){
    //When the user changes the radius setting, the circle drawing on the map
    //dynamically changes according to the new radius that the user selected

    var r = Number(radius);
    var circleOptions = {
                strokeColor: '#FF0000',
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: map,
                center: addressMarker.getPosition(),
                radius: r
            };
    Circle.setOptions(circleOptions);
}


function getAlertSettings(){
    //When user submits the alert settings, it is validated and stored into
    // a new alertSettings object

    var h1 = document.getElementById('startHour');
    var m1 = document.getElementById('startMinute');
    var tod1 = document.getElementById('startTimeOfDay');
    var h2 = document.getElementById('endHour');
    var m2 = document.getElementById('endMinute');
    var tod2 = document.getElementById('endTimeOfDay');
    var radius= document.getElementById('radius');

    var startHr = Number(h1.options[h1.selectedIndex].value);
    var startMin= Number(m1.options[m1.selectedIndex].value);
    var startTod= tod1.options[tod1.selectedIndex].value;
    var endHr = Number(h2.options[h2.selectedIndex].value);
    var endMin= Number(m2.options[m2.selectedIndex].value);
    var endTod= tod2.options[tod2.selectedIndex].value;
    var r = Number(radius.options[radius.selectedIndex].value); 

    //adjust time to 24 hour scale
    if(startTod =="PM") startHr = startHr+12;
    if(endTod=="PM") endHr = endHr+12;

    alertSettings={
        startHour: startHr,
        startMinute: startMin,
        endHour: endHr,
        endMinute: endMin,
        position: addressMarker.getPosition(),
        radius: r 
    };
    executeAlert();
} 

function executeAlert(){
    //carries out background tasks of alert: check time range, check distance, if 
    //the current time falls within the alert time settings abd the child's location
    //is outside the radius, send an alert to the parent.

    var timeInBounds = checkTime(alertSettings.startHour, alertSettings.startMinute, alertSettings.endHour, alertSettings.endMinute);
    alert("current time is in bounds: "+timeInBounds);

    //if(timeRange){childOutOfBounds = checkDistance(r);}
    //if(childOutofBounds){sendAlert();} 
}

function checkTime(startHr, startMin, endHr, endMin){
    var startTimeCheck;
    var endTimeCheck;
    var now = new Date();
    min = now.getMinutes();
    hour = now.getHours();

    //check if current time is >= start time
    if (hour>startHr){startTimeCheck=true;}
    else if(hour==startHr){
        if (min>=startMin){startTimeCheck=true;}
        else{startTimeCheck=false;}
    }
    else{startTimeCheck=false;}

    //check if current time is <= end time
    if(hour<endHr){endTimeCheck=true;}
    else if(hour==endHr){
        if(min<=endMin){endTimeCheck=true;}
        else{endTimeCheck=false;}
    }
    else{endTimeCheck=false;}

    //if both times check out, return call
    if (startTimeCheck && endTimeCheck){return true;}
    else {return false;}
}

function checkDistance(radius){
    //Craig - integration with Settings page
    //var center = alertSettings.position;
}

function sendAlert(){
    console.log("alert triggered");
    //Xiaoyang's function
}