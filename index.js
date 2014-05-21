
//Flag for different instances of pressing 
	var open=false;


	$(document).ready(function(){
		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
		console.log("ready!!");
		var currentUser = Parse.User.current();
		if (currentUser) {
		    // location.href='parentView/parentView.html?userId='+ currentUser.id;
		    // do stuff with the user
		} else {
		    // show the signup or login page
		}


	});

	function slideDown() {
		  event.preventDefault();
		  
		  $('.to_hide').slideUp(400,function(){
		    $('.to_show').slideDown();
		  });
		return false;
	}


 	function createNewUser() {
 		event.preventDefault();
 		open = !open;
 		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");

 		if (!open) {
 			
			var user = new Parse.User();

			user.set("username", $("#prt_id").val());
			user.set("password", $("#inputPassword1").val());
			user.set("email", $("#inputEmail").val());
			user.set("children_array",[]);

			user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			    location.href='parentView/parentView.html';
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		} else {
			  event.preventDefault();
			  $('.to_hide').slideUp(400,function(){
			    $('.to_show').slideDown();
			  });
		}
		// return false;
  	} 

  	function login(){
  		event.preventDefault();
  		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");

  		Parse.User.logIn($("#prt_id").val(), $("#inputPassword1").val(), {
  		  success: function(user) {
  		  	var query = new Parse.Query(Parse.User);
  		  	query.equalTo("username", $("#prt_id").val());  // find all the women
  		  	query.find({
  		  	  success: function(newuser) {
  		  	  	// console.log("Successfully retrieved " + newuser.length + " user");
  		  	    var object = newuser[0];


  		  	    location.href='parentView/parentView.html?'+'userId='+object.id;
  		  	    // Do stuff
  		  	  }
  		  	});
  		    // Do stuff after successful login.
  		  },
  		  error: function(user, error) {
  		    alert("failed!");
  		    alert("Error: " + error.code + " " + error.message);
  		    // The login failed. Check error to see why.
  		  }
  		});
  	} 

  	function reinitial(){
  		$('.to_show').slideUp(400,function(){
  			$('.to_hide').slideDown();
  		});
  		open = false;
  		console.log(open);
  	}


  	//funtion to check that child ID exists in database
  	function validateID(){
  		event.preventDefault();


  		var child_Id = $('#childID').val();

  		//Get child ID from user and search child database for object
  		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
		
  		var Child = Parse.Object.extend("Child");
  		var child = new Parse.Query(Child);
  		child.equalTo("objectId", child_Id);
  		console.log(child);
  		child.find({
  		  success: function(results) {
  		    // console.log("Successfully retrieved " + results.length + " scores.");
  		    // Do something with the returned Parse.Object values
  		    console.log(results);
  		    if(results.length == 0){
  		    	$('#invalidIdMsg').text("No such child, Please Check!");
  		    }else{
  		    	window.location="childinterface.html"+"?"+child_Id;

  		    }

  		  },
  		  error: function(error) {
  		  	$('#invalidIdMsg').text("Parse Find failed!");

  		    // alert("Error: " + error.code + " " + error.message);
  		  }
  		});

	
	}



