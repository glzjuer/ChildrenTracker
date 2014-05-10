
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
 		open = !open;

 		if (!open) {
		  	Parse.initialize("Ciajq1kiZGy1gvO6UKGbtAL4ei2AjpaVCoSfQ14q", "cv1qJ4mvjKmr7pGIi2gh9QNTRfQ0WPFhMjg3rDXb");
			var user = new Parse.User();

			 user.set("username", $("#prt_id").val());
			 user.set("password", $("#inputPassword1").val());
			 user.set("email", $("#inputEmail").val());

			 user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			    alert("Success!");
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
		return false;
  	}  
	



