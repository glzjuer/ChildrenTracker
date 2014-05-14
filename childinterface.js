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

  function handleNoGeolocation(errorFlag) {
    var x = document.getElementById("showLocation");
    if (errorFlag == true) {
      x.innerHTML = "Geolocation service failed.";
    } 
    else {
      x.innerHTML="Your browser doesn't support geolocation.";
    }
  }
}

function updatePosition(position){
  //Update position in Parse database
  Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
  var childID= getIDfromURL();
  var query = new Parse.Query("Child");
  query.get(childID, {
  success: function(child) {
      // The object was retrieved successfully. 
      child.set("CurrentLocation", position);
      child.save;
    },
      error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      alert("child object could not be updated");

      }
    });

  //Display coordinates on childinterface screen
  var x = document.getElementById("showLocation");
  var showposition = "Latitude: "+ position.coords.latitude + 
  "<br>Longitude: " + Math.random(); 
  x.innerHTML =showposition;
}

function getIDfromURL(){
  var childId = window.location.search.substring(1);
  alert(childId);
  return childId;
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