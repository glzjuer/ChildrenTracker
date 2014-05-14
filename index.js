
//Flag for different instances of pressing 
	var open=false;

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
		  	console.log("now creating!!");
		  	console.log("username: "+$("#prt_id").val());
		  	console.log("password: "+$("#inputPassword1").val());
		  	console.log("email: "+$("#inputEmail").val())
			var user = new Parse.User();

			user.set("username", $("#prt_id").val());
			user.set("password", $("#inputPassword1").val());
			user.set("email", $("#inputEmail").val());

			user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			    alert("Successfully!");
			    location.href='index.html';
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
			  console.log(open);
		}
		console.log("end!");
		// return false;
  	} 

  	function login(){
  		event.preventDefault();
  		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");

  		Parse.User.logIn($("#prt_id").val(), $("#inputPassword1").val(), {
  		  success: function(user) {
  		  	alert("successfully Log In!");
  		  	location.href='parentView/parentView.html';
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
  		//Clear interfering code settings
  		event.preventDefault();
  		var y = document.getElementById("invalidIdMsg");
  		y.innerHTML = "";

  		//Get child ID from user and search child database for object
  		Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
		var query = new Parse.Query("Child");
		query.get($("#childID").val(), {
		success: function(child) {
			// The object was retrieved successfully. Redirect to next page
			window.location="childinterface.html"+"?"+$("#childID").val();
		},
			error: function(object, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
			
			y.innerHTML="Invalid input. Enter valid childID";

			}
		});
	}



