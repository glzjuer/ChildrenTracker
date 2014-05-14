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
  
var theRequest;
var strs;
var currentUser;
$(document).ready(function() {
    
    Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
    currentUser=Parse.User.current();

    var url = location.search; 
    theRequest = new Object();
    var str = url.substr(1);
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
       theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }
    console.log( "ready!" );

    // var ul = $('#drop');
    // currentUser.  
      
    // li = document.createElement("li");   
      
    // txt = document.createTextNode("Sam");  
      
    // li.className = 'new';  
      
    // li.onclick = function() {alert('helo');}  
      
    // li.appendChild(txt);  
              
    // ul.appendChild(li);  

    var my_children = currentUser.get('children_array');
    console.log(my_children);
    $.each(my_children,function(index,value){
      console.log(value);
      $('#drop').append('<li onclick = "console.log(this.id)" id = "'+value.id+'"><a>'+value.name+'</a></li>');
    })
    

});




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


  function logout(){
    // var currentUser = Parse.User.current();
    Parse.User.logOut();
    location.href='../index.html';
    console.log(currentUser + "logout!");
  }

  /* addChild() adds a child to the parent's data structure 
      Also outputs the child's ID number */
  function addChild(){
    var to_add = $('#chld_name').val();

    var Child = Parse.Object.extend("Child");
    var child = new Child();
    child.set("Name", to_add);
    child.set("parentId",currentUser.id);

    child.save(null, {
      success: function(child) {
        // Execute any logic that should take place after the object is saved.
        $('#security_code').text(child.id);
        update_prt(child.id,to_add);
        console.log(child);
      },
      error: function(child, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
        alert('Failed to add child, with error code: ' + error.description);
      }
    });

    $('.to_hide').slideUp(400,function () {
      $('.to_show').slideDown();
    })
  }

  function update_prt(child_id, child_name){
    var User = Parse.Object.extend("User");
    var user = new Parse.Query(User);
    user.equalTo("objectId", currentUser.id);
    user.find({
      success: function(results) {
        // console.log("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        console.log(results[0]);
        // var new_children = new Array();
        console.log(results[0].get('children_array'));
        var to_update = results[0].get("children_array");
        var to_update_item = {'id':child_id,'name':child_name};
        to_update.push(to_update_item);
        // to_update =[{'id':'lHMDIjw566','name':'1234_6'},
        //             {'id':'hZ1SkoAjA4','name':'1234_4'},
        //             {'id':'3xJYNDwkJB','name':'1234_2'},
        //             {'id':'CSW2QQss37','name':'1234_1'}]
        console.log(to_update);
        results[0].set("children_array",to_update);
        results[0].save();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }








































