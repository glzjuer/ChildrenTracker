
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("alert_email", function(request, response) {
// console.log(request.user);
	var child_to_alert = request.params.child;
	var x =request.user;
	// console.log(x.get('email')+x.get('username'));
	// response.success(x.get('email')+x.get('username'));

	var Mailgun = require('mailgun');
	Mailgun.initialize('sandbox4215c05e7a5f41ac862365609ce61930.mailgun.org', 
	                    'key-63kv5zd4ovi5iidyz2tpne8ix5eaggh7');
	Mailgun.sendEmail({
	  to: x.get('email'),
	  from: "Mailgun@CloudCode.com",
	  subject: child_to_alert+" has gone out of range!",
	  text: "your child: "+child_to_alert+" has gone out of range!"
	}, 
	{
	    success: function(httpResponse) {
	    console.log(httpResponse);
	    response.success("Email sent!");
	  },
	    error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});

});
