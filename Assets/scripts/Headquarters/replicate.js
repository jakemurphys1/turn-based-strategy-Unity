import UnityEngine.UI;
var useIngreBox: GameObject;
var makeIngreBox: GameObject;
var main:GameObject;
var makePotions:GameObject;

function replicate(){
	var makeIngre = makeIngreBox.GetComponent("Dropdown");
	var useIngre = useIngreBox.GetComponent("Dropdown");

	var making = makeIngre.options[makeIngre.value].text;
	var using = useIngre.options[useIngre.value].text;
	var items = main.GetComponent("Main").items;

	items[using]-=1;
	items["Essence"]-=1;
	items[making]+=1;
	makePotions.GetComponent("MakePotion").replicate();
}