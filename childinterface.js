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
  self.setInterval(getLocation, 60000);
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

  //Display coordinates on childinterface screen
  var x = document.getElementById("showLocation");
  var showposition = "Latitude: "+ position.coords.latitude + 
  "<br>Longitude: " + Math.random(); 
  x.innerHTML =showposition;

  var childID= getIDfromURL();
  console.log("  child object id:" + childID);
  //Update position in Parse database
  Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
  
  var query = new Parse.Query("Child");
  query.equalTo("objectId", childID);
  query.find({
    success: function(child) {
      console.log("child object found: "+childID);
      // The object was retrieved successfully. Update database.
      currentlocation = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
      child[0].set("CurrentLocation", currentlocation);
      child[0].save();
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      console.log("child object could not be updated");
      }
    });  
}

function getIDfromURL(){
  var childId = window.location.search.substring(1);
  console.log("getIDfromURL called:" +childId);
  return childId;
}