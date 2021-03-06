var s; //a snake
var scl = 20; //scale, we need to keep track of the grid and the position of the snake in the grid #

var food;

function setup(){
	createCanvas(600, 600);
	frameRate(10);
	s = new Snake();
	pickLocation();
}

function pickLocation() {
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function draw(){
	background(51);
	s.death();
	s.update();
	s.show();

	if (s.eat(food)){
		pickLocation();
	}

	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		if ((s.xspeed === 1 && s.yspeed === 0) || (s.xspeed === -1 && s.yspeed === 0)){
		 	s.dir(0, -1);
		} else {
			console.log("Cannot go in opposite direction!");
		}	
	}else if(keyCode === DOWN_ARROW){
		if ((s.xspeed === 1 && s.yspeed === 0) || (s.xspeed === -1 && s.yspeed === 0)){
			s.dir(0, 1);
		} else {
			console.log("Cannot go in opposite direction!");
		}
	}else if(keyCode === LEFT_ARROW){
		if ((s.xspeed === 0 && s.yspeed === 1) || (s.xspeed === 0 && s.yspeed === -1)){
			s.dir(-1, 0);
		} else {
			console.log("Cannot go in opposite direction!");
		}
	}else if(keyCode === RIGHT_ARROW){
		if ((s.xspeed === 0 && s.yspeed === 1) || (s.xspeed === 0 && s.yspeed === -1)){
			s.dir(1, 0);
		} else {
			console.log("Cannot go in opposite direction!");
		}
	}
}

//THE SNAKE CONSTRUCTOR
function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	this.eat = function (pos) {
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) {
			this.total++;
			return true;
		} else {
			return false;
		}
	}

	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.death = function(){
		for (var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y)
			if (d < 1) {
				console.log("Starting over.")
				this.total = 0;
				this.tail = [];	
			}
		}
	}

	this.update = function(){
		if (this.total === this.tail.length){
			for (var i = 0; i < this.tail.length-1; i++) { //looping throught the total and adding the length from the end to the beginning of the array. ??
			this.tail[i] = this.tail[i+1];
			}
		}

		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width-scl); //take this value, and constrain it between 0 and the width, 
		//same below but with height MINUS scl(scale) we don't wont to go off the grid. 
		this.y = constrain(this.y, 0, height-scl);


			
		this.show = function(){
		fill(255);
		for (var i = 0; i < this.tail.length; i++) { 
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
		}
	}
}