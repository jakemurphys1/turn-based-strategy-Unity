﻿var main: GameObject;
var listField: GameObject;
var statBox: GameObject;
var menu: GameObject;
var slot1: GameObject;
var slot2: GameObject;
var slot3: GameObject;
var barracks: GameObject;
var makePotions:GameObject;
var potionInfo:GameObject;
var statsBox:GameObject;
var replicateBox:GameObject;
var usePotionsBox:GameObject;
var brewery:GameObject;



function gotobarracks(){
	barracks.SetActive(true);
	makePotions.SetActive(false);
	potionInfo.SetActive(false);
	statsBox.SetActive(true);
	replicateBox.SetActive(false);
	brewery.SetActive(false);
	usePotionsBox.SetActive(false);
	var addX = 0;
	var addY = 0;
		gameObjects =  GameObject.FindGameObjectsWithTag ("barrackPic");
 
		 for(var p = 0 ; p < gameObjects.length ; p ++){
			Destroy(gameObjects[p]);
		 }
         

		var units = main.GetComponent("Main").units;
		for(var i = 0;i<units.length;i++){
			if(units[i].group==-1){
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
					if(units[i].enroute>0 || units[i].healing>0 || units[i].alive==false){
						var items = main.GetComponent("Main").items;
						var potionText = unit.GetComponent("barrackpicbutton").potionText;
						var potionBox =unit.GetComponent("barrackpicbutton").potion;
						if(units[i].enroute>0 && items["Teleport Potion"]>0){
							potionBox.SetActive(true);
							potionText.GetComponent("Text").text="Teleport";
						}
						if(units[i].healing>0 && items["Healing Potion"]>0){
							potionBox.SetActive(true);
							potionText.GetComponent("Text").text="Healing";
						}
						if(units[i].alive==false && items["Revive Potion"]>0){
							potionBox.SetActive(true);
							potionText.GetComponent("Text").text="Revive";
						}
						unit.GetComponent("Image").color = new Color32(150,150,150,100);
					}
			}
		}
}
function Exit(){
	var objects = GameObject.FindGameObjectsWithTag("barrackPic");
	for(var i =0;i<objects.length;i++){
		Destroy(objects[i]);
	}
	slot1.GetComponent("slots").index = -1;
	slot1.GetComponent("slots").isfilled = false;
	slot2.GetComponent("slots").index = -1;
	slot2.GetComponent("slots").isfilled = false;
	slot3.GetComponent("slots").index = -1;
	slot3.GetComponent("slots").isfilled = false;

	replicateBox.SetActive(false);
	makePotions.SetActive(false);
	barracks.SetActive(false);
	menu.SetActive(false);
	statsBox.SetActive(false);
}

function ExitReplicate(){
	potionInfo.SetActive(true);
	replicateBox.SetActive(false);
}

