

var x = getElementById("demo");
function getLocationatIntervals(){
//Query this user's location at a set interval starting from when the page loads
	setInterval(getLocation, 1000);
}

function getLocation(){
//Obtains 
	if (geoPosition.init()){
		geoPosition.getCurrentPosition(updatePosition, raiseError);
	}
}
function updatePosition(position){
	x.innerHTML = "Position Updated";
	//send Geopoint object called position to Parse Database
	//set child object's error attribute to false and his error message to null
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