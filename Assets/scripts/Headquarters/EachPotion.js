var curname:String;
var description:String;
var ingredient1:String;
var ingredient2:String;
var value1:int;
var value2:int;
var makePotion:GameObject;
var main:GameObject;
var nameBox: GameObject;
var desBox:GameObject;
var ingre1Box:GameObject;
var ingre2Box:GameObject;

function makeIt(){

	if(curname == "Replicate"){
		replicate();
		return;
	}

	var items = main.GetComponent("Main").items;
	if(items[ingredient1]<value1 || items[ingredient2]<value2){
		return;
	}
		items[ingredient1]-=value1;
		items[ingredient2]-=value2;
		items[curname]+=1;
		makePotion.GetComponent("MakePotion").makePotions();	
}
function hoverOver(){
	nameBox.GetComponent("Text").text = curname;
	desBox.GetComponent("Text").text = description;
	ingre1Box.GetComponent("Text").text = value1 + " " + ingredient1;
	ingre2Box.GetComponent("Text").text = value2 + " " + ingredient2;
}

function replicate(){
	makePotion.GetComponent("MakePotion").potionInfo.SetActive(false);
	makePotion.GetComponent("MakePotion").replicateBox.SetActive(true);
}
