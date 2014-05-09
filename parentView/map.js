// Note: This function requires that you consent to location sharing when
// prompted by your browser.

var map;
var overlay;
var floor = 1;



var locationArray = [];
// Check not necessary
// alert("Hello Word! "+locationArray[2]);

var locationNameArray = [];
var markers = [];
var image = 'me.png';


//Tech109 Add
var Tech109 = new google.maps.LatLng(42.0575, -87.6752778);



function initialize_map() {
  var srcImage, swBound, neBound;
  var mapOptions = {
    zoom: 18
  };


  map = new google.maps.Map(document.getElementById('childrenMap'),
      mapOptions);

  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  overlay = new google.maps.GroundOverlay(srcImage, bounds);
  overlay.setMap(map);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Here is your current location.'
      });
//      locationArray[0] = pos;
//      alert(pos);
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "I'm Here",
        icon: image
      });
      markers.push(marker);

  //    marker.setTitle(marker.title);
      }, function() {
        handleNoGeolocation(true);
      });
      } else {
    // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
//  alert(locationArray[0]);
  

  var coord;
  var i=0;
  for (coord in locationArray) {
    var marker = new google.maps.Marker({
      position: locationArray[coord],
      map: map,
      title: locationNameArray[coord]
    });
    markers.push(marker);

    marker.setTitle(marker.title);
    attachActivityMessage(marker, i);
    i++;
  }
  clearMarkers();
  
  //overlay.setMap(map);
}

function setAllMap(map){
  for(var i=0; i<markers.length; i++){
    markers[i].setMap(map);
  }
}
function clearMarkers(){
  setAllMap(null);
}

function deleteMarkers(){
  setAllMap(null);
  markers=[];
}
var nameofbathroom;

function attachActivityMessage(marker, num){
  var message = '<a data-toggle="modal" data-target="#details" id = "'+
  locationNameArray[num]+
  '">'+locationNameArray[num]+'</a>';
    var infowindow = new google.maps.InfoWindow({
    content: message    
  });

  google.maps.event.addListener(marker, 'click', function(){

    // $('#details').modal('show');
    infowindow.open(marker.get('map'), marker);
    // alert(locationNameArray[num]);
  });
}


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: Tech109,
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}



google.maps.event.addDomListener(window, 'load', initialize_map);


function Sam(){
      var pos;
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);
         console.log(pos);
         map.setCenter(pos);
         var infowindow = new google.maps.InfoWindow({
           map: map,
           position: pos,
           content: 'Here is Sam.'
         });
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: 'Sam',
           icon: image
         });
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

};

function Alice(){
      var pos;
      clearMarkers();

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);
         console.log(pos);
         map.setCenter(pos);
         var infowindow = new google.maps.InfoWindow({
           map: map,
           position: pos,
           content: 'Here is Alice.'
         });
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           title: 'Alice',
           icon: image
         });
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
      // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }

};







































