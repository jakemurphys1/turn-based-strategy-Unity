var option1: GameObject;
var option2: GameObject;
var option3: GameObject;
var option4: GameObject;
var option5: GameObject;
var option6: GameObject;
var escape:GameObject;
var optionIndex:int;
var main: GameObject;
var stats: GameObject;
var elements:GameObject;
var curAlly;
var confirmPanel:GameObject;

function setMenu(x,y,actions,type,actionsActive,ally){
	transform.position.x = x+ 50;
	transform.position.y = y;
	hideAll();
	curAlly = ally;
	escape.SetActive(true);

	option1.GetComponent("Image").enabled=true;
	option1.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;

	option1.GetComponent("MenuButton").allowAction=true;
	option2.GetComponent("MenuButton").allowAction=true;
	option3.GetComponent("MenuButton").allowAction=true;
	option4.GetComponent("MenuButton").allowAction=true;
	option5.GetComponent("MenuButton").allowAction=true;
	option6.GetComponent("MenuButton").allowAction=true;

	main.GetComponent("Main").curAction = actions[0];
	option1.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[0];
	option1.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[0], typeof(Sprite));
	option1.GetComponent("MenuButton").message.GetComponent("Text").text=actions[0] + ": " + ally.actionDes2[actions[0]];
	option1.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[0] + ": " + ally.actionDes2[actions[0]];
	if(actions.length>1){
		option2.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[1];
		option2.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[1], typeof(Sprite));
		option2.GetComponent("MenuButton").message.GetComponent("Text").text=actions[1] + ": " + ally.actionDes2[actions[1]];
		option2.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[1] + ": " + ally.actionDes2[actions[1]];
		if(actionsActive[actions[1]]==true){
			option2.GetComponent("Image").enabled=true;
			option2.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
			if(isArrow(actions[1])){
				option2.GetComponent("MenuButton").count.GetComponent("Text").text=ally.arrows[actions[1]].ToString();
				if(ally.arrows[actions[1]]==0){
					option2.GetComponent("MenuButton").allowAction=false;
				}
			}
		}
	}
	if(actions.length>2){
		option3.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[2];
		option3.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[2], typeof(Sprite));
		
		
		option3.GetComponent("MenuButton").message.GetComponent("Text").text=actions[2] + ": " + ally.actionDes2[actions[2]];
		option3.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[2] + ": " + ally.actionDes2[actions[2]];
		if(actionsActive[actions[2]]==true){
			option3.GetComponent("Image").enabled=true;
			option3.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
			if(isArrow(actions[2])){
				option3.GetComponent("MenuButton").count.GetComponent("Text").text=ally.arrows[actions[2]].ToString();
				if(ally.arrows[actions[2]]==0){
					option3.GetComponent("MenuButton").allowAction=false;
				}
			}
		}
	}
	if(actions.length>3){
		option4.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[3];
		if(ally.element){
			option4.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + ally.element, typeof(Sprite));
		}else{
			option4.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[3], typeof(Sprite));
		}
		option4.GetComponent("MenuButton").message.GetComponent("Text").text=actions[3] + ": " + ally.actionDes2[actions[3]];
		option4.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[3] + ": " + ally.actionDes2[actions[3]];
		if(actionsActive[actions[3]]==true){
			option4.GetComponent("Image").enabled=true;
			option4.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
			if(isArrow(actions[3])){
				option4.GetComponent("MenuButton").count.GetComponent("Text").text=ally.arrows[actions[3]].ToString();
				if(ally.arrows[actions[3]]==0){
					option4.GetComponent("MenuButton").allowAction=false;
				}
			}
		}
	}
	if(actions.length>4){
		option5.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[4];
		option5.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[4], typeof(Sprite));
		option5.GetComponent("MenuButton").message.GetComponent("Text").text=actions[4] + ": " + ally.actionDes2[actions[4]];
		option5.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[4] + ": " + ally.actionDes2[actions[4]];
		if(actionsActive[actions[4]]==true){
			option5.GetComponent("Image").enabled=true;
			option5.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
			if(isArrow(actions[4])){
				option5.GetComponent("MenuButton").count.GetComponent("Text").text=ally.arrows[actions[4]].ToString();
				if(ally.arrows[actions[4]]==0){
					option5.GetComponent("MenuButton").allowAction=false;
				}
			}
		}
	}
	if(actions.length>5){
		option6.GetComponent("MenuButton").textBox.GetComponent("Text").text=actions[5];
		option6.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[5], typeof(Sprite));
		option6.GetComponent("MenuButton").message.GetComponent("Text").text=actions[5] + ": " + ally.actionDes2[actions[5]];
		option6.GetComponent("MenuButton").message2.GetComponent("Text").text=actions[5] + ": " + ally.actionDes2[actions[5]];
		if(actionsActive[actions[5]]==true){
			option6.GetComponent("Image").enabled=true;
			option6.GetComponent("MenuButton").imageBox.GetComponent("Image").enabled = true;
			if(isArrow(actions[5])){
				option6.GetComponent("MenuButton").count.GetComponent("Text").text=ally.arrows[actions[5]].ToString();
				if(ally.arrows[actions[5]]==0){
					option6.GetComponent("MenuButton").allowAction=false;
				}
			}
		}
	}

	stats.SetActive(true);
	var passive = stats.GetComponent("stats").storeAbilities();
	for(var i = 0; i<ally.passiveActions.length;i++){
		if(ally.passiveActions[i]){
			passive[i].GetComponent("passiveAbility").description = ally.actionDes2[ally.passiveActions[i]];
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

	option1.GetComponent("MenuButton").count.GetComponent("Text").text="";
	option2.GetComponent("MenuButton").count.GetComponent("Text").text="";
	option3.GetComponent("MenuButton").count.GetComponent("Text").text="";
	option4.GetComponent("MenuButton").count.GetComponent("Text").text="";
	option5.GetComponent("MenuButton").count.GetComponent("Text").text="";
	option6.GetComponent("MenuButton").count.GetComponent("Text").text="";

	escape.SetActive(false);

	elements.SetActive(false);
}

function isArrow(action){
	if(action=="Heal" || action=="Immobolize" || action=="Titan" || action=="Explosion" || action=="Piercing" || action=="Poison" || action=="Blindness" || action=="Sleep" || action=="Enfeeble" || action=="Silence" || action=="GrapplingHook" || action=="Burst" || action=="Disrupt" || action=="Medkit"){
		return true;
	}else{
		return false;
	}
}

function escapeButton(){
	confirmPanel.SetActive(false);
	if(curAlly.didAction){
		return;
	}
	curAlly.enroute=5;
	Destroy(curAlly.body);
	var curgroup = main.GetComponent("Main").groups[curAlly.group];
	var index = curAlly.index;
	curAlly.group=-1;
	var slots = main.GetComponent("Main").pass.GetComponent("pass").slots;
	for (var i =0;i<slots.length;i++){
			if(slots[i].index==curAlly.index){
				slots.splice(i,1);
			}
		}
	slots = main.GetComponent("Main").pass.GetComponent("pass").slots=slots;
	hideAll();
	main.GetComponent("Main").makeBigMessage("The unit has escaped back to the Nexus. You can't use it for 5 turns.");
		if(slots.length==0){
			 main.GetComponent("combat").loseBattle(curgroup);
		}
}

function hideConfirm(){
	confirmPanel.SetActive(false);
}
function showConfirm(){
	confirmPanel.SetActive(true);
}

function MouseEnter(){
	main.GetComponent("Main").isOverMenu=true;
}
function MouseExit(){
	main.GetComponent("Main").isOverMenu=false;
}
