Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");

var x = getElementById("showLocation");
/*

var Child = Parse.Object.extend("Child");
var query = new Parse.Get(Child);
query.($("#childObjId").val(), {
  success: function(childId) {

    // The object was retrieved successfully.
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
*/


function getLocationInt(){
//Query this user's location at a set interval starting from when the page loads
  getLocation();
  setInterval(getLocation, 5000);
}


function getLocation(){
// Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(updatePosition, handleNoGeolocation(browserSupportFlag));
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
    } 
    else {
      alert("Your browser doesn't support geolocation.");
    }
  }
}

function updatePosition(position){
  x.innerHTML ="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + Math.random(); 
}


function raiseError(error){
	//set error field to true
	//set errormsg field to one of the following
	var errormsg;
	switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      errormsg="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      errormsg="Location information is unavailable."
      break;
    case error.TIMEOUT:
      errormsg="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      errormsg="An unknown error occurred."
      break;
    }
    alert(errormsg);
}





/*
Parse.initialize("NlM62oQaDFs1oPNPGgwZIS3uKgs0k8lDS6R8s7aO", "9Z7arzJtWrAGoaA5WAEJ98pocG0R2EV4I0WWrd6A");

var d = new Date(); 
var n = d.getTime()/3600000; 
var query = Parse.Query(Children);

window.getInterval(function() {
	// Every 15 minutes, get the user's location data and send it to the cloud

}, 1000*60*15);
*/