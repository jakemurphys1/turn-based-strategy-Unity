var Potion:GameObject;
var PotionOn:boolean=true;
var dodgePotion:GameObject;
var dodgePotionOn:boolean=true;
var specialItem:GameObject;
var description:String;
var curSpecial: GameObject;


function Start () {
	GetComponent("Main").other.GetComponent("Music").playMusic("mainMusic");
	MakeEnemies();
	if(dodgePotionOn){
		dodgePotion.SetActive(true);
	}else{
		dodgePotion.SetActive(false);
	}
	curSpecial.GetComponent("special_" + GetComponent("Main").curname).setItem(GetComponent("Main").tutorial);
}

function Pass(){
	curSpecial.GetComponent("special_" + GetComponent("Main").curname).Pass();
}

function MakeEnemies(){
	curSpecial.GetComponent("special_" + GetComponent("Main").curname).MakeEnemies();
}

function groupPass(Egroup){
	curSpecial.GetComponent("special_" + GetComponent("Main").curname).groupPass(Egroup);
}

function isEmpty(location){
	var Egroups = GetComponent("Main").Egroups;

	for(var i =0;i<Egroups.length;i++){
		if(Egroups.location == location){
			return false;
		}
	}
	return true;
}

function placeEnemies(location, count){
	curSpecial.GetComponent("special_" + GetComponent("Main").curname).placeEnemies(location,count);
}

function SpecialFunction(curName){
	//if(GetComponent("special_" + GetComponent("Main").curname).SpecialFunction){
		curSpecial.GetComponent("special_" + GetComponent("Main").curname).SpecialFunction(curName);
	//}
}

function setCurSpecial(object){
	curSpecial=object;
}
