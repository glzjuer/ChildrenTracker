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
  alert("getLocationInt function called");
  getLocation();
  self.setInterval(getLocation, 60000);
}


function getLocation(){
  alert("getLocation function called");
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
  alert("updatePosition function called");

  //Display coordinates on childinterface screen
  var x = document.getElementById("showLocation");
  var showposition = "Latitude: "+ position.coords.latitude + 
  "<br>Longitude: " + Math.random(); 
  x.innerHTML =showposition;

  //Update position in Parse database
  Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
  var childID= getIDfromURL();
  alert("child object id:" + childID);
  var query = new Parse.Query("Child");
  query.equalTo("objectId", childID);
  query.find({
    success: function(child) {
      alert("child object found");
      // The object was retrieved successfully. Update database.
      currentlocation = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});
      child[0].set("CurrentLocation", currentlocation);
      child[0].save();
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
      alert("child object could not be updated");
      }
    });  
}

function getIDfromURL(){
  var childId = window.location.search.substring(1);
  alert("getIDfromURL function called");
  return childId;
}