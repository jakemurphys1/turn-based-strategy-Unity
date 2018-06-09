var main : GameObject;
var activeIndex:int;

function heal(){
	var unit = main.GetComponent("Main").units[activeIndex];
	if(unit.health==unit.maxhealth){
		main.GetComponent("Main").makeBigMessage("This unit already has full health");
		return;
	}
	unit.healing=5;
	unit.health=unit.maxhealth;
	main.GetComponent("Main").barrackButton.GetComponent("goToBarracks").gotobarracks();
		unit.arrows["Heal"]=5;
		unit.arrows["Medkit"]=1;
}
