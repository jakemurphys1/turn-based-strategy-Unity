var option1: GameObject;
var option2: GameObject;
var option3: GameObject;
var option4: GameObject;
var option5: GameObject;
var option6: GameObject;
var optionIndex:int;
var main: GameObject;


function setMenu(x,y,actions,type,actionsActive){
	transform.position.x = x+ 50;
	transform.position.y = y;

	hideAll();

	option1.GetComponent("Image").enabled=true;
	option1.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;

	main.GetComponent("Main").curAction = actions[0];
	
	
	

	option1.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[0];
	option1.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[0], typeof(Sprite));
	if(actions.length>1){
		option2.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[1];
		option2.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[1], typeof(Sprite));
		if(actionsActive[actions[1]]==true){
			option2.GetComponent("Image").enabled=true;
			option2.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
		}
	}
	if(actions.length>2){
		option3.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[2];
		option3.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[2], typeof(Sprite));
		if(actionsActive[actions[2]]==true){
			option3.GetComponent("Image").enabled=true;
			option3.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
		}
	}
	if(actions.length>3){
		option4.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[3];
		option4.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[3], typeof(Sprite));
		if(actionsActive[actions[3]]==true){
			option4.GetComponent("Image").enabled=true;
			option4.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
		}
	}
	if(actions.length>4){
		option5.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[4];
		option5.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[4], typeof(Sprite));
		if(actionsActive[actions[4]]==true){
			option5.GetComponent("Image").enabled=true;
			option5.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
		}
	}
	if(actions.length>5){
		option6.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[5];
		option6.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[5], typeof(Sprite));
		if(actionsActive[actions[5]]==true){
			option6.GetComponent("Image").enabled=true;
			option6.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
		}
	}
}

function hideAll(){
	option1.GetComponent("Image").enabled=false;
	option2.GetComponent("Image").enabled=false;
	option3.GetComponent("Image").enabled=false;
	option4.GetComponent("Image").enabled=false;
	option5.GetComponent("Image").enabled=false;
	option6.GetComponent("Image").enabled=false;

	option1.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
	option2.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
	option3.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
	option4.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
	option5.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
	option6.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = false;
}
