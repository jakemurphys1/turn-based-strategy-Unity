var groupIndex: int;
var main:GameObject;
var givePotions:GameObject;

function Start(){
	main = GameObject.Find("Main");
	givePotions = main.GetComponent("Main").givePotions;
}

function OnMouseDown(){

	var group = main.GetComponent("Main").groups[groupIndex];
	if(group.slot1>-1){
		var slot1 = main.GetComponent("Main").units[group.slot3];
	}
	if(group.slot2>-1){
		var slot2 = main.GetComponent("Main").units[group.slot2];
	}
	if(group.slot3>-1){
		var slot3 = main.GetComponent("Main").units[group.slot1];
	}

	if(slot1){
		slot1.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot3;
	}else if(slot2){
		slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot2;
	}else{
		slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot1;
	}
	
	main.GetComponent("Main").givePotions.SetActive(true);

	if(slot1){
		givePotions.GetComponent("GivePotions").slot1=slot1;
	}
	if(slot2){
		givePotions.GetComponent("GivePotions").slot2=slot2;
	}
	if(slot3){
		givePotions.GetComponent("GivePotions").slot3=slot3;
	}
	givePotions.GetComponent("GivePotions").curSlot=1;
	givePotions.GetComponent("GivePotions").updateIcons();
}
