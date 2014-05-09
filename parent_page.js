  function initialize() {

     var tech = new google.maps.LatLng(42.057807,-87.675765);

      var mapOptions = {
        zoom: 18,
        center: tech
      };

      var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

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
        initialLocation = tech;
      } else {
        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
        initialLocation = tech;
      }
      map.setCenter(initialLocation);
    }

      var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    }

    //google.maps.event.addDomListener(window, 'load', initialize);