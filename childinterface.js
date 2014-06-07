/*

var Child = Parse.Object.extend("Child");
var query = new Parse.Get(Child);
query.($("#childId").val(), {
  success: function(childId) {

    // The object was retrieved successfully.
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
*/

var childId;
var q;
var current;
var currentChild_alertsetting;
var currentChild_name;
var currentChild_parent_id;
var currentChild_parent_email;
var to_push;

$(document).ready(function() {
  Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
  // var url = location.search; 
  //   // theRequest = new Object();
  //   var str = url.substr(1);
    // strs = str.split("&");
    // for(var i = 0; i < strs.length; i ++) {
    //    theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    // }

    q = new Q();
    getIDfromURL();
    // setInterval(updatePosition,5000);
    var currentChild = new Parse.Query("Child");
    currentChild.equalTo("objectId", childId);
    currentChild.find({
      success: function(child) {
        // console.log("child object found: "+childId);
        // The object was retrieved successfully. Update database.
        // currentlocation = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
        // console.log(currentlocation);
        current = child[0];
        currentChild_alertsetting = child[0].get('setting');
        currentChild_name = child[0].get('Name');
        currentChild_parent_id = child[0].get("parent").id;
        currentChild_parent_email = child[0].get("parent").email;
        $('#name').text($('#name').text()+ currentChild_name);
        $("#parent").text($("#parent").text()+child[0].get("parent").name);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        console.log("child object could not be retrieved");
        }
      });

    setInterval(push_history, 60*1000);


})
  function push_history(){
    
    var query = new Parse.Query("Child");
    query.equalTo("objectId", childId);
    query.find({
      success: function(child) {
        console.log("child location found: "+child[0].get("history"));
        // The object was retrieved successfully. Update database.
        q.body = child[0].get("history");

        q.push(to_push);

        console.log("history now: "+q.body);
        child[0].set("history", q.body);
        child[0].save();
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        console.log("child object could not be updated");
        }
      });  


  }


function getLocationInt(){
//Query this user's location at a set interval starting from when the page loads
  getLocation();
  self.setInterval(getLocation, 5000);

}


function getLocation(){
// Try W3C Geolocation (Preferred)
  
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(updatePosition, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }


}

function handleNoGeolocation(errorFlag) {
  var x = document.getElementById("showLocation");
  if (errorFlag == true) {
    x.innerHTML = "Geolocation service failed.";
  } 
  else {
    x.innerHTML="Your browser doesn't support geolocation.";
  }
}

function updatePosition(position){
// console.log("check called");
  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  if(currentChild_alertsetting.set){
    executeAlert(currentChild_alertsetting.alertSettings,pos);}
  else console.log("Not setting yet");
  

  //Display coordinates on childinterface screen
  to_push = {"Latitude":position.coords.latitude,"Longitude":position.coords.longitude};
  var showposition = "Latitude: "+ position.coords.latitude + 
  "<br>"+" Longitude: " + position.coords.longitude +
  "<br>" +  Math.random(); 
  $('#showLocation').html(showposition);

  console.log("lat:"+ position.coords.latitude+" long:"+ position.coords.longitude);



  //Update position in Parse database
  Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
  
  // var childID= getIDfromURL(); 
  var query = new Parse.Query("Child");
  query.equalTo("objectId", childId);
  query.find({
    success: function(child) {
      console.log("child object found: "+childId);
      // The object was retrieved successfully. Update database.
      currentlocation = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
      console.log(currentlocation);
      child[0].set("CurrentLocation", currentlocation);
      child[0].save();
      currentChild_alertsetting=child[0].get("setting");
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      console.log("child object could not be updated");
      }
    });  
}

function getIDfromURL(){
  childId = window.location.search.substring(1);
  console.log("getIDfromURL called: childId=" +childId);
  return childId;
}

//alert from child side

function executeAlert(alertSettings,currentlocation) {
    //carries out tasks of alert: check time range, check distance, if 
    //the current time falls within the alert time settings abd the child's location
    //is outside the radius, send an alert to the parent.

    console.log(alertSettings.center);
    var timeInBounds = checkTime(alertSettings.startTime, alertSettings.endTime);
    var google_version_center = new google.maps.LatLng(alertSettings.center.k, alertSettings.center.A);
    if(timeInBounds){ 
        var childOutOfBounds = checkDistance(alertSettings.radius,currentlocation,google_version_center);
    }
    else {console.log("time not in range");return false}
    if(childOutOfBounds){
      cloud_call_to_alert(currentChild_name);

    }
}

function checkTime(startTime, endTime){
    var startTimeCheck;
    var endTimeCheck;

    var startHr = startTime.hour;
    var startMin = startTime.minute;
    var endHr = endTime.hour;
    var endMin = endTime.minute;
    
    var now = new Date();
    min = now.getMinutes();
    hour = now.getHours();
    console.log(hour+','+min);

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
    // console.log(startTimeCheck);
    // console.log(endTimeCheck);
    if (startTimeCheck && endTimeCheck){console.log("check time success");return true;}
    else {return false;}
}

function checkDistance(radius,position_of_child,center){
    //Craig - integration with Settings page
    //SETTINGS INTEGRATION
    console.log("pc");
    console.log(position_of_child);
    console.log("center");
    console.log(center);
    var distFromCenter = google.maps.geometry.spherical.computeDistanceBetween(center, position_of_child);
    console.log("distance from center in meters: "+distFromCenter);
    console.log("radius setting: "+radius);
     if (distFromCenter>radius){return true;}
     else {return false;}    
}

function cloud_call_to_alert() {
    Parse.Cloud.run('alert_email', {"child":currentChild_name,"parent_email":currentChild_parent_email}, {
      success: function(status) {
        console.log(status);
        // ratings should be 4.5
      },
      error: function(error) {
        console.log(error);
      }
    });
  }



