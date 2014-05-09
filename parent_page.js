var initialLocation;
var tech = new google.maps.LatLng(42.057807,-87.675765);
var browserSupportFlag =  new Boolean();

Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");

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

function addChild() {
  var Child = Parse.Object.extend("Child");
  var child1 = new Child();
  child1.set("Name", $("#chld_id").val());
  child1.save(null, {
  success: function(child1) {
    // Execute any logic that should take place after the object is saved.
    console.log(child1.id)
    alert('New object created with objectId: ' + child1.id);
    $('#security_code').text(child1.id);
  },
  error: function(child1, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and description.
    alert('Failed to create new object, with error code: ' + error.description);
  }
});
}

// Modal animation
$('#save').click(function() {
      event.preventDefault();
      addChild();
      $('.to_hide').slideUp(400,function(){
        $('.to_show').slideDown();
      });
    return false;
});