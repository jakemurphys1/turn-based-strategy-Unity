var index: int;
var on: boolean = false;
var menu: GameObject;
var onButton: Sprite;
var offButton: Sprite;
var textBox:GameObject;
var imageBox: GameObject;
var main:GameObject;

function Start(){
	main = menu.GetComponent("Menu").main;
}

function clickit(){
	main.GetComponent("Main").curAction = textBox.GetComponent("Text").text;
}

function Update(){
	if(textBox.GetComponent("Text").text==main.GetComponent("Main").curAction){
		gameObject.GetComponent("Image").sprite  = onButton;
	}else{
		gameObject.GetComponent("Image").sprite  = offButton;
	}
}
