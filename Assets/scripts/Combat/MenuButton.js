var index: int;
var on: boolean = false;
var menu: GameObject;
var onButton: Sprite;
var offButton: Sprite;
var disableButton:Sprite;
var textBox:GameObject;
var imageBox: GameObject;
var main:GameObject;
var count:GameObject;
var message:GameObject;
var message2:GameObject;
var showMessage:boolean=false;
var allowAction:boolean=true;


function clickit(){
	var clickButton = textBox.GetComponent("Text").text;
	var ally = main.GetComponent("Main").units[main.GetComponent("Main").activeIndex];
	
	
	if(allowAction && canSelect(clickButton)){
		main.GetComponent("Main").curAction = clickButton;
	}
	if(clickButton=="Elemental"){
		menu.GetComponent("Menu").elements.SetActive(true);
	}else{
		menu.GetComponent("Menu").elements.SetActive(false);
	}
	if(ally.didAction){
		return;
	}
	if(clickButton=="Medkit" && ally.arrows["Medkit"]>0){
		ally.body.GetComponent("AllyClick").animator.SetInteger("special",1);
		main.GetComponent("combat").heal(ally,ally.maxhealth);
		ally.arrows["Medkit"]-=1;
		menu.GetComponent("Menu").hideAll();
		ally.didAction=true;
	}
	if(clickButton=="Charge"){
			menu.GetComponent("Menu").hideAll();
			main.GetComponent("Special").SpecialFunction("charge");
			ally.charge+=1;
			ally.body.GetComponent("AllyClick").item.GetComponent("Text").text=ally.charge.ToString();
			ally.didAction=true;
			charge(ally);
	}
	if(clickButton=="Reshield"){
			ally.energy+=20;
			main.GetComponent("combat").setEnergyBar(ally);
			ally.didAction=true;
			menu.GetComponent("Menu").hideAll();
			main.GetComponent("combat").wordPopup(ally,"Shield Increased");
	}
	main.GetComponent("Main").showPotentialDamage();
}

function Update(){
	if(textBox.GetComponent("Text").text==main.GetComponent("Main").curAction){
		gameObject.GetComponent("Image").sprite  = onButton;
	}else{
		gameObject.GetComponent("Image").sprite  = offButton;
	}
	if(allowAction==false){
		gameObject.GetComponent("Image").sprite  = disableButton;
	}
}

function ShowDescription(){
	showMessage=true;
	showIt();
}
function HideDescription(){
	showMessage=false;
	message.GetComponent("Text").enabled=false;
	message2.GetComponent("Text").enabled=false;
}

function showIt(){
	yield WaitForSeconds(1);
	if(showMessage){
		message.GetComponent("Text").enabled=true;
		message2.GetComponent("Text").enabled=true;
	}
}

function canSelect(curAction){
	if(curAction == "Elemental"){
		return false;
	}else{
		return true;
	}
}


function charge(ally){
	ally.body.GetComponent("AllyClick").animator.SetInteger("Special",1);
	magic = Resources.Load("effects/Charge", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = ally.body.transform.position;
	instance.transform.position.y+=5;
	yield WaitForSeconds(0.1);	
	ally.body.GetComponent("AllyClick").animator.SetInteger("Special",0);
	yield WaitForSeconds(2);
	Destroy(instance);
}