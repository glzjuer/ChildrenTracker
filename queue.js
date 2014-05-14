function Q(){
	this.push =  function (x){
<<<<<<< HEAD
		if (this.body.length<=6){
=======
		if (this.body.length<6){
>>>>>>> GL
			this.body.push(x);
		}
		else {
			this.body.shift();
			this.body.push(x);
		}	
	};
	this.body = new Array();
}

