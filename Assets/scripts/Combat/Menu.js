var option1L: GameObject;
var option1R: GameObject;
var option2L: GameObject;
var option2R: GameObject;
var option3L: GameObject;
var option3R: GameObject;
var optionIndex:int;


function setMenu(x,y,actions){
Debug.Log(actions);
	transform.position.x = x+ 50;
	transform.position.y = y;

	hideAll();

	option1L.GetComponent("Image").enabled=true;
	option1L.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = true;
	option1L.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[0];
	if(actions.length>1){
		option1R.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[1];
	}
	if(actions.length>2){
		option2L.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[2];
	}
	if(actions.length>3){
		option2R.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[3];
	}
	if(actions.length>4){
		option3L.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[4];
	}
	if(actions.length>5){
		option3R.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[5];
	}
}

function hideAll(){
	option1L.GetComponent("Image").enabled=false;
	option2L.GetComponent("Image").enabled=false;
	option3L.GetComponent("Image").enabled=false;
	option1R.GetComponent("Image").enabled=false;
	option2R.GetComponent("Image").enabled=false;
	option3R.GetComponent("Image").enabled=false;

	option1L.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
	option2L.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
	option3L.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
	option1R.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
	option2R.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
	option3R.GetComponent("MenuButton").textBox.GetComponent("Text").enabled = false;
}
