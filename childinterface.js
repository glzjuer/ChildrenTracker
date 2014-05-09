Parse.initialize("NlM62oQaDFs1oPNPGgwZIS3uKgs0k8lDS6R8s7aO", "9Z7arzJtWrAGoaA5WAEJ98pocG0R2EV4I0WWrd6A");

var d = new Date(); 
var n = d.getTime()/3600000; 
var query = Parse.Query(Children);

window.getInterval(function() {
	// Every 15 minutes, get the user's location data and send it to the cloud

}, 1000*60*15);