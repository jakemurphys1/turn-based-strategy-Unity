var main:GameObject;
var flowers:GameObject;
var mushrooms:GameObject;
var honey:GameObject;
var roots:GameObject;
var powder: GameObject;
var sap: GameObject;
var extract:GameObject;
var berries:GameObject;
var herbs:GameObject;
var essence:GameObject;
var revive:GameObject;
var recover:GameObject;
var defense:GameObject;
var resistance:GameObject;
var attack: GameObject;
var health: GameObject;
var barracks: GameObject;
var potionBox:GameObject;
var potionInfo:GameObject;
var statsBox:GameObject;
var replicateBox:GameObject;
var usePotionsBox:GameObject;


function makePotions(){
	barracks.SetActive(false);
	potionBox.SetActive(true);
	potionInfo.SetActive(true);
	statsBox.SetActive(false);
	//usePotionsBox.SetActive(false);
	var items = main.GetComponent("Main").items;
	flowers.GetComponent("Text").text = items["Flowers"].ToString();
	mushrooms.GetComponent("Text").text = items["Mushrooms"].ToString();
	honey.GetComponent("Text").text = items["Honey"].ToString();
	roots.GetComponent("Text").text = items["Roots"].ToString();
	powder.GetComponent("Text").text = items["Powder"].ToString();

	sap.GetComponent("Text").text = items["Sap"].ToString();
	extract.GetComponent("Text").text = items["Extract"].ToString();
	berries.GetComponent("Text").text = items["Berries"].ToString();
	herbs.GetComponent("Text").text = items["Herbs"].ToString();
	essence.GetComponent("Text").text = items["Essence"].ToString();

	revive.GetComponent("Text").text = items["Revive Potion"].ToString();
	recover.GetComponent("Text").text = items["Recover Potion"].ToString();
	defense.GetComponent("Text").text = items["Defense Potion"].ToString();
	resistance.GetComponent("Text").text = items["Resistance Potion"].ToString();
	attack.GetComponent("Text").text = items["Attack Potion"].ToString();
	health.GetComponent("Text").text = items["Health Potion"].ToString();
	main.GetComponent("sounds").playSound("brew");
}
function replicate(){
	barracks.SetActive(false);
	potionBox.SetActive(true);
	var items = main.GetComponent("Main").items;
	flowers.GetComponent("Text").text = items["Flowers"].ToString();
	mushrooms.GetComponent("Text").text = items["Mushrooms"].ToString();
	honey.GetComponent("Text").text = items["Honey"].ToString();
	roots.GetComponent("Text").text = items["Roots"].ToString();
	powder.GetComponent("Text").text = items["Powder"].ToString();

	sap.GetComponent("Text").text = items["Sap"].ToString();
	extract.GetComponent("Text").text = items["Extract"].ToString();
	berries.GetComponent("Text").text = items["Berries"].ToString();
	herbs.GetComponent("Text").text = items["Herbs"].ToString();
	essence.GetComponent("Text").text = items["Essence"].ToString();
	Debug.Log("got ehre");
	revive.GetComponent("Text").text = items["Revive Potion"].ToString();
	recover.GetComponent("Text").text = items["Recover Potion"].ToString();
	defense.GetComponent("Text").text = items["Defense Potion"].ToString();
	resistance.GetComponent("Text").text = items["Resistance Potion"].ToString();
	attack.GetComponent("Text").text = items["Attack Potion"].ToString();
	health.GetComponent("Text").text = items["Health Potion"].ToString();
	main.GetComponent("sounds").playSound("brew");
}
function makeIt(curname,ingre1,ingre2,ingre1value,ingre2value){

}
