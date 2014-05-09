var initialLocation;
var tech = new google.maps.LatLng(42.057807,-87.675765);
var browserSupportFlag =  new Boolean();

function initialize() {
  var myOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
    } else {
      alert("Your browser doesn't support geolocation.");
    }
    initialLocation = tech;
    map.setCenter(initialLocation);
  }
}

//google.maps.event.addDomListener(window, 'load', initialize);

// Add an item to the dropdown list
var addItem = function(item) {
  $("drop_list").append('<li data-filtertext="'+item+'">'+item+'</li>');
}

// Modal animation
$("#save").click(function() {
      event.preventDefault();
      
      $('.to_hide').slideUp(400,function(){
        $('.to_show').slideDown();
      });
    return false;
});