function Q(){
	this.push =  function (x){
		if (this.body.length<6){
			this.body.push(x);
		}
		else {
			this.body.shift();
			this.body.push(x);
		}	
	};
	this.body = new Array();
}

