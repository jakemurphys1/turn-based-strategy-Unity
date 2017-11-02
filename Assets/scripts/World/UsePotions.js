var groupIndex: int;
var main:GameObject;
var givePotions:GameObject;

function Start(){
	main = GameObject.Find("Main");
	givePotions = main.GetComponent("Main").givePotions;
}

function OnMouseDown(){

	var group = main.GetComponent("Main").groups[groupIndex];
	var slot1 = main.GetComponent("Main").units[group.slot1];
	var slot2 = main.GetComponent("Main").units[group.slot2];
	var slot3 = main.GetComponent("Main").units[group.slot3];

	slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
	main.GetComponent("Main").givePotions.SetActive(true);

	givePotions.GetComponent("GivePotions").curUnit=slot3;
	givePotions.GetComponent("GivePotions").slot1=slot1;
	givePotions.GetComponent("GivePotions").slot2=slot2;
	givePotions.GetComponent("GivePotions").slot3=slot3;
}
