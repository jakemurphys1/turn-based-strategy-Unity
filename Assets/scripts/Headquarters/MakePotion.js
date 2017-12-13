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
var reviveButton: GameObject;
var recoverButton: GameObject;
var replicateButton: GameObject;
var accuracyButton: GameObject;
var evasionButton: GameObject;
var defenseButton: GameObject;
var resistanceButton: GameObject;
var attackButton: GameObject;
var healthButton: GameObject;


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

	var colors;
	//Revive
	colors = reviveButton.GetComponent("Button").colors;
	if( int.Parse(flowers.GetComponent("Text").text)>=4 && int.Parse(extract.GetComponent("Text").text)>=4){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	reviveButton.GetComponent("Button").colors = colors;

	//defense
	colors = defenseButton.GetComponent("Button").colors;
	if( int.Parse(roots.GetComponent("Text").text)>=2 && int.Parse(honey.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	defenseButton.GetComponent("Button").colors = colors;

	//resistance
	colors = resistanceButton.GetComponent("Button").colors;
	if( int.Parse(herbs.GetComponent("Text").text)>=2 && int.Parse(honey.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	resistanceButton.GetComponent("Button").colors = colors;

	//attack
	colors = attackButton.GetComponent("Button").colors;
	if( int.Parse(berries.GetComponent("Text").text)>=2 && int.Parse(mushrooms.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	attackButton.GetComponent("Button").colors = colors;

	//health
	colors = healthButton.GetComponent("Button").colors;
	if( int.Parse(sap.GetComponent("Text").text)>=2 && int.Parse(mushrooms.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	healthButton.GetComponent("Button").colors = colors;

	//recover
	colors = recoverButton.GetComponent("Button").colors;
	if( int.Parse(berries.GetComponent("Text").text)>=2 && int.Parse(flowers.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	recoverButton.GetComponent("Button").colors = colors;

	//replicate
	colors = replicateButton.GetComponent("Button").colors;
	if( int.Parse(essence.GetComponent("Text").text)>=1){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	replicateButton.GetComponent("Button").colors = colors;

	//accuracy
	colors = accuracyButton.GetComponent("Button").colors;
	if( int.Parse(sap.GetComponent("Text").text)>=2 && int.Parse(powder.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	accuracyButton.GetComponent("Button").colors = colors;

	//evasion
	colors = evasionButton.GetComponent("Button").colors;
	if( int.Parse(roots.GetComponent("Text").text)>=2 && int.Parse(powder.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	evasionButton.GetComponent("Button").colors = colors;
	
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
