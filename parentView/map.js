// Note: This function requires that you consent to location sharing when
// prompted by your browser.


var map;
// var overlay;
var floor = 1;
var currentChild;



var locationArray = [];
// Check not necessary
// alert("Hello Word! "+locationArray[2]);

var locationNameArray = [];
var markers = [];
var image = 'me.png';

var Sample = new google.maps.LatLng(42.0575, -87.6752778);

// {latitude: 42.0, longitude: -87.67}
  
var theRequest;
var strs;
var currentUser;

google.maps.event.addDomListener(window, 'load', initialize_map);


$(document).ready(function() {
    
    var toShow;

    Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
    currentUser=Parse.User.current();

    // As backup
    var url = location.search; 
    theRequest = new Object();
    var str = url.substr(1);
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
       theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
    }

    //Create the dropdownlist and settings list 
    var my_children = currentUser.get('children_array');
    $.each(my_children,function(index,value){
      toShow = '<div display="block" class="settingDropDown" id = "' + value.id + 'toshow" aria-hidden="true">' +
        '<p>This This dropdown menu really works!</p></div>'
      $('#drop').prepend('<li onclick = "currentChild = this.id;click_child(currentChild)" id = '+ value.id + '><a>'+value.name+'</a></li>');
      $('#childSettings').prepend('<a href="#" onclick="openSettings()" class="settingLink"><li class="settingItem" id="0' + value.id + '">' + value.name + ': ' + value.id + toShow +
          '</li></a>')
    })
    //current click
    $('#current').on('click',function(){
      if(currentChild !== undefined){
        ShowChild(currentChild);
      }
      else alert("select a child");
    })

});



function initialize_map() {
  
  var mapOptions = {
    zoom: 18
  };


  map = new google.maps.Map(document.getElementById('childrenMap'),
      mapOptions);


  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Your current location.'
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
  
  //Backup for multiple shows
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

var child_location;

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: Sample,
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


 function click_child(child){
    click_now = setInterval(ShowChild,3000);
    console.log("click_child() has been called.");
    var Child = Parse.Object.extend("Child");
    var query = new Parse.Query(Child);
    query.equalTo("objectId", child);
    query.first({
      success: function(object) {
        var name = object._serverData.Name;
        $("#childDropdown").html(name + ' <span class="caret"></span>');
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    
 }

var window_flag = false; 
var child_infowindow;


function ShowChild(){
  if(window_flag){
    child_infowindow.close();
  }
  window_flag = true;

  var pos;
  clearMarkers();

  var Child = Parse.Object.extend("Child");
  var child = new Parse.Query(Child);
  child.equalTo("objectId", currentChild);
  child.find({
    success: function(results) {
      // console.log("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      // var new_children = new Array();
      child_location = results[0].get('CurrentLocation');
      var child_name = results[0].get('Name');

      var pos = new google.maps.LatLng(child_location.latitude, child_location.longitude);


      child_infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Here is '+ child_name,
      });
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: child_name,
        icon: image
      });
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

};



function Show_history(index){
  clearInterval(click_now);

  if(window_flag){
    child_infowindow.close();
  }
  window_flag = true;

  var pos;
  clearMarkers();

  var Child = Parse.Object.extend("Child");
  var child = new Parse.Query(Child);
  child.equalTo("objectId", currentChild);
  child.find({
    success: function(results) {
      // console.log("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
     
      // var new_children = new Array();
      child_location = results[0].get('history')[index];
      var child_name = results[0].get('Name');

      var pos = new google.maps.LatLng(child_location.Latitude, child_location.Longitude);


      child_infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Here is '+ child_name,
      });
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: child_name,
        icon: image
      });
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
 




}


  function logout(){
    // var currentUser = Parse.User.current();
    Parse.User.logOut();
    location.href='../index.html';
  }

  /* addChild() adds a child to the parent's data structure 
      Also outputs the child's ID number */
  var child;
  function addChild() {
    var to_add = $('#chld_name').val();
    var q = new Q();
    var Child = Parse.Object.extend("Child");
    child = new Child();
    child.set("Name", to_add);
    child.set("history", []);
    child.set("parent",{"name":currentUser.get("username"),"id":currentUser.id});

    child.save(null, {
      success: function(child) {
        // Execute any logic that should take place after the object is saved.
        $('#security_code').text(child.id);
        update_prt(child.id,to_add);
        
        var to_update = currentUser.get("children_array");
        var to_update_item = {'id':child.id,'name':to_add};
        to_update.push(to_update_item);
        // to_update =[{'id':'lHMDIjw566','name':'1234_6'},
        //             {'id':'hZ1SkoAjA4','name':'1234_4'},
        //             {'id':'3xJYNDwkJB','name':'1234_2'},
        //             {'id':'CSW2QQss37','name':'1234_1'}]
        currentUser.set("children_array",to_update);
        currentUser.save();
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

        var to_update = results[0].get("children_array");
        var to_update_item = {'id':child_id,'name':child_name};
        to_update.push(to_update_item);
        // to_update =[{'id':'lHMDIjw566','name':'1234_6'},
        //             {'id':'hZ1SkoAjA4','name':'1234_4'},
        //             {'id':'3xJYNDwkJB','name':'1234_2'},
        //             {'id':'CSW2QQss37','name':'1234_1'}]
        results[0].set("children_array",to_update);
        results[0].save();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
  
 
  // use for children View
  function upload_pos(){
    var Child = Parse.Object.extend("Child");
    var child = new Parse.Query(Child);
    child.equalTo("objectId", "lHMDIjw566");
    child.find({
      success: function(results) {
        // console.log("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        // var new_children = new Array();
        var child_location = new Parse.GeoPoint({latitude: 42.0, longitude: -87.67});
        results[0].set('CurrentLocation',child_location);

        results[0].save();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  }

  function show_Setting(){
    $('#settings').modal('show');
  };

  function show_addChild(){
    $('#addNewChild').modal('show');
  };

  function openSettings() {
    var show = '#' + event.target.id.slice(1) + 'toshow';
    $(show).slideDown();
  }






































