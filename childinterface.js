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

var to_push;

$(document).ready(function() {
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
    setInterval(push_history, 15000);


    // console.log(s);
  // nIntervId = setInterval(updatePosition, 5000);
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
  console.log("45!!");
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

  //Display coordinates on childinterface screen
  to_push = {"Latitude":position.coords.latitude,"Longitude":position.coords.longitude};
  var showposition = "Latitude: "+ position.coords.latitude + 
  "<br>"+" Longitude: " + position.coords.longitude +
  "<br>" +  Math.random(); 
  $('#showLocation').html(showposition);




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


