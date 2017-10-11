var thisCamera: GameObject;
var direction: String;
var speed:int;
var maxleft:int;
var maxright:int;
var maxtop:int;
var maxbottom:int;

function goLeft(){
	direction="left";
}
function goRight(){
	direction="right";
}
function goTop(){
	direction="top";
}
function goBottom(){
	direction="bottom";
}
function stopIt(){
	direction="";
}

function Update(){
	if(thisCamera.transform.position.y<50){
		speed=1;
	}else if(thisCamera.transform.position.y>=50 && thisCamera.transform.position.y<100){
		speed=2;
	}else if(thisCamera.transform.position.y>=100 && thisCamera.transform.position.y<150){
		speed=3;
	}else if(thisCamera.transform.position.y>=150 && thisCamera.transform.position.y<200){
		speed=4;
	}else if(thisCamera.transform.position.y>=200 && thisCamera.transform.position.y<250){
		speed=5;
	}else if(thisCamera.transform.position.y>=250 && thisCamera.transform.position.y<300){
		speed=6;
	}

	if(direction=="left" && thisCamera.transform.position.x>maxleft){
		
		thisCamera.transform.position.x -=speed;
	}
	if(direction=="right" && thisCamera.transform.position.x<maxright){
		thisCamera.transform.position.x +=speed;
	}
	if(direction=="top" && thisCamera.transform.position.z<maxtop){
		thisCamera.transform.position.z +=speed;
	}
	if(direction=="bottom" && thisCamera.transform.position.z>maxbottom){
		thisCamera.transform.position.z -=speed;
	}
}