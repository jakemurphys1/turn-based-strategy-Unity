var healthbox: GameObject;
var maxhealthbox: GameObject;
var attackbox: GameObject;
var defensebox: GameObject;
var resistancebox: GameObject;
var accuracybox: GameObject;
var typebox:GameObject;
var evasionbox:GameObject;
var ability1: GameObject;
var ability2: GameObject;
var ability3: GameObject;
var ability4: GameObject;
var ability5: GameObject;
var allAbilities = new Array();
var message:GameObject;
var message2:GameObject;
var showMessage: boolean=false;
var self:GameObject;
var details:GameObject;
var curActive;
function Start(){
	allAbilities=[ability1,ability2,ability3,ability4,ability5];
}
function storeAbilities(){
	allAbilities=[ability1,ability2,ability3,ability4,ability5];
	return allAbilities;
}

function updateText(active,health,maxhealth,attack,defense,resistance,accuracy,type,evasion, passiveActions){
	curActive = active;
	allAbilities=[ability1,ability2,ability3,ability4,ability5];
	healthbox.GetComponent("Text").text = health.ToString();
	maxhealthbox.GetComponent("Text").text = maxhealth.ToString();
	attackbox.GetComponent("Text").text = attack.ToString();
	defensebox.GetComponent("Text").text = defense.ToString();
	resistancebox.GetComponent("Text").text = resistance.ToString();
	accuracybox.GetComponent("Text").text = translateAccuracy(active,accuracy).ToString();
	typebox.GetComponent("Text").text = type.ToString();
	evasionbox.GetComponent("Text").text = translateEvasion(evasion).ToString();

	for(var j = 0;j<allAbilities.length;j++){
		allAbilities[j].SetActive(false);
	}

	if(active.attackType){
		return;
	}

	

	for(var i = 0;i<active.passiveActions.length;i++){
		if(active.passiveActions[i]){
			allAbilities[i].GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + active.passiveActions[i], typeof(Sprite));
			if(active.actionsActive[active.passiveActions[i]]){
				allAbilities[i].SetActive(true);
			}
		};
	}
}
function translateEvasion(num){
		switch(num){
			case 0:
				return "Awful";
				break;
			case 1:
				return "Normal";
				break;
			case 2: 
				return "Good";
				break;
			case 3:
				return "Great";
				break;
			case 4:
				return "Excellent";
				break;
			case 5:
				return "Perfect";
				break;
		}
}
function translateAccuracy(active, num){
		if(active.isAlly){
			switch(num){
				case 0:
					return "Awful";
					break;
				case 1:
					return "Normal";
					break;
				case 2: 
					return "Good";
					break;
				case 3:
					return "Great";
					break;
				case 4:
					return "Excellent";
					break;
				case 5:
					return "Perfect";
					break;
			}
		}else{
			switch(num){
				case 0:
					return "Awful";
					break;
				case 1:
					return "Bad";
					break;
				case 2: 
					return "Poor";
					break;
				case 3:
					return "Normal";
					break;
				case 4:
					return "Good";
					break;
				case 5:
					return "Great";
			}
		}
}

function ShowDescription(){
	showMessage=true;
	showIt();
}
function HideDescription(){
	showMessage=false;
	message.GetComponent("Text").enabled=false;
	message2.GetComponent("Text").enabled=false;
}

function showIt(){
	yield WaitForSeconds(1);
	if(showMessage){
		message.GetComponent("Text").enabled=true;
		message2.GetComponent("Text").enabled=true;
	}
}

function showdetails(){
	details.SetActive(true);
	details.GetComponent("Details").updateInfo(curActive);
}
