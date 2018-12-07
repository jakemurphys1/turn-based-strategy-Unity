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
var healing:GameObject;
var defense:GameObject;
var resistance:GameObject;
var attack: GameObject;
var health: GameObject;
var evasion: GameObject;
var accuracy: GameObject;
var teleport: GameObject;
var ability: GameObject;
var master: GameObject;
var barracks: GameObject;
var potionBox:GameObject;
var potionInfo:GameObject;
var statsBox:GameObject;
var replicateBox:GameObject;
var usePotionsBox:GameObject;
var brewery:GameObject;

var reviveButton: GameObject;
var healingButton: GameObject;
var replicateButton: GameObject;
var accuracyButton: GameObject;
var evasionButton: GameObject;
var teleportButton: GameObject;
var abilityButton: GameObject;
var masterButton: GameObject;


function makePotions(){
	barracks.SetActive(false);
	potionBox.SetActive(true);
	potionInfo.SetActive(true);
	statsBox.SetActive(false);
	replicateBox.SetActive(false);
	brewery.SetActive(false);
	usePotionsBox.SetActive(false);

	var storeditems = main.GetComponent("Main").StoreInfo.GetComponent("StoreInfo").items;

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
	healing.GetComponent("Text").text = items["Healing Potion"].ToString();
	evasion.GetComponent("Text").text = items["Evasion Potion"].ToString();
	accuracy.GetComponent("Text").text = items["Accuracy Potion"].ToString();
	teleport.GetComponent("Text").text = items["Teleport Potion"].ToString();
	accuracy.GetComponent("Text").text = items["Accuracy Potion"].ToString();
	teleport.GetComponent("Text").text = items["Teleport Potion"].ToString();
	ability.GetComponent("Text").text = items["Ability Potion"].ToString();
	master.GetComponent("Text").text = items["Master Potion"].ToString();

	for(var i =0;i<storeditems.length;i++){
		if(storeditems[i]["name"]=="Revive Potion Recipe" && storeditems[i]["bought"]){
			reviveButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Healing Potion Recipe" && storeditems[i]["bought"]){
			healingButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Teleport Potion Recipe" && storeditems[i]["bought"]){
			teleportButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Accuracy Potion Recipe" && storeditems[i]["bought"]){
			accuracyButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Evasion Potion Recipe" && storeditems[i]["bought"]){
			evasionButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Replicate Potion Recipe" && storeditems[i]["bought"]){
			replicateButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Ability Potion Recipe" && storeditems[i]["bought"]){
			abilityButton.SetActive(true);
		}
		if(storeditems[i]["name"]=="Master Potion Recipe" && storeditems[i]["bought"]){
			masterButton.SetActive(true);
		}
	}

	main.GetComponent("sounds").playSound("brew");

	updateColors();
}

function updateColors(){
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

	//teleport
	colors = teleportButton.GetComponent("Button").colors;
	if( int.Parse(herbs.GetComponent("Text").text)>=4 && int.Parse(extract.GetComponent("Text").text)>=4){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	teleportButton.GetComponent("Button").colors = colors;

	//healing
	colors = healingButton.GetComponent("Button").colors;
	if( int.Parse(berries.GetComponent("Text").text)>=2 && int.Parse(flowers.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	healingButton.GetComponent("Button").colors = colors;

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

	//ability
	colors = abilityButton.GetComponent("Button").colors;
	if( int.Parse(roots.GetComponent("Text").text)>=2 && int.Parse(powder.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	abilityButton.GetComponent("Button").colors = colors;

	//master
	colors = masterButton.GetComponent("Button").colors;
	if( int.Parse(roots.GetComponent("Text").text)>=2 && int.Parse(powder.GetComponent("Text").text)>=2){
		colors.normalColor = Color.black;
		colors.highlightedColor=Color.black;
	}else{
		colors.normalColor = Color.grey;
		colors.highlightedColor=Color.grey;
	}
	masterButton.GetComponent("Button").colors = colors;
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

	revive.GetComponent("Text").text = items["Revive Potion"].ToString();
	healing.GetComponent("Text").text = items["Healing Potion"].ToString();
	defense.GetComponent("Text").text = items["Defense Potion"].ToString();
	resistance.GetComponent("Text").text = items["Resistance Potion"].ToString();
	attack.GetComponent("Text").text = items["Attack Potion"].ToString();
	health.GetComponent("Text").text = items["Health Potion"].ToString();
	main.GetComponent("sounds").playSound("brew");
}
function makeIt(curname,ingre1,ingre2,ingre1value,ingre2value){

}

function showMission(){
	main.GetComponent("Main").makeBigMessage(main.GetComponent("Special").description);
}
