var settingsMap = [];
var geocoder = [];
var addressMarker = [];
var alertSettings = [];
var Circle = [];

function mapAddress(childNumber) {
    //When user inputs an address and clicks the 'Show on Map' buttone, 
    //the address is shown on map with a marker
    
    var address = document.getElementById(childNumber.toString() + "streetAddress").value;
    geocoder[childNumber].geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            settingsMap[childNumber].setCenter(results[0].geometry.location);
            settingsMap[childNumber].setZoom(17);
            addressMarker[childNumber].setMap(settingsMap[childNumber]);
            addressMarker[childNumber].setPosition(results[0].geometry.location);
            addressMarker[childNumber].setDraggable(true);

            //draw default circle on map
            var radius = document.getElementById(childNumber.toString() + 'radius');
            var r = Number(radius.options[radius.selectedIndex].value);
            var circleOptions = {
                strokeColor: '#FF0000',
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: settingsMap[childNumber],
                center: results[0].geometry.location,
                radius: r
            };
            Circle[childNumber].setOptions(circleOptions);
            Circle[childNumber].bindTo('center', addressMarker[childNumber], 'position');
        } 
        else {
        alert(status +"Address not found");
      }
    });
}


function drawCircle(radius, childNumber) {
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
                center: addressMarker[childNumber].getPosition(),
                radius: r
            };
    Circle[childNumber].setOptions(circleOptions);
    console.log("dsf");
    console.log(addressMarker[childNumber].getPosition());
}


function getAlertSettings(child_id,childNumber) {
    //When user submits the alert settings, it is validated and stored into
    // a new alertSettings object
    var CN = childNumber.toString();
    var h1 = document.getElementById(CN + 'startHour');
    var m1 = document.getElementById(CN + 'startMinute');
    var tod1 = document.getElementById(CN + 'startTimeOfDay');
    var h2 = document.getElementById(CN + 'endHour');
    var m2 = document.getElementById(CN + 'endMinute');
    var tod2 = document.getElementById(CN + 'endTimeOfDay');
    var radius= document.getElementById(CN + 'radius');
    
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
    var startTime={
        hour: startHr,
        minute: startMin
    };
    var endTime={
        hour: endHr,
        minute: endMin
    };

    alertSettings[childNumber]={
        id : child_id,
        startTime: startTime,
        endTime: endTime,
        center: addressMarker[childNumber].getPosition(),
        radius: r 
    };
    console.log("pos confirmed");
    console.log(alertSettings[childNumber]);

    var upload_child_setting = new Parse.Query("Child");
    upload_child_setting.equalTo("objectId", child_id);
    upload_child_setting.find({
    success: function(child) {
      // The object was retrieved successfully. Update database.
      child[0].set("setting", {"set":true,'alertSettings':alertSettings[childNumber]});
      child[0].save();
      console.log("setting updated");
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      console.log("child setting can not be updated");
      }
    });
} 