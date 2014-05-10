/*
This file contains all the code used to query the child's location and update the Parse database
*/
Parse.initialize(Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q, cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb);

var x = getElementById("showLocation");
function getLocationInt(){
//Query this user's location at a set interval starting from when the page loads
	getLocation();
  setInterval(getLocation, 1000);
}

function getLocation(){
//Obtains 
	if (geoPosition.init()){
		geoPosition.getCurrentPosition(updatePosition);
	}
}
function updatePosition(position){
  x.innerHTML ="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + Math.random();  
  
}




/*
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
}*/