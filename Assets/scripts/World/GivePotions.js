var slot1;
var slot2;
var slot3;
var curUnit;
var curSlot:int=1;
var selectedPotion:GameObject;
var description:GameObject;
var AttackIcon:GameObject;
var DefenseIcon:GameObject;
var ResistanceIcon:GameObject;
var HealthIcon:GameObject;
var EvasionIcon:GameObject;
var AccuracyIcon:GameObject;
var	quantity:GameObject;
var main:GameObject;



function goRight(){
	if(curSlot==3){
		return;
	}
	slot1.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot2.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot3.body.GetComponent("AllyClick").curcamera.enabled = false;
	curSlot+=1;
	if(curSlot==2){
		slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot2;
	}
	if(curSlot==3){
		slot1.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot1;
	}
	updateIcons();
}

function goLeft(){
	if(curSlot==1){
			return;
		}
	slot1.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot2.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot3.body.GetComponent("AllyClick").curcamera.enabled = false;
	curSlot-=1;
	if(curSlot==1){
		slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot3;
	}
	if(curSlot==2){
		slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot2;
	}
	updateIcons();
}

function updateIcons(){
	AttackIcon.SetActive(false);
	DefenseIcon.SetActive(false);
	ResistanceIcon.SetActive(false);
	HealthIcon.SetActive(false);
	AccuracyIcon.SetActive(false);
	EvasionIcon.SetActive(false);
	var curUnit=currentUnit();
	if(curUnit.attackBoost){
		AttackIcon.SetActive(true);
	}
	if(curUnit.defenseBoost){
		DefenseIcon.SetActive(true);
	}
	if(curUnit.resistanceBoost){
		ResistanceIcon.SetActive(true);
	}
	if(curUnit.healthBoost){
		HealthIcon.SetActive(true);
	}
	if(curUnit.evasionBoost){
		EvasionIcon.SetActive(true);
	}
	if(curUnit.accuracyBoost){
		AccuracyIcon.SetActive(true);
	}
}

function givePotion(){
	var potion = selectedPotion.GetComponent("Dropdown").options[selectedPotion.GetComponent("Dropdown").value].text;
	var curUnit=currentUnit();

	

	if(potion =="Attack Boost"){
		if(curUnit.attackBoost==false){
			if(main.GetComponent("Main").items["Attack Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Attack Potion"]-=1;
			curUnit.attackBoost=true;
			curUnit.attack += (curUnit.attack*0.3);
			AttackIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Defense Boost"){
		if(curUnit.defenseBoost==false){
			if(main.GetComponent("Main").items["Defense Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Defense Potion"]-=1;
			curUnit.defenseBoost=true;
			curUnit.defense += (curUnit.defense*0.3);
			DefenseIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Resistance Boost"){
		if(curUnit.resistanceBoost==false){
			if(main.GetComponent("Main").items["Resistance Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Resistance Potion"]-=1;
			curUnit.resistanceBoost=true;
			curUnit.resistance += (curUnit.resistance*0.3);
			ResistanceIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Health Boost"){
		if(curUnit.healthBoost==false){
			if(main.GetComponent("Main").items["Health Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Health Potion"]-=1;
			curUnit.healthBoost=true;
			curUnit.health += (curUnit.maxhealth*0.3);
			curUnit.maxhealth += (curUnit.maxhealth*0.3);
			HealthIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Accuracy Boost"){
		if(curUnit.accuracyBoost==false){
			if(main.GetComponent("Main").items["Accuracy Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Accuracy Potion"]-=1;
			curUnit.accuracyBoost=true;
			curUnit.accuracy += 1;
			AccuracyIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Evasion Boost"){
		if(curUnit.evasionBoost==false){
			if(main.GetComponent("Main").items["Evasion Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Evasion Potion"]-=1;
			curUnit.evasionBoost=true;
			curUnit.evasion += 1;
			EvasionIcon.SetActive(true);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
}

function currentUnit(){
	if(curSlot==1){
		return slot1;
	}
	if(curSlot==2){
		return slot2;
	}
	if(curSlot==3){
		return slot3;
	}
}

function updateQuanity(){
	var potion = selectedPotion.GetComponent("Dropdown").options[selectedPotion.GetComponent("Dropdown").value].text;
	var curquantity;
	if(potion == "Attack Boost"){
		curquantity = main.GetComponent("Main").items["Attack Potion"]; 
	}
	if(potion == "Defense Boost"){
		curquantity = main.GetComponent("Main").items["Defense Potion"]; 
	}
	if(potion == "Resistance Boost"){
		curquantity = main.GetComponent("Main").items["Resistance Potion"]; 
	}
	if(potion == "Health Boost"){
		curquantity = main.GetComponent("Main").items["Health Potion"]; 
	}
	if(potion == "Evasion Boost"){
		curquantity = main.GetComponent("Main").items["Evasion Potion"]; 
	}
	if(potion == "Accuracy Boost"){
		curquantity = main.GetComponent("Main").items["Accuracy Potion"]; 
	}
	if(potion == "Recover Potion"){
		curquantity = main.GetComponent("Main").items["Recover Potion"]; 
	}
	quantity.GetComponent("Text").text=curquantity.ToString();
}