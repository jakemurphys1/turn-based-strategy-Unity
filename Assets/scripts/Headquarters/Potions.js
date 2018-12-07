var main: GameObject;
var brewery:GameObject;
var listField: GameObject;
var slot: GameObject;
var barracks: GameObject;
var makePotions:GameObject;
var potionInfo:GameObject;
var statsBox:GameObject;
var replicateBox:GameObject;

var healingButton:GameObject;
var accuracyButton:GameObject;
var evasionButton:GameObject;
var abilityButton:GameObject;
var masterButton:GameObject;

var healingQuantity:GameObject;
var accuracyQuantity:GameObject;
var evasionQuantity:GameObject;
var abilityQuantity:GameObject;
var masterQuantity:GameObject;

var accuracyStar:GameObject;
var evasionStar:GameObject;
var abilityStar:GameObject;
var masterStar:GameObject;

var activeUnit;
var items;

function Start(){
	
}

function gotopotions(){
	barracks.SetActive(false);
	makePotions.SetActive(false);
	potionInfo.SetActive(false);
	statsBox.SetActive(false);
	replicateBox.SetActive(false);
	gameObject.SetActive(true);
	brewery.SetActive(true);
	var addX = 0;
	var addY = 0;
		gameObjects =  GameObject.FindGameObjectsWithTag ("barrackPic");
 
		 for(var p = 0 ; p < gameObjects.length ; p ++){
			Destroy(gameObjects[p]);
		 }
         

		var units = main.GetComponent("Main").units;
		for(var i = 0;i<units.length;i++){
					unit = Instantiate(Resources.Load("alliesPics/" + units[i].type + "_prefab"));
					unit.transform.SetParent(listField.transform,false);
					if(addX>=375){
						addY+=100;
						addX=0;
					}
					unit.transform.position.x+=addX;
					unit.transform.position.y-=addY;
					addX+=75;
					unit.GetComponent("barrackpic").index = units[i].index;
					var healthbar = unit.GetComponent("barrackpic").healthbar;
					var health = units[i].health + 0.0f;
					var maxhealth = units[i].maxhealth + 0.0f;
					var percentage= health/maxhealth;
					var newlength = 1 * percentage;
					healthbar.transform.localScale = Vector3(newlength,1,0.02);

					var level = unit.GetComponent("barrackpic").levelText;
					level.GetComponent("Text").text=units[i].level.ToString();
		}
		if(!activeUnit){
			activeUnit=units[0];
		}
		if(activeUnit.evasionBoost){
			evasionStar.SetActive(true);
		}else{
			evasionStar.SetActive(false);
		}
		if(activeUnit.accuracyBoost){
			accuracyStar.SetActive(true);
		}else{
			accuracyStar.SetActive(false);
		}
		if(activeUnit.abilityPotion){
			abilityStar.SetActive(true);
		}else{
			abilityStar.SetActive(false);
		}
		if(activeUnit.masterPotion){
			masterStar.SetActive(true);
		}else{
			masterStar.SetActive(false);
		}
		displayPic(units[0]);

	var buttons = [
		{"name":"Healing","button":healingButton},
		{"name":"Accuracy","button":accuracyButton},
		{"name":"Evasion","button":evasionButton},
		{"name":"Ability","button":abilityButton},
		{"name":"Master","button":masterButton}
	];

	var colors;
	var items = main.GetComponent("Main").items;
	for(i =0;i<buttons.length;i++){
		colors = buttons[i]["button"].GetComponent("Button").colors;
			if( items[buttons[i]["name"] + " Potion"]>0){
				colors.normalColor = Color.black;
				colors.highlightedColor=Color.black;
			}else{
				colors.normalColor = Color.grey;
				colors.highlightedColor=Color.grey;
			}
			buttons[i]["button"].GetComponent("Button").colors = colors;
	}

	healingQuantity.GetComponent("Text").text = items["Healing Potion"].ToString();
	evasionQuantity.GetComponent("Text").text = items["Evasion Potion"].ToString();
	accuracyQuantity.GetComponent("Text").text = items["Accuracy Potion"].ToString();
	abilityQuantity.GetComponent("Text").text = items["Ability Potion"].ToString();
	masterQuantity.GetComponent("Text").text = items["Master Potion"].ToString();


}

function displayPic(unit){
	slot.GetComponent("Image").sprite = Resources.Load("alliesPics/" + unit.type, typeof(Sprite));
	activeUnit=unit;
}

function useHealing(){
	var items = main.GetComponent("Main").items;
	if(activeUnit.health==activeUnit.maxhealth){
		main.GetComponent("Main").makeBigMessage("This unit is already at full health.");
		return;
	}
	if(items["Healing Potion"]==0){
		main.GetComponent("Main").makeBigMessage("You don't have any Healing potions");
		return;
	}
	main.GetComponent("combat").heal(activeUnit,activeUnit.maxhealth);
	gotopotions();
}
function useAccuracy(){
	var items = main.GetComponent("Main").items;
	if(activeUnit.accuracyBoost){
		main.GetComponent("Main").makeBigMessage("This unit has already taken this potion in this battle");
		return;
	}
	if(items["Accuracy Potion"]==0){
		main.GetComponent("Main").makeBigMessage("You don't have any Accuracy potions");
		return;
	}
	main.GetComponent("Main").makeBigMessage(activeUnit.type + "'s accuracy has increased by 1.");
	activeUnit.accuracy+=1;
	activeUnit.accuracyBoost=true;
	items["Accuracy Potion"]-=1;
	gotopotions();
}
function useEvasion(){
	var items = main.GetComponent("Main").items;
	if(activeUnit.evasionBoost){
		main.GetComponent("Main").makeBigMessage("This unit has already taken this potion in this battle");
		return;
	}
	if(items["Evasion Potion"]==0){
		main.GetComponent("Main").makeBigMessage("You don't have any Evasion potions");
		return;
	}
	main.GetComponent("Main").makeBigMessage(activeUnit.type + "'s evasion has increased by 1.");
	activeUnit.evasion+=1;
	activeUnit.evasionBoost=true;
	items["Evasion Potion"]-=1;
	gotopotions();
}
function useAbility(){
	var items = main.GetComponent("Main").items;
	if(activeUnit.abilityPotion){
		main.GetComponent("Main").makeBigMessage("This unit has already taken this potion in this battle");
		return;
	}
	if(items["Ability Potion"]==0){
		main.GetComponent("Main").makeBigMessage("You don't have any Ability potions");
		return;
	}
	main.GetComponent("Main").makeBigMessage(activeUnit.type + " has unlocked ");
	activeUnit.abilityPotion=true;
	items["Ability Potion"]-=1;
	activeUnit.addedAbility=activeUnit.addAbility;
	gotopotions();
}
function useMaster(){
	var items = main.GetComponent("Main").items;
	if(activeUnit.level!=6){
		main.GetComponent("Main").makeBigMessage("This unit needs to be level 6 to use this potion");
		return;
	}
	if(activeUnit.masterPotion){
		main.GetComponent("Main").makeBigMessage("This unit has already taken this potion in this battle");
		return;
	}
	if(items["Master Potion"]==0){
		main.GetComponent("Main").makeBigMessage("You don't have any Master potions");
		return;
	}
	main.GetComponent("Main").makeBigMessage(activeUnit.type + " can now use '" + activeUnit.abilities[5] + "'");
	activeUnit.masterPotion=true;
	items["Master Potion"]-=1;
	gotopotions();
}
