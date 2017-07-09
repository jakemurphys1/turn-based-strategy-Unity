var thisCamera: GameObject;
var direction: String;

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
Debug.Log("down");
	direction="bottom";
}
function stopIt(){
	direction="";
}

function Update(){
	if(direction=="left"){
		thisCamera.transform.position.x -=1;
	}
	if(direction=="right"){
		thisCamera.transform.position.x +=1;
	}
	if(direction=="top"){
		thisCamera.transform.position.z +=1;
	}
	if(direction=="bottom"){
		thisCamera.transform.position.z -=1;
	}
}