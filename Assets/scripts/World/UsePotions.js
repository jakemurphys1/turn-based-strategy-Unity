var groupIndex: int;
var main:GameObject;
var givePotions:GameObject;

function Start(){
	main = GameObject.Find("Main");
	givePotions = main.GetComponent("Main").givePotions;
}

function OnMouseDown(){

	var group = main.GetComponent("Main").groups[groupIndex];
	var units = main.GetComponent("Main").units;
	for(var i =0;i<units.length;i++){
		if(units[i].group == groupIndex){
			if(units[i].hor==1){
				var slot1 = units[i];
			}
			if(units[i].hor==2){
				var slot2 = units[i];
			}
			if(units[i].hor==3){
				var slot3 = units[i];
			}
		}
	}

	if(slot1){
		slot1.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot1;
		givePotions.GetComponent("GivePotions").curSlot=1;
	}else if(slot2){
		slot2.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot2;
		givePotions.GetComponent("GivePotions").curSlot=2;
	}else{
		slot3.body.GetComponent("AllyClick").curcamera.enabled = true;
		givePotions.GetComponent("GivePotions").curUnit=slot3;
		givePotions.GetComponent("GivePotions").curSlot=3;
	}
	
	main.GetComponent("Main").givePotions.SetActive(true);
	main.GetComponent("Main").givePotions.GetComponent("GivePotions").updateQuanity();

	if(slot1){
		givePotions.GetComponent("GivePotions").slot1=slot1;
	}
	if(slot2){
		givePotions.GetComponent("GivePotions").slot2=slot2;
	}
	if(slot3){
		givePotions.GetComponent("GivePotions").slot3=slot3;
	}
	
	givePotions.GetComponent("GivePotions").updateIcons();
}

 function giveUnitSlotIndex(number,group){
	var units = main.GetComponent("Main").units;
	for(var i =0;i<units.length;i++){
		if(units[i].group==group && units[i].hor==number){
			return units[i].index;
		}
	}
	return -1;
 }