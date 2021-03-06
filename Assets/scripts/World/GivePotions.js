﻿var slot1;
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
var healthbar:GameObject;


function Start(){
	updateQuanity();
}

function goLeft(){
	if(curSlot==3){
		return;
	}
	curSlot+=1;
	if(curSlot==2){
		if(slot2){
			hideCameras();
			slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
			curUnit = slot2;
		}else{
			curSlot+=1;
			if(slot3){
				hideCameras();
				slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
				curUnit = slot1;
			}else{
				curSlot+=2;
				return;
			}
		}
	}else if(curSlot==3 && slot3){
		hideCameras();
		slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot1;
	}else{
		curSlot-=1;
		return;
	}
	updateIcons();
}

function goRight(){
	
	if(curSlot==1){
			return;
		}
	curSlot-=1;
	if(curSlot==2){
		if(slot2){
			hideCameras();
			slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
			curUnit = slot2;
		}else{
			curSlot-=1;
			if(slot1){
				hideCameras();
				slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
				curUnit = slot3;
			}else{
				curSlot-=2;
				return;
			}
		}
	}else if(curSlot==1 && slot1){
		hideCameras();
		slot1.body.GetComponent("AllyClick").curcamera.enabled = true;
		curUnit = slot3;
	}else{
		curSlot-=1;
		return;
	}
	updateIcons();
}

function hideCameras(){
	if(slot1){
		slot1.body.GetComponent("AllyClick").curcamera.enabled = false;
	}
	if(slot2){
		slot2.body.GetComponent("AllyClick").curcamera.enabled = false;
	}
	if(slot3){
		slot3.body.GetComponent("AllyClick").curcamera.enabled = false;
	}
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
	//healthbar
	var health = curUnit.health + 0.0f;
	var maxhealth = curUnit.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 1 * percentage;
	healthbar.transform.localScale = Vector3(newlength,1,1);
}
function potionEffect(ally,potion,increase){
	main.GetComponent("Main").quickMessage("The " + ally.type + "'s " + potion.ToString() + " increases by " + increase);
	main.GetComponent("sounds").playSound("brew");
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
			var increase = (curUnit.attack*0.3);
			if(increase<5){
				increase=5;
			}
			curUnit.attack += (increase);
			AttackIcon.SetActive(true);
			potionEffect(curUnit,"Attack",increase);
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
			increase = (curUnit.defense*0.3);
			if(increase<5){
				increase=5;
			}
			curUnit.defense += (increase);
			DefenseIcon.SetActive(true);
			potionEffect(curUnit,"Defense",increase);
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
			increase = (curUnit.resistance*0.3);
			if(increase<5){
				increase=5;
			}
			curUnit.resistance += (increase);
			ResistanceIcon.SetActive(true);
			potionEffect(curUnit,"Resistance",increase);
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
			increase = (curUnit.maxhealth*0.3);
			if(increase<5){
				increase=5;
			}
			curUnit.health += (increase);
			curUnit.maxhealth += (curUnit.maxhealth*0.3);
			HealthIcon.SetActive(true);
			potionEffect(curUnit,"Max Health",increase);
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
			potionEffect(curUnit,"Accuracy",1);
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
			potionEffect(curUnit,"Evasion",1);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit has already used this potion in this battle");
		}
	}
	if(potion =="Recover Potion"){
		if(curUnit.health<curUnit.maxhealth){
			if(main.GetComponent("Main").items["Recover Potion"]==0){
				main.GetComponent("Main").makeBigMessage("You don't have any of those potions");
				return;
			}
			main.GetComponent("Main").items["Recover Potion"]-=1;
			curUnit.health= curUnit.maxhealth;
			updateIcons();
			main.GetComponent("combat").heal(curUnit, curUnit.maxhealth);
		}else{
			main.GetComponent("Main").makeBigMessage("This unit is already fully healed");
		}
	}
	updateQuanity();
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
	var curDes="description";
	if(potion == "Attack Boost"){
		curquantity = main.GetComponent("Main").items["Attack Potion"]; 
		curDes = "Increases the unit's attack by 30% for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Defense Boost"){
		curquantity = main.GetComponent("Main").items["Defense Potion"]; 
		curDes = "Increases the unit's defense by 30% for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Resistance Boost"){
		curquantity = main.GetComponent("Main").items["Resistance Potion"]; 
		curDes = "Increases the unit's resistance by 30% for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Health Boost"){
		curquantity = main.GetComponent("Main").items["Health Potion"]; 
		curDes = "Increases the unit's max health by 30% for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Evasion Boost"){
		curquantity = main.GetComponent("Main").items["Evasion Potion"]; 
		curDes = "Increases the unit's evasion by 1 for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Accuracy Boost"){
		curquantity = main.GetComponent("Main").items["Accuracy Potion"]; 
		curDes = "Increases the unit's accuracy by 1 for the rest of the battle. Once potion per battle.";
	}
	if(potion == "Recover Potion"){
		curquantity = main.GetComponent("Main").items["Recover Potion"]; 
		curDes = "Completely restores the unit's health.'";
	}
	quantity.GetComponent("Text").text=curquantity.ToString();
	description.GetComponent("Text").text=curDes.ToString();
}

function close(){
	gameObject.SetActive(false);
	slot1.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot2.body.GetComponent("AllyClick").curcamera.enabled = false;
	slot3.body.GetComponent("AllyClick").curcamera.enabled = false;
	//main.GetComponent("Main").curCamera.enabled = true;
}