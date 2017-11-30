var units = new Array();
var Eunits = new Array();
var curname: String;
var slots = new Array();
var eslots = new Array();
var groups = new Array();
var Egroups = new Array();
var indexNum: int=0;
var EindexNum:int=0;
var groupIndex:int=0;
var EgroupIndex:int=0;
var activeIndex:int=0;
var test: int = 12;
var ship: GameObject;
var inCombat:boolean = false;
var Terrain:GameObject;
var activeGroup:int=-1;
var selectedUnit: GameObject;
var curCamera: GameObject;
var moveGrid: GameObject;
var curGrid = new Array();
var floatText: GameObject;
var curAction: String;
var statBox:GameObject;
var statBox2:GameObject;
var pass: GameObject;
var level:int;
var groupScreen: GameObject;
var switchNum:int=-1;
var switchImage:GameObject;
var items = {};
var messageBox: GameObject;
var messages = new Array();
var givePotions: GameObject;
var bigBox:GameObject;
var bigMessage:GameObject;
var barrackButton:GameObject;
var healButton:GameObject;
var gameover: GameObject;
var ArcherPic: Sprite;
var ClericPic: Sprite;
var GuardPic: Sprite;
var KnightPic: Sprite;
var MagePic: Sprite;
var RougePic: Sprite;
var SoldierPic: Sprite;
var SorcererPic: Sprite;
var TemplarPic: Sprite;
var ThiefPic: Sprite;
var WizardPic: Sprite;



function Start () {

	createUnit("Wizard");
	createUnit("Archer");
	createUnit("Knight");

	createUnit("Mage");
	createUnit("Templar");
	createUnit("Soldier");

	createUnit("Guard");
	createUnit("Cleric");


	units[2].energy=50;

	//createEGroup("Goblin","Goblin","Goblin","Goblin","Goblin",entrance1, 1000);
	//tempStart();

	items["Flowers"]=10;
	items["Mushrooms"]=10;
	items["Honey"]=10;
	items["Roots"]=10;
	items["Powder"]=10;
	items["Sap"]=10;
	items["Extract"]=10;
	items["Berries"]=10;
	items["Herbs"]=10;
	items["Essence"]=10;
	items["Teleport Potion"]=1;
	items["Revive Potion"]=1;
	items["Recover Potion"]=1;
	items["Defense Potion"]=2;
	items["Resistance Potion"]=2;
	items["Attack Potion"]=1;
	items["Health Potion"]=2;
	items["Accuracy Potion"]=1;
	items["Evasion Potion"]=2;
}

function tempStart(){
	
	
	units[0].actionsActive["Scout"]=true;
	units[0].actionsActive["BackStab"]=true;
	units[0].actionsActive["Flying"]=true;
	units[0].actionsActive["Reach"]=true;
	units[0].actionsActive["Cleanse"]=true;
	units[0].actionsActive["Double Vigor"]=true;

	units[1].actionsActive["Explosion"]=true;
	units[1].actionsActive["Sweep"]=true;
	units[1].actionsActive["Swirl"]=true;
	units[1].actionsActive["Push"]=true;
	units[1].actionsActive["Drain"]=true;
	units[1].actionsActive["Ailments"]=true;
	units[1].actionsActive["Start Charge"]=true;

	units[2].actionsActive["Swirl"]=true;


	createEGroup("Goblin","","","","",ship, 1000);

	createGroup(0,1,2);
	checkBattle(ship);
	curGrid = ship.GetComponent("locations").allspaces;
	activeGroup=0;
}


//unit creation
function createUnit(name){
	units[indexNum]= new Ally(indexNum,name);
	indexNum+=1;
}
 function createEUnit(name){
	Eunits[EindexNum]= new Enemy(EindexNum,name,level);
	EindexNum+=1;
}
function createGroup(slot1:int,slot2:int,slot3:int){
	if(slot1==-1){
		return;
	}

	groups[groupIndex]= new Group(slot1,slot2,slot3,ship);
	circle = Instantiate(Resources.Load("GroupCircle", GameObject));
	groups[groupIndex].circle = circle;
	circle.transform.position=ship.GetComponent.<locations>().space20.transform.position;
	circle.transform.GetChild(0).GetComponent("UsePotions").groupIndex=groupIndex;

	units[slot1].group = groupIndex;
	unit1 = Instantiate(Resources.Load("allies3D/" + units[slot1].type, GameObject));
	unit1.transform.position=ship.GetComponent.<locations>().space10.transform.position;
	unit1.transform.SetParent(Terrain.transform,false);
	unit1.GetComponent("AllyClick").index=slot1;
	groups[groupIndex].slot1Object = unit1;
	units[slot1].hor = 1;
	units[slot1].body = unit1;
	GetComponent("combat").setEnergyBar(units[slot1]);


	if(slot2!=-1 && units.length>slot2){
		units[slot2].group = groupIndex;
		unit2 = Instantiate(Resources.Load("allies3D/" + units[slot2].type, GameObject));
		unit2.transform.position=ship.GetComponent.<locations>().space20.transform.position;
		unit2.transform.SetParent(Terrain.transform,false);
		unit2.GetComponent("AllyClick").index=slot2;
		groups[groupIndex].slot2Object = unit2;
		units[slot2].hor = 2;
		units[slot2].body = unit2;
		GetComponent("combat").setEnergyBar(units[slot2]);
	}
	if(slot3!=-1 && units.length>slot3){
		units[slot3].group = groupIndex;
		unit3 = Instantiate(Resources.Load("allies3D/"+units[slot3].type, GameObject));
		unit3.transform.position=ship.GetComponent.<locations>().space30.transform.position;
		unit3.transform.SetParent(Terrain.transform,false);
		unit3.GetComponent("AllyClick").index=slot3;
		groups[groupIndex].slot3Object = unit3;
		units[slot3].hor = 3;
		units[slot3].body=unit3;
		GetComponent("combat").setEnergyBar(units[slot3]);
	}

	

	groups[groupIndex].location = ship;
	groups[groupIndex].index = groupIndex;

	groupIndex+=1;
}
function createEGroup(slot1:String,slot2:String,slot3:String,slot4:String,slot5:String,location:GameObject,experience:int){
	Egroups[EgroupIndex]= new EGroup(EindexNum,EindexNum+1,EindexNum+2,EindexNum+3,EindexNum+4,location,experience);

	if(slot1){
		createEUnit(slot1);
		Eunits[EindexNum-1].group = EgroupIndex;
		unit1 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
		unit1.transform.position=location.GetComponent.<locations>().space04.transform.position;
			unit1.transform.position.y=Eunits[EindexNum-1].height;
	
		unit1.transform.SetParent(Terrain.transform,false);
		unit1.GetComponent("EnemyClick").eindex = EindexNum-1;
		Egroups[EgroupIndex].slot1Object = unit1;
		Eunits[EindexNum-1].body = unit1;
		Eunits[EindexNum-1].hor = 0;
		quickMessage(Eunits[EindexNum-1].type + " has appeared!");
	}
	

	if(slot2){
			createEUnit(slot2);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit2 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit2.transform.position=location.GetComponent.<locations>().space14.transform.position;
			unit2.transform.position.y=1;
			unit2.transform.SetParent(Terrain.transform,false);
			unit2.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot2Object = unit2;
			Eunits[EindexNum-1].body = unit2;
			Eunits[EindexNum-1].hor = 1;
			quickMessage(Eunits[EindexNum-1].type + " has appeared!");
	}
	if(slot3){
			createEUnit(slot3);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit3 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit3.transform.position=location.GetComponent.<locations>().space24.transform.position;
			unit3.transform.position.y=1;
			unit3.transform.SetParent(Terrain.transform,false);
			unit3.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot3Object = unit3;
			Eunits[EindexNum-1].body = unit3;
			Eunits[EindexNum-1].hor = 2;
			quickMessage(Eunits[EindexNum-1].type + " has appeared!");
	}
	if(slot4){
			createEUnit(slot4);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit4 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit4.transform.position=location.GetComponent.<locations>().space34.transform.position;
			unit4.transform.position.y=1;
			unit4.transform.SetParent(Terrain.transform,false);
			unit4.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot4Object = unit4;
			Eunits[EindexNum-1].body = unit4;
			Eunits[EindexNum-1].hor = 3;
			quickMessage(Eunits[EindexNum-1].type + " has appeared!");
	}
	if(slot5){
			createEUnit(slot5);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit5 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit5.transform.position=location.GetComponent.<locations>().space44.transform.position;
			unit5.transform.position.y=1;
			unit5.transform.SetParent(Terrain.transform,false);
			unit5.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot5Object = unit5;
			Eunits[EindexNum-1].body = unit5;
			Eunits[EindexNum-1].hor = 4;
			quickMessage(Eunits[EindexNum-1].type + " has appeared!");
	}

	var curPos= curCamera.transform.position;

		//zoom camera
	var t = 0.0;
	var startPosition = curCamera.transform.position;
	var endPosition =location.transform.position;
	endPosition.y = startPosition.y;
	while (t < 1.0)
	{
		t += 0.05;
		curCamera.transform.position = Vector3.Lerp(startPosition,endPosition,t);
		yield;
	}

	yield WaitForSeconds(1);
	t = 0.0;
	while (t < 1.0)
	{
		t += 0.05;
		curCamera.transform.position = Vector3.Lerp(endPosition,startPosition,t);
		yield;
	}


	EgroupIndex+=1;
}
class Group{
	var location:GameObject;
	var slot1: int;
	var slot2: int;
	var slot3: int;
	var slot1Object: GameObject;
	var slot2Object: GameObject;
	var slot3Object: GameObject;
	var circle:GameObject;
	var hasMoved: boolean=false;
	var index:int;

	function Group(slot1:int,slot2:int,slot3:int,location:GameObject){
		this.location=location;
		this.slot1=slot1;
		this.slot2=slot2;
		this.slot3=slot3;
	}
}
class EGroup{
	var location:GameObject;
	var slot1: int;
	var slot2: int;
	var slot3: int;
	var slot4: int;
	var slot5: int;
	var slot1Object: GameObject;
	var slot2Object: GameObject;
	var slot3Object: GameObject;
	var slot4Object: GameObject;
	var slot5Object: GameObject;
	var experience: int;

	function EGroup(slot1:int,slot2:int,slot3:int,slot4:int,slot5:int,location:GameObject,experience:int){
		this.location=location;
		this.slot1=slot1;
		this.slot2=slot2;
		this.slot3=slot3;
		this.slot4=slot4;
		this.slot5=slot5;
		this.experience=experience;
		
	}
}
class Ally{
   var type:String;
   var maxhealth:int=30;
   var health:int=30;
   var attack:int=10;
   var defense:int=10;
   var resistance:int=5;
   var accuracy:int=3;
   var immobolized:int=0;
   var sleep:int=0;
   var enfeebled:int=0;
   var blind:int=0;
   var silenced:int=0;
   var poison:int=0;
   var evasion:int=3;
   var energy:int;
   var charge:int=0;
   var index:int;
   var vert: int;
   var hor:int;
   var element:String;
   var group:int = -1;
   var actions= new Array();
   var passiveActions= new Array();
   var actionImages = new Array();
   var actionsActive = {};
   var actionDes1 = {};
   var actionDes2 = {};
   var abilities = new Array();
   var abillityFunction = {};
   var arrows = {};
   var invisible: boolean=false;
   var arrowCapacity:int=1;
   var level: int = 1;
   var body:GameObject;
   var hasMoved: boolean=false;
   var didAction: boolean=false;
   var alive: boolean=true;
   var experience: int = 0;
   var protectedBy:int = -1;
   var height:int=1;

   var attackBoost: boolean=false;
   var defenseBoost: boolean=false;
   var resistanceBoost: boolean=false;
   var healthBoost: boolean=false;
   var evasionBoost: boolean=false;
   var accuracyBoost: boolean=false;

   var enroute: int=0;
   var healing: int=0;

   function Ally(indexNum:int,type:String){
		if(type=="Archer"){
			   this.maxhealth=80;
			   this.attack=40;
			   this.defense=10;
			   this.resistance=10;
			   this.accuracy=3;
			   this.actions[0] = "Normal";
			   this.actions[1] = "Explosion";
			   this.actions[2] = "Piercing";
			   this.actions[3] = "Immobolize";
			   this.actions[4] = "Titan";
			   this.passiveActions[0]= "Double Arrows";
			   this.abilities[0] = "Normal";
			   this.abilities[1] = "Explosion";
			   this.abilities[2] = "Piercing";
			   this.abilities[3] = "Immobolize";
			   this.abilities[4] = "Titan";
			   this.abilities[5] = "Double Arrows";
			   this.actionsActive["Normal"]=true;
			   this.actionDes1["Normal"] = "Standard Arrow with unlimited supply";
			   this.actionDes2["Normal"]  = "Deals damage equal to your archer's attack to any enemy";
			   this.actionDes1["Explosion"] = "This special arrow causes an explosion in an area.";
			   this.actionDes2["Explosion"]  = "Deals fire damage equal to your archer's attack to any enemy and all enemies around it.";
			   this.actionDes1["Piercing"] = "This special Arrow can pierce through an enemy's armor with ease.";
			   this.actionDes2["Piercing"]  = "Deals damage equal to your archer's attack to any enemy and ignores their defense";
			   this.actionDes1["Immobolize"] = "This special Arrow will temporarily disable the enemy's legs.";
			   this.actionDes2["Immobolize"]  = "Immobolizes the enemy for two turns, preventing them from moving from their current position.";
			   this.actionDes1["Titan"] = "This special Arrow does twice the damage of an average arrow.";
			   this.actionDes2["Titan"]  = "Deals damage equal to double your archer's attack to any enemy.";
			   this.actionDes1["Double Arrows"] = "Double Supply of Arrows";
			   this.actionDes2["Double Arrows"]  = "Archer begins each battle with two of each type of arrow";
			   this.arrows["Explosion"]=arrowCapacity;
			   this.arrows["Piercing"]=arrowCapacity;
			   this.arrows["Immobolize"]=arrowCapacity;
			   this.arrows["Titan"]=arrowCapacity;
		}
		if(type=="Rouge"){
			   this.maxhealth=80;
			   this.attack=30;
			   this.defense=10;
			   this.resistance=10;
			   this.accuracy=3;
			   this.actions[0] = "Normal";
			   this.actions[1] = "Poison";
			   this.actions[2] = "Blindness";
			   this.actions[3] = "Sleep";
			   this.actions[4] = "Enfeeble";
			   this.passiveActions[0]= "Duration";
			   this.passiveActions[1]= "Double Arrows";
			   this.abilities[0] = "Poison";
			   this.abilities[1] = "Blindness";
			   this.abilities[2] = "Sleep";
			   this.abilities[3] = "Enfeeble";
			   this.abilities[4] = "Duration Increase";
			   this.abilities[5] = "Double Arrows";
			   this.actionsActive["Normal"]=true;
			   this.actionsActive["Poison"]=true;
			   this.actionDes1["Normal"] = "Standard Arrow with unlimited supply";
			   this.actionDes2["Normal"]  = "Deals damage equal to your rouge's attack to any enemy in a straight line";
			   this.actionDes1["Poison"] = "Poison your enemy";
			   this.actionDes2["Poison"]  = "Poisons the enemy for two turns, which cause them to lose life every turn. Cannot kill them.";
			   this.actionDes1["Blindness"] = "Temporarily blinds your enemies";
			   this.actionDes2["Blindness"]  = "Blinds enemy for 2 turns, preventing them from doing physical attacks. They can still move and use magic.";
			   this.actionDes1["Sleep"] = "Puts your enemies to sleep.";
			   this.actionDes2["Sleep"]  = "Inflicts sleep onto your enemy for one turn, preventing them from doing anything.";
			   this.actionDes1["Enfeeble"] = "Destroy your enemy's defenses.";
			   this.actionDes2["Enfeeble"]  = "Enfeebles the enemy for two turns, reducing their defense and resistance to 0 for that duration.";
			   this.actionDes1["Duration"] = "Longer ailments";
			   this.actionDes2["Duration"]  = "All ailments inflicted by the rouge will last one extra turn.";
			   this.actionDes1["Double Arrows"] = "Double Supply of Arrows";
			   this.actionDes2["Double Arrows"]  = "Rouge begins each battle with two of each type of arrow";
			   this.arrows["Poison"]=arrowCapacity;
			   this.arrows["Blindness"]=arrowCapacity;
			   this.arrows["Sleep"]=arrowCapacity;
			   this.arrows["Enfeeble"]=arrowCapacity;
		}
		if(type=="Templar"){
			   this.maxhealth=80;
			   this.attack=30;
			   this.defense=0;
			   this.resistance=30;
			   this.accuracy=3;
			   this.actions[0] = "Normal";
			   this.actions[1] = "Silence";
			   this.actions[2] = "GrapplingHook";
			   this.actions[3] = "Elemental";
			   this.actions[4] = "Disrupt";
			   this.actions[5] = "Burst";
			   this.passiveActions[0]= "Double Arrows";
			   this.abilities[0] = "Silence";
			   this.abilities[1] = "GrapplingHook";
			   this.abilities[2] = "Elemental";
			   this.abilities[3] = "Disrupt";
			   this.abilities[4] = "Burst";
			   this.abilities[5] = "Double Arrows";
			   this.actionsActive["Normal"]=true;
			   this.actionsActive["Silence"]=true;
			   this.actionDes1["Normal"] = "Standard Arrow with unlimited supply";
			   this.actionDes2["Normal"]  = "Deals damage equal to your templar's attack to any enemy in a straight line";
			   this.actionDes1["Silence"] = "Silence your Enemy";
			   this.actionDes2["Silence"]  = "Silences the enemy for 2 turns, preventing them from using magical attacks.";
			   this.actionDes1["GrapplingHook"] = "Yank your Enemy Over";
			   this.actionDes2["GrapplingHook"]  = "Pulls the Enemy to the templar. Can't use this if there's already an enemy in that space";
			   this.actionDes1["Elemental"] = "Add Some Elements to the Arrows";
			   this.actionDes2["Elemental"]  = "Before the templar attacks, choose an element to add to the arrow";
			   this.actionDes1["Disrupt"] = "Stop that Magic";
			   this.actionDes2["Disrupt"]  = "Reduces all enemy's charge to 0.";
			   this.actionDes1["Burst"] = "Use the enemy's resistance against them";
			   this.actionDes2["Burst"]  = "Deals damge equal to your templar's attack plus the enemy's resistance";
			   this.actionDes1["Double Arrows"] = "Double Supply of Arrows";
			   this.actionDes2["Double Arrows"]  = "Templar begins each battle with two of each type of arrow";
			   this.arrows["Silence"]=arrowCapacity;
			   this.arrows["GrapplingHook"]=arrowCapacity;
			   this.arrows["Disrupt"]=arrowCapacity;
			   this.arrows["Burst"]=arrowCapacity;
			   this.element = "Fire";
		}
		if(type=="Soldier"){
			   this.maxhealth=120;
			   this.attack=60;
			   this.defense=20;
			   this.resistance=0;
			   this.accuracy=3;
			   this.actions[0] = "Attack";
			   this.actions[1] = "Medkit";
			   this.passiveActions[0]= "Dash";
			   this.passiveActions[1]= "Immunity";
			   this.passiveActions[2]= "Steadfast";
			   this.passiveActions[3]= "Counter";
			   this.abilities[0] = "Attack";
			   this.abilities[1] = "Dash";
			   this.abilities[2] = "Immunity";
			   this.abilities[3] = "Steadfast";
			   this.abilities[4] = "Medkit";
			   this.abilities[5] = "Counter";
			   this.actionsActive["Attack"]=true;
			   this.actionDes1["Attack"] = "Standard Sword Attack";
			   this.actionDes2["Attack"]  = "Deals damage equal to your soldier's attack to an adjacent enemy";
			   this.actionDes1["Dash"] = "Sprint towards the enemy";
			   this.actionDes2["Dash"]  = "The soldier can move twice instead of attacking";
			   this.actionDes1["Immunity"] = "Immunity to All ailments";
			   this.actionDes2["Immunity"]  = "The soldier cannot be inflicted by any ailment";
			   this.actionDes1["Steadfast"] = "Soldier is now harder to kill";
			   this.actionDes2["Steadfast"]  = "If the soldier would be killed, it's health is reduced to 1 instead.";
			   this.actionDes1["Medkit"] = "Soldier Can Heal His Wounds During Battle";
			   this.actionDes2["Medkit"]  = "The medkit fully heals the soldier. Can only carry one medkit at a time, and must rest to replenish it.";
			   this.actionDes1["Counter"] = "No attacks go unmet";
			   this.actionDes2["Counter"]  = "All adjacent attack onto the soldier causes the soldier to attack it back.";
			   this.arrows["Medkit"]=1;
		}
		if(type=="Knight"){
			   this.maxhealth=120;
			   this.attack=80;
			   this.defense=20;
			   this.resistance=0;
			   this.accuracy=3;
			   this.actions[0] = "Attack";
			   this.actions[1] = "Swirl";
			   this.actions[2] = "Sweep";
			   this.actions[3] = "Push";
			   this.actions[4] = "Wail";
			   this.passiveActions[0]= "FreeMove";
			   this.abilities[0] = "Attack";
			   this.abilities[1] = "Swirl";
			   this.abilities[2] = "Sweep";
			   this.abilities[3] = "FreeMove";
			   this.abilities[4] = "Push";
			   this.abilities[5] = "Wail";
			   this.actionsActive["Attack"]=true;
			   this.actionDes1["Attack"] = "Standard Sword Attack";
			   this.actionDes2["Attack"]  = "Deals damage equal to your knight's attack to an adjacent enemy";
			   this.actionDes1["Swirl"] = "Swirl of Death";
			   this.actionDes2["Swirl"]  = "Attacks all adjacent enemies. Costs 30 energy.";
			   this.actionDes1["Sweep"] = "Long Sword Sweep";
			   this.actionDes2["Sweep"]  = "Attacks an adjacent enemy and the enemies next to it. Costs 30 energy.";
			   this.actionDes1["FreeMove"] = "Knight is Better at Using His Armor";
			   this.actionDes2["FreeMove"]  = "Moving no longer costs energy";
			   this.actionDes1["Push"] = "Back Off";
			   this.actionDes2["Push"]  = "Pushes an adjacent enemy straight back. Costs 30 energy.";
			   this.actionDes1["Wail"] = "Smash the Enemy Until it Stops Moving";
			   this.actionDes2["Wail"]  = "Continues to attack until he runs out of energy. Each attack has a reduction of accuracy.";
			   this.energy=100;
		}
		if(type=="Thief"){
			   this.maxhealth=90;
			   this.attack=40;
			   this.defense=10;
			   this.resistance=10;
			   this.accuracy=3;
			   this.actions[0] = "Attack";
			   this.actions[1] = "Steal";
			   this.actions[2] = "Phase";
			   this.passiveActions[0]= "Invisible";
			   this.passiveActions[1]= "BackStab";
			   this.passiveActions[2]= "FirstBlow";
			   this.passiveActions[3]= "Better Steal";
			   this.abilities[0] = "Steal";
			   this.abilities[1] = "Invisible";
			   this.abilities[2] = "BackStab";
			   this.abilities[3] = "Phase";
			   this.abilities[4] = "FirstBlow";
			   this.abilities[5] = "Better Steal";
			   this.actionsActive["Attack"]=true;
			   this.actionsActive["Steal"]=true;
			   this.actionDes1["Attack"] = "Standard Sword Attack";
			   this.actionDes2["Attack"]  = "Deals damage equal to your thief's attack to an adjacent enemy, and may steal from the enemy. Lower the health, more likely the success.";
			   this.actionDes1["Steal"] = "Steal From the Enemy";
			   this.actionDes2["Steal"]  = "Attempt to steal from the enemy. Lower the health, more likely the success. Thief can stay invisible";
			   this.actionDes1["Invisible"] = "Enemy's Can't Attack What They Can't See";
			   this.actionDes2["Invisible"]  = "Enemy's can't attack the thief while invisible. Attacking causes the thief to become visible for a turn.";
			   this.actionDes1["BackStab"] = "Strike from the shadows";
			   this.actionDes2["BackStab"]  = "Attacks from behind deals double damage.";
			   this.actionDes1["Phase"] = "Phase Through the Enemy's Armor";
			   this.actionDes2["Phase"]  = "The thief and an enemy switches places, and the enemy becomes enfeebled for a turn, reducing it's defense and resistance to 0";
			   this.actionDes1["FirstBlow"] = "Speedy Attack to the Eyes";
			   this.actionDes2["FirstBlow"]  = "If the enemy is undamaged, this attack blinds it for 2 turns";
			   this.actionDes1["Better Steal"] = "Master of Thievery";
			   this.actionDes2["Better Steal"]  = "Stealing has a 100% success rate.";
		}
		if(type=="Mage"){
			   this.maxhealth=100;
			   this.attack=40;
			   this.defense=15;
			   this.resistance=15;
			   this.accuracy=3;
			   this.actions[0] = "Fire";
			   this.actions[1] = "Zap";
			   this.actions[2] = "Freeze";
			   this.actions[3] = "Execute";
			   this.passiveActions[0]= "Ailments";
			   this.passiveActions[1]= "DoubleTap";
			   this.abilities[0] = "Fire";
			   this.abilities[1] = "Zap";
			   this.abilities[2] = "Freeze";
			   this.abilities[3] = "Ailments";
			   this.abilities[4] = "Execute";
			   this.abilities[5] = "DoubleTap";
			   this.actionsActive["Fire"]=true;
			   this.actionDes1["Fire"] = "Throw a Fireball";
			   this.actionDes2["Fire"]  = "Deals fire damage to an enemy up to two spaces away, or diagonally.";
			   this.actionDes1["Zap"] = "Electrocute your enemies";
			   this.actionDes2["Zap"]  = "Deals Lightning Damage to one or two enemies in a straight line up to two spaces away";
			   this.actionDes1["Freeze"] = "Throw Ice at Your Enemies";
			   this.actionDes2["Freeze"]  = "Deals Ice Damage to an Enemy up to three spaces away";
			   this.actionDes1["Ailments"] = "Inflict your Enemy's with Ailments";
			   this.actionDes2["Ailments"]  = "Freeze may cause sleep, zap may cause immobolize, and fire may cause blindness";
			   this.actionDes1["Execute"] = "Put a weak enemy out of it's misery";
			   this.actionDes2["Execute"]  = "May instantly kill an enemy. The lower it's health, the more likely to succeed";
			   this.actionDes1["DoubleTap"] = "Attack Twice";
			   this.actionDes2["DoubleTap"]  = "Mage may attack again instead of moving.";
		}
		if(type=="Wizard"){
			   this.maxhealth=80;
			   this.attack=60;
			   this.defense=0;
			   this.resistance=30;
			   this.accuracy=3;
			   this.actions[0] = "Charge";
			   this.actions[1] = "Gust";
			   this.actions[2] = "Lightning";
			   this.actions[3] = "Missiles";
			   this.actions[4] = "Drain";
			   this.passiveActions[0]= "Ailments";
			   this.passiveActions[1]= "Start Charge";
			   this.abilities[0] = "Gust";
			   this.abilities[1] = "Lightning";
			   this.abilities[2] = "Missiles";
			   this.abilities[3] = "Ailments";
			   this.abilities[4] = "Drain";
			   this.abilities[5] = "Start Charge";
			   this.actionsActive["Gust"]=true;
			   this.actionsActive["Charge"]=true;
			   this.actionDes1["Charge"] = "Charge Up";
			   this.actionDes2["Charge"]  = "Use this to increase your charge by one.";
			   this.actionDes1["Gust"] = "Blow Away the Enemy";
			   this.actionDes2["Gust"]  = "Deals Ice Damage to any enemy and pushes it back by one. Costs one charge.";
			   this.actionDes1["Lightning"] = "Have the Heavens Destroy Your Enemies";
			   this.actionDes2["Lightning"]  = "Deals Lightning Damage to any enemy equal to twice the wizard's attack. Costs two charge.";
			   this.actionDes1["Missiles"] = "Shoot fiery missiles at your enemy";
			   this.actionDes2["Missiles"]  = "Deals Fire Damage to an Enemy in a straight line a number of times equal to the wizard's charge. Uses all remaining charge.";
			   this.actionDes1["Ailments"] = "Inflict your Enemy's with Ailments";
			   this.actionDes2["Ailments"]  = "Gust may cause sleep, lightning may cause immobolize, and missiles may cause blindness";
			   this.actionDes1["Drain"] = "Steals your Enemy's Charge";
			   this.actionDes2["Drain"]  = "Reduces an adjacent enemy's charge to 0, and gives it to the wizard.";
			   this.actionDes1["Start Charge"] = "Enter the Battle Ready to Fight";
			   this.actionDes2["Start Charge"]  = "Wizard begins each battle with 2 Charge";
		}
		if(type=="Sorcerer"){
			   this.maxhealth=80;
			   this.attack=40;
			   this.defense=0;
			   this.resistance=30;
			   this.accuracy=3;
			   this.actions[0] = "Blizzard";
			   this.actions[1] = "Bolt";
			   this.actions[2] = "FireBlast";
			   this.actions[3] = "Earth";
			   this.actions[4] = "Death";
			   this.passiveActions[0]= "Surge";
			   this.abilities[0] = "Blizzard";
			   this.abilities[1] = "Bolt";
			   this.abilities[2] = "FireBlast";
			   this.abilities[3] = "Earth";
			   this.abilities[4] = "Surge";
			   this.abilities[5] = "Death";
			   this.actionsActive["Blizzard"]=true;
			   this.actionDes1["Blizzard"] = "Freeze all your enemies";
			   this.actionDes2["Blizzard"]  = "Deals Ice Damage to all enemies. Costs 30";
			   this.actionDes1["Bolt"] = "Have the Heavens Destroy Your Enemies";
			   this.actionDes2["Bolt"]  = "Deals Lightning magic Damage to any enemy that deals damage equal to twice the sorcerer's attack. Costs 30";
			   this.actionDes1["FireBlast"] = "Blow up your enemies";
			   this.actionDes2["FireBlast"]  = "Deals fire damage to an enemy and all enemies next to it Costs 30";
			   this.actionDes1["Earth"] = "Throw a boulder at your enemy";
			   this.actionDes2["Earth"]  = "Deals physical Damage to any enemy that deals damage equal to twice the sorcerer's attack. Costs 30";
			   this.actionDes1["Surge"] = "Draw mana faster";
			   this.actionDes2["Surge"]  = "The sorcerer doubles his mana increase";
			   this.actionDes1["Death"] = "The name says it all";
			   this.actionDes2["Death"]  = "Instantly kills any enemy. Costs 50";
			   this.energy=100;
		}
		if(type=="Guard"){
			   this.maxhealth=170;
			   this.attack=30;
			   this.defense=20;
			   this.resistance=20;
			   this.accuracy=3;
			   this.actions[0] = "Bash";
			   this.actions[1] = "Protect";
			   this.actions[2] = "Reshield";
			   this.passiveActions[0]= "Immunity";
			   this.passiveActions[1]= "Scout";
			   this.passiveActions[2]= "SuperShield";
			   this.abilities[0] = "Bash";
			   this.abilities[1] = "Protect";
			   this.abilities[2] = "Immunity";
			   this.abilities[3] = "Scout";
			   this.abilities[4] = "Reshield";
			   this.abilities[5] = "SuperShield";
			   this.actionsActive["Bash"]=true;
			   this.actionDes1["Bash"] = "Attack your Enemies";
			   this.actionDes2["Bash"]  = "Deals  Damage to an adjacent enemy equal to the guard's attack";
			   this.actionDes1["Protect"] = "Protect your Allies";
			   this.actionDes2["Protect"]  = "Protects an ally. All damage to that ally is redirected to the guard.";
			   this.actionDes1["Immunity"] = "Ailments Can't Stop Him";
			   this.actionDes2["Immunity"]  = "Guard and whoever he is protecting can't be inflicted by ailments";
			   this.actionDes1["Scout"] = "Always Good to Plan Ahead";
			   this.actionDes2["Scout"]  = "The group with this guard always goes first.";
			   this.actionDes1["Reshield"] = "Recharge the Guard's shield";
			   this.actionDes2["Reshield"]  = "Increase the Guard's shield energy by 10";
			   this.actionDes1["SuperShield"] = "Shields at Max";
			   this.actionDes2["SuperShield"]  = "The Guard begins with double shield energy";
			   this.energy=25;
		}
		if(type=="Cleric"){
			   this.maxhealth=80;
			   this.attack=0;
			   this.defense=0;
			   this.resistance=0;
			   this.accuracy=3;
			   this.actions[0] = "Vigor";
			   this.actions[1] = "Heal";
			   this.passiveActions[0]= "Move";
			   this.passiveActions[1]= "Reach";
			   this.passiveActions[2]= "Cleanse";
			   this.passiveActions[3]= "Double Vigor";
			   this.abilities[0] = "Vigor";
			   this.abilities[1] = "Move";
			   this.abilities[2] = "Reach";
			   this.abilities[3] = "Heal";
			   this.abilities[4] = "Cleanse";
			   this.abilities[5] = "Double Vigor";
			   this.actionsActive["Vigor"]=true;
			   this.actionDes1["Vigor"] = "Give an Ally an Extra Turn";
			   this.actionDes2["Vigor"]  = "Give an ally an extra action";
			   this.actionDes1["Move"] = "Fully replenish your ally";
			   this.actionDes2["Move"]  = "Vigor also gives the ally an extra move";
			   this.actionDes1["Reach"] = "Use Vigor anywhere";
			   this.actionDes2["Reach"]  = "Cleric can use Vigor on any ally regardless of location";
			   this.actionDes1["Heal"] = "Heal your allies";
			   this.actionDes2["Heal"]  = "Restore any ally's health by 20 using the cleric's energy. Rest to replenish that energy";
			   this.actionDes1["Cleanse"] = "Get rid of those ailments";
			   this.actionDes2["Cleanse"]  = "Vigor and Heal also removes all ailments from that ally";
			   this.actionDes1["Double Vigor"] = "Vigor for everyone";
			   this.actionDes2["Double Vigor"]  = "Vigor on any ally effects all non-cleric allies";
			   this.arrows["Heal"]=5;
		}
		   this.health=this.maxhealth;
   		   this.index = indexNum;
		   this.vert=0;
		   this.type = type;
		}
 }
class Enemy{
   var type:String="Goblin";
   var maxhealth:int=30;
   var health:int=30;
   var attack:int=10;
   var defense:int=5;
   var resistance:int=5;
   var accuracy:int=3;
   var evasion:int=3;
   var immobolized:int=0;
   var charge:int=-1;
   var maxcharge:int=-1;
   var sleep:int=0;
   var enfeebled:int=0;
   var blind:int=0;
   var silenced:int=0;
   var poison:int=0;
   var elemental = {};
   var index:int;
   var vert: int;
   var hor:int;
   var group:int = -1;
   var attackType:String;
   var moveType:String;
   var defenseType:String = "defense";
   var doubleAttack:int=1;
   var body:GameObject;
   var hasMoved: boolean=false;
   var didAction: boolean=false;
   var alive: boolean=true;
   var height:int=1;
   var hasItem:boolean=true;
   var chargeAfterAttack=false;
   var phasedout=false;
   var phasing=false;

   function Enemy(curindexNum:int,type:String,level:int){
		if(type=="Goblin"){
			if (level == 1) {
             this.attack = 20;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 30;
				 this.health = 40;
				 this.maxhealth = 40;
			 }
			 if (level == 3) {
				 this.attack = 40;
				 this.health = 60;
				 this.maxhealth = 60;
			 }
			 if (level == 4) {
				 this.attack = 50;
				 this.health = 75;
				 this.maxhealth = 75;
			 }
			 this.defense = 15;
			 this.resistance = 15;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		}//done
		if(type=="Spitter"){
			if (level == 1) {
             this.attack = 15;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 85;
				 this.maxhealth = 85;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="SpitterAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="BrownOoze"){
			if (level == 1) {
             this.attack = 15;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 85;
				 this.maxhealth = 85;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="SpitterAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
		};//done
		if(type=="RedOoze"){
			if (level == 1) {
             this.attack = 15;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 85;
				 this.maxhealth = 85;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="SpitterAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=0.5;
			 this.elemental["Ice"]=2;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
		};//done
		if(type=="BlueOoze"){
			if (level == 1) {
             this.attack = 15;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 85;
				 this.maxhealth = 85;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="SpitterAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=2;
			 this.elemental["Ice"]=0.5;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=1;
		};//done
		if(type=="GreenOoze"){
			if (level == 1) {
             this.attack = 15;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 85;
				 this.maxhealth = 85;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="SpitterAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
		};//done
		if(type=="Gremlin"){
			if (level == 1) {
             this.attack = 40;
             this.health = 15;
             this.maxhealth = 15;
			 }
			 if (level == 2) {
				 this.attack = 50;
				 this.health = 20; //40
				 this.maxhealth = 20; //40
			 }
			 if (level == 3) {
				 this.attack = 70;
				 this.health = 30;
				 this.maxhealth = 30;
			 }
			 if (level == 4) {
				 this.attack = 85;
				 this.health = 38;
				 this.maxhealth = 38;
			 }
			 this.defense = 0;
			this.resistance = 0;
			this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.doubleAttack=2;
		};//done
		if(type=="Warrior"){
			if (level == 1) {
             this.attack = 40;
             this.health = 60;
             this.maxhealth = 60;
			 }
			 if (level == 2) {
				 this.attack = 60;
				 this.health = 90;
				 this.maxhealth = 90;
			 }
			 if (level == 3) {
				 this.attack = 80;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 100;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 this.defense = 35;
			 this.resistance = 0;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="Clunker"){
			if (level == 1) {
             this.attack = 20;
             this.health = 70;
             this.maxhealth = 70;
			 }
			 if (level == 2) {
				 this.attack = 30;
				 this.health = 100; //40
				 this.maxhealth = 100; //40
			 }
			 if (level == 3) {
				 this.attack = 40;
				 this.health = 140;
				 this.maxhealth = 140;
			 }
			 if (level == 4) {
				 this.attack = 50;
				 this.health = 175;
				 this.maxhealth = 175;
			 }
			 this.defense = 20;
			this.resistance = 20;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
		};//done
		if(type=="Vacuum"){
			if (level == 1) {
             this.attack = 20;
             this.health = 50;
             this.maxhealth = 50;
			 }
			 if (level == 2) {
				 this.attack = 30;
				 this.health = 70; //40
				 this.maxhealth = 70; //40
			 }
			 if (level == 3) {
				 this.attack = 40;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 4) {
				 this.attack = 50;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="VacuumAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
		};
		if(type=="Magnet"){
			if (level == 1) {
             this.attack = 30;
             this.health = 50;
             this.maxhealth = 50;
			 }
			 if (level == 2) {
				 this.attack = 40;
				 this.health = 80; //40
				 this.maxhealth = 80; //40
			 }
			 if (level == 3) {
				 this.attack = 50;
				 this.health = 110;
				 this.maxhealth = 110;
			 }
			 if (level == 4) {
				 this.attack = 60;
				 this.health = 145;
				 this.maxhealth = 145;
			 }
			 this.defense = 15;
			 this.resistance = 15;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
		};//done
		if(type=="FireElemental"){
			if (level == 1) {
             this.attack = 20;
             this.health = 40;
             this.maxhealth = 40;
			 }
			 if (level == 2) {
				 this.attack = 30;
				 this.health = 60;
				 this.maxhealth = 60;
			 }
			 if (level == 3) {
				 this.attack = 40;
				 this.health = 80;
				 this.maxhealth = 80;
			 }
			 if (level == 4) {
				 this.attack = 50;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 this.defense = 10;
			 this.resistance = 15;
			 this.attackType="FireAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=0.5;
			 this.elemental["Ice"]=2;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=1;
		};//done
		if(type=="LightningElemental"){
			if (level == 1) {
             this.attack = 100;
             this.health = 30;
             this.maxhealth = 30;
			 }
			 if (level == 2) {
				 this.attack = 150;
				 this.health = 40;
				 this.maxhealth = 40;
			 }
			 if (level == 3) {
				 this.attack = 200;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 4) {
				 this.attack = 250;
				 this.health = 60;
				 this.maxhealth = 60;
			 }
			 this.defense = 10;
			 this.resistance = 40;
			 this.attackType="LightningAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=0.5;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=2;
		};//done
		if(type=="IceElemental"){
			if (level == 1) {
             this.attack = 70;
             this.health = 60;
             this.maxhealth = 60;
			 }
			 if (level == 2) {
				 this.attack = 90;
				 this.health = 80;
				 this.maxhealth = 80;
			 }
			 if (level == 3) {
				 this.attack = 110;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 4) {
				 this.attack = 135;
				 this.health = 125;
				 this.maxhealth = 125;
			 }
			 this.defense = 20;
			 this.resistance = 5;
			 this.attackType="IceAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=2;
			 this.elemental["Ice"]=0.5;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=2;
		};//done
		if(type=="Werewolf"){
			if (level == 1) {
             this.attack = 40;
             this.health = 70;
             this.maxhealth = 70;
			 }
			 if (level == 2) {
				 this.attack = 60;
				 this.health = 110;
				 this.maxhealth = 110;
			 }
			 if (level == 3) {
				 this.attack = 80;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 if (level == 4) {
				 this.attack = 100;
				 this.health = 185;
				 this.maxhealth = 185;
			 }
			 this.defense = 20;
			 this.resistance = 40;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="Silencer"){
			if (level == 1) {
             this.attack = 40;
             this.health = 50;
             this.maxhealth = 50;
			 }
			 if (level == 2) {
				 this.attack = 50;
				 this.health = 80; //40
				 this.maxhealth = 80; //40
			 }
			 if (level == 3) {
				 this.attack = 60;
				 this.health = 110;
				 this.maxhealth = 110;
			 }
			 if (level == 4) {
				 this.attack = 75;
				 this.health = 135;
				 this.maxhealth = 135;
			 }
			 this.defense = 15;
			 this.resistance = 50;
			 this.attackType="CloseAttack";
			 this.moveType="Flying";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
			 this.height=10;
		};//done
		if(type=="Vampire"){
			if (level == 1) {
             this.attack = 60;
             this.health = 80;
             this.maxhealth = 80;
			 }
			 if (level == 2) {
				 this.attack = 80;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 3) {
				 this.attack = 100;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 125;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="Cannon"){
			if (level == 1) {
             this.attack = 20;
             this.health = 90;
             this.maxhealth = 90;
			 }
			 if (level == 2) {
				 this.attack = 40;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 3) {
				 this.attack = 60;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 if (level == 4) {
				 this.attack = 75;
				 this.health = 185;
				 this.maxhealth = 185;
			 }
			 this.defense = 20;
			this.resistance = 60;
			this.attackType="CannonAttack";
			 this.moveType="";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
			 this.charge=0;
		};
		if(type=="Beekeeper"){
			if (level == 1) {
             this.attack = 0;
             this.health = 80;
             this.maxhealth = 80;
			 }
			 if (level == 2) {
				 this.attack = 0;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 3) {
				 this.attack = 0;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 0;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="BeeKeeperAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.charge=0;
			 this.maxcharge=1;
		};
		if(type=="Bee"){
			if (level == 1) {
             this.attack = 15;
             this.health = 20; //40
             this.maxhealth = 20; //40
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 30;
				 this.maxhealth = 30;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 40;
				 this.maxhealth = 40;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="CloseAttack";
			 this.moveType="Flying";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		if(type=="Bat"){
			if (level == 1) {
             this.attack = 25;
             this.health = 40; //40
             this.maxhealth = 40; //40
			 }
			 if (level == 2) {
				 this.attack = 35;
				 this.health = 50;
				 this.maxhealth = 50;
			 }
			 if (level == 3) {
				 this.attack = 45;
				 this.health = 60;
				 this.maxhealth = 60;
			 }
			 if (level == 4) {
				 this.attack = 55;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="CloseAttack";
			 this.moveType="Flying";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.height=10;
		};//done
		if(type=="Spider"){
			if (level == 1) {
             this.attack = 0;
             this.health = 100; //40
             this.maxhealth = 100; //40
			 }
			 if (level == 2) {
				 this.attack = 0;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 3) {
				 this.attack = 0;
				 this.health = 140;
				 this.maxhealth = 140;
			 }
			 if (level == 4) {
				 this.attack = 0;
				 this.health = 175;
				 this.maxhealth = 175;
			 }
			 this.defense = 25;
			 this.resistance = 25;
			 this.attackType="SpiderAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		if(type=="Flamewraith"){
			if (level == 1) {
             this.attack = 50;
             this.health = 80;
             this.maxhealth = 80;
			 }
			 if (level == 2) {
				 this.attack = 70;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 3) {
				 this.attack = 90;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 105;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="FlamewraithAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=0.5;
			 this.elemental["Ice"]=2;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=2;
			 this.chargeAfterAttack=true;
			 this.phasing=true;
		};//done
		if(type=="Necromancer"){
			 if (level == 1) {
             this.attack = 0;
             this.health = 110;
             this.maxhealth = 110;
			 }
			 if (level == 2) {
				 this.attack = 0;
				 this.health = 130;
				 this.maxhealth = 130;
			 }
			 if (level == 3) {
				 this.attack = 0;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 if (level == 4) {
				 this.attack = 0;
				 this.health = 185;
				 this.maxhealth = 185;
			 }
			 this.defense = 20;
			 this.resistance = 30;
			 this.attackType="NecromancerAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.charge=0;
			 this.maxcharge=1;
		};//done
		if(type=="Zombie"){
			if (level == 1) {
             this.attack = 40;
             this.health = 60; //40
             this.maxhealth = 60; //40
			 }
			 if (level == 2) {
				 this.attack = 55;
				 this.health = 80;
				 this.maxhealth = 80;
			 }
			 if (level == 3) {
				 this.attack = 70;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 4) {
				 this.attack = 85;
				 this.health = 125;
				 this.maxhealth = 125;
			 }
			 this.defense = 25;
			 this.resistance = 15;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="Waterwraith"){
			if (level == 1) {
             this.attack = 60;
             this.health = 100;
             this.maxhealth = 100;
			 }
			 if (level == 2) {
				 this.attack = 80;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 3) {
				 this.attack = 100;
				 this.health = 140;
				 this.maxhealth = 140;
			 }
			 if (level == 4) {
				 this.attack = 125;
				 this.health = 175;
				 this.maxhealth = 175;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="WaterwraithAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=2;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=1;
			 this.chargeAfterAttack=true;
			 this.phasing=true;
		};//done
		if(type=="Frostwraith"){
			if (level == 1) {
             this.attack = 60;
             this.health = 150;
             this.maxhealth = 150;
			 }
			 if (level == 2) {
				 this.attack = 80;
				 this.health = 180;
				 this.maxhealth = 180;
			 }
			 if (level == 3) {
				 this.attack = 100;
				 this.health = 210;
				 this.maxhealth = 210;
			 }
			 if (level == 4) {
				 this.attack = 125;
				 this.health = 265;
				 this.maxhealth = 265;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="FrostwraithAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=2;
			 this.elemental["Ice"]=0.5;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=2;
			 this.chargeAfterAttack=true;
			 this.phasing=true;
		};//done
		if(type=="Assassin"){
			if (level == 1) {
             this.attack = 30;
             this.health = 80;
             this.maxhealth = 80;
			 }
			 if (level == 2) {
				 this.attack = 50;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 3) {
				 this.attack = 70;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 85;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="AssassinAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		if(type=="Shaman"){
			if (level == 1) {
             this.attack = 0;
             this.health = 130;
             this.maxhealth = 130;
			 }
			 if (level == 2) {
				 this.attack = 0;
				 this.health = 150;
				 this.maxhealth = 150;
			 }
			 if (level == 3) {
				 this.attack = 0;
				 this.health = 170;
				 this.maxhealth = 170;
			 }
			 if (level == 4) {
				 this.attack = 0;
				 this.health = 205;
				 this.maxhealth = 205;
			 }
			 this.defense = 25;
			 this.resistance = 35;
			 this.attackType="ShamanAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.charge=0;
			 this.maxcharge=2;
		};
		if(type=="Golem"){
			if (level == 1) {
             this.attack = 50;
             this.health = 160; //40
             this.maxhealth = 160; //40
			 }
			 if (level == 2) {
				 this.attack = 60;
				 this.health = 200;
				 this.maxhealth = 200;
			 }
			 if (level == 3) {
				 this.attack = 70;
				 this.health = 240;
				 this.maxhealth = 240;
			 }
			 if (level == 4) {
				 this.attack = 85;
				 this.health = 300;
				 this.maxhealth = 300;
			 }
			 this.defense = 60;
			 this.resistance = 50;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		if(type=="Frostlord"){
			if (level == 1) {
             this.attack = 50;
             this.health = 200;
             this.maxhealth = 200;
			 }
			 if (level == 2) {
				 this.attack = 70;
				 this.health = 230;
				 this.maxhealth = 230;
			 }
			 if (level == 3) {
				 this.attack = 90;
				 this.health = 260;
				 this.maxhealth = 260;
			 }
			 if (level == 4) {
				 this.attack = 115;
				 this.health = 325;
				 this.maxhealth = 325;
			 }
			 this.defense = 20;
			 this.resistance = 20;
			 this.attackType="FrostLordAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=2;
			 this.elemental["Ice"]=0.5;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=3;
		};
		if(type=="Angel"){
			if (level == 1) {
             this.attack = 40;
             this.health = 230;
             this.maxhealth = 230;
			 }
			 if (level == 2) {
				 this.attack = 60;
				 this.health = 260;
				 this.maxhealth = 260;
			 }
			 if (level == 3) {
				 this.attack = 80;
				 this.health = 300;
				 this.maxhealth = 300;
			 }
			 if (level == 4) {
				 this.attack = 100;
				 this.health = 350;
				 this.maxhealth = 350;
			 }
			 this.defense = 15;
			 this.resistance = 15;
			 this.attackType="AngelAttack";
			 this.moveType="Flying";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.charge=0;
			 this.maxcharge=3;
		};
		if(type=="Djinn"){
			if (level == 1) {
             this.attack = 80;
             this.health = 300;
             this.maxhealth = 300;
			 }
			 if (level == 2) {
				 this.attack = 100;
				 this.health = 350;
				 this.maxhealth = 350;
			 }
			 if (level == 3) {
				 this.attack = 120;
				 this.health = 400;
				 this.maxhealth = 400;
			 }
			 if (level == 4) {
				 this.attack = 150;
				 this.health = 500;
				 this.maxhealth = 500;
			 }
			 this.defense = 40;
			 this.resistance = 40;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			};
		if(type=="Demon"){
			 if (level == 1) {
				 this.attack = 100;
				 this.health = 300;
				 this.maxhealth = 300;
			 }
			 if (level == 2) {
				 this.attack = 130;
				 this.health = 350;
				 this.maxhealth = 350;
			 }
			 if (level == 3) {
				 this.attack = 160;
				 this.health = 400;
				 this.maxhealth = 400;
			 }
			 if (level == 4) {
				 this.attack = 200;
				 this.health = 500;
				 this.maxhealth = 500;
			 }
			 this.defense = 40;
			 this.resistance = 40;
			 this.attackType="DemonAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=0.5;
			 this.elemental["Ice"]=2;
			 this.elemental["Lightning"]=1;
			 this.charge=0;
			 this.maxcharge=3;
		};
		if(type=="Soldier"){
			if (level == 1) {
             this.attack = 50;
             this.health = 100;
             this.maxhealth = 100;
			 }
			 if (level == 2) {
				 this.attack = 70;
				 this.health = 130;
				 this.maxhealth = 130;
			 }
			 if (level == 3) {
				 this.attack = 90;
				 this.health = 160;
				 this.maxhealth = 160;
			 }
			 if (level == 4) {
				 this.attack = 110;
				 this.health = 190;
				 this.maxhealth = 190;
			 }
			 this.defense = 25;
			 this.resistance = 5;
			 this.attackType="CloseAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//done
		if(type=="Archer"){
			if (level == 1) {
             this.attack = 15;
             this.health = 60;
             this.maxhealth = 60;
			 }
			 if (level == 2) {
				 this.attack = 25;
				 this.health = 80;
				 this.maxhealth = 80;
			 }
			 if (level == 3) {
				 this.attack = 35;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 4) {
				 this.attack = 45;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 this.defense = 10;
			 this.resistance = 10;
			 this.attackType="ArrowAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};//,done
		if(type=="Mage"){
			if (level == 1) {
             this.attack = 40;
             this.health = 80;
             this.maxhealth = 80;
			 }
			 if (level == 2) {
				 this.attack = 60;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 if (level == 3) {
				 this.attack = 80;
				 this.health = 120;
				 this.maxhealth = 120;
			 }
			 if (level == 4) {
				 this.attack = 100;
				 this.health = 140;
				 this.maxhealth = 140;
			 }
			 this.defense = 10;
			 this.resistance = 20;
			 this.attackType="MageAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
		};
		if(type=="Rouge"){
			if (level == 1) {
             this.attack = 10;
             this.health = 50;
             this.maxhealth = 50;
			 }
			 if (level == 2) {
				 this.attack = 20;
				 this.health = 70;
				 this.maxhealth = 70;
			 }
			 if (level == 3) {
				 this.attack = 30;
				 this.health = 90;
				 this.maxhealth = 90;
			 }
			 if (level == 4) {
				 this.attack = 40;
				 this.health = 110;
				 this.maxhealth = 110;
			 }
			 this.defense = 5;
			 this.resistance = 5;
			 this.attackType="RougeAttack";
			 this.moveType="Scroll";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		if(type=="Wizard"){
			 if (level == 1) {
             this.attack = 70;
             this.health = 40;
             this.maxhealth = 40;
			 }
			 if (level == 2) {
				 this.attack = 90;
				 this.health = 60;
				 this.maxhealth = 60;
			 }
			 if (level == 3) {
				 this.attack = 110;
				 this.health = 80;
				 this.maxhealth = 80;
			 }
			 if (level == 4) {
				 this.attack = 130;
				 this.health = 100;
				 this.maxhealth = 100;
			 }
			 this.defense = 0;
			 this.resistance = 20;
			 this.attackType="WizardAttack";
			 this.moveType="Afraid";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
			 this.defenseType="resistance";
			 this.charge=0;
			 this.maxcharge=2;
		};
		if(type=="Guard"){
			if (level == 1) {
             this.attack = 20;
             this.health = 110;
             this.maxhealth = 110;
			 }
			 if (level == 2) {
				 this.attack = 30;
				 this.health = 140;
				 this.maxhealth = 140;
			 }
			 if (level == 3) {
				 this.attack = 40;
				 this.health = 170;
				 this.maxhealth = 170;
			 }
			 if (level == 4) {
				 this.attack = 50;
				 this.health = 200;
				 this.maxhealth = 200;
			 }
			 this.defense = 25;
			 this.resistance = 25;
			 this.attackType="GuardAttack";
			 this.moveType="Agressive";
			 this.elemental["Fire"]=1;
			 this.elemental["Ice"]=1;
			 this.elemental["Lightning"]=1;
		};
		   this.elemental["None"]=1;
		   this.health=this.maxhealth;
   		   this.index = curindexNum;
		   this.vert=4;
		   this.type=type;
   }
 }
 function clickGroup(index){
  if(inCombat==false){
	activeGroup = units[index].group;
	if(groups[activeGroup].hasMoved){
		return;
	}

	for(var j = 0;j<groups.length;j++){
		if(groups[j].circle){
			groups[j].circle.SetActive(false);
		}
	}

	var circle = groups[activeGroup].circle;
	circle.SetActive(true);
	//var curslots = new Array();
	//if(groups[activeGroup].slot1>-1){
	//	var unit1 = units[groups[activeGroup].slot1];
	//	circle.GetComponent("CircleScript").slot1.GetComponent("SpriteRenderer").sprite = getPic(unit1);
	//}
	//if(groups[activeGroup].slot2>-1){
	//	var unit2 = units[groups[activeGroup].slot2];
	//	Debug.Log(unit2.type);
	//	circle.GetComponent("CircleScript").slot2.GetComponent("SpriteRenderer").sprite = getPic(unit2);
	//}
	//if(groups[activeGroup].slot3>-1){
	//	var unit3 = units[groups[activeGroup].slot3];
	//	circle.GetComponent("CircleScript").slot3.GetComponent("SpriteRenderer").sprite = getPic(unit3);
	//}

	var location = groups[activeGroup].location;
	var moveLocations=location.GetComponent("locations").allyMoves;

	var objects = GameObject.FindGameObjectsWithTag("Entry");
	for(i =0;i<objects.length;i++){
		objects[i].GetComponent("entry").readyMove=false;;
	}

	for(i =0;i<moveLocations.length;i++){
		if(checkGroup(moveLocations[i])){
			continue;
		}
		moveLocations[i].GetComponent("locations").entry.GetComponent("entry").readyMove=true;
	}

	
  }
 }

 function getPic(ally){
 	 if(ally.type =="Archer"){
	 	 return ArcherPic;
	 }
	 if(ally.type =="Soldier"){
	 	 return SoldierPic;
	 }
	 if(ally.type =="Mage"){
	 	 return MagePic;
	 }
	 return null;
 }

 function moveGroup(slot1:Vector3, slot2:Vector3,slot3:Vector3,locIndex:int,location:GameObject){
			if(inCombat || groups[activeGroup].hasMoved || checkGroup(location)){
 				return;
			}
			groups[activeGroup].hasMoved=true;
			groups[activeGroup].location = location;
			var curCircle = groups[activeGroup].circle;
			slot1.y=1;
			slot2.y=1;
			slot3.y=1;

			var curObject1 = groups[activeGroup].slot1Object;
			var curObject2 = groups[activeGroup].slot2Object;
			var curObject3 = groups[activeGroup].slot3Object;
			
			if(curObject1){
				curObject1.GetComponent("AllyClick").Run=1;

				var startPosition1 = curObject1.transform.position;

				_direction1 = (slot1 - startPosition1).normalized;
				_lookRotation1 = Quaternion.LookRotation(_direction1);
				startDirection1 = curObject1.transform.GetChild(0).transform.rotation;
				curObject1.transform.rotation=_lookRotation1;
			}
			if(curObject2){
				curObject2.GetComponent("AllyClick").Run=1;
				var startPosition2 = curObject2.transform.position;

				_direction2 = (slot2 - startPosition2).normalized;
					_lookRotation2 = Quaternion.LookRotation(_direction2);
					startDirection2= curObject2.transform.GetChild(0).transform.rotation;
					curObject2.transform.rotation=_lookRotation2;
			}
			if(curObject3){
				curObject3.GetComponent("AllyClick").Run=1;
				var startPosition3 = curObject3.transform.position;

				_direction3 = (slot3 - startPosition3).normalized;
					_lookRotation3 = Quaternion.LookRotation(_direction3);
					startDirection3 = curObject3.transform.GetChild(0).transform.rotation;
					curObject3.transform.rotation=_lookRotation3;
			}

					var startPositionC = groups[activeGroup].circle.transform.position;

					var t = 0.0;
					 while (t < 1.0)
					 {
						 t += 0.03;
						 if(curObject1){
							curObject1.transform.position = Vector3.Lerp(startPosition1,slot1,t);
							if(t>0.6){
								curObject1.GetComponent("AllyClick").Run=0;
							}
						 }
						 if(curObject2){
							curObject2.transform.position = Vector3.Lerp(startPosition2,slot2,t);
							if(t>0.6){
								curObject2.GetComponent("AllyClick").Run=0;
							}
						 }
						 if(curObject3){
							curObject3.transform.position = Vector3.Lerp(startPosition3,slot3,t);
							if(t>0.6){
								curObject3.GetComponent("AllyClick").Run=0;
							}
						 }
						 curCircle.transform.position = Vector3.Lerp(startPositionC,slot2,t);

						 yield;
					 }
					 curCircle.transform.position.y=1;
					 curCircle.SetActive(false);

					 if(curObject1){
						curObject1.transform.rotation=startDirection1;
					 }
					 if(curObject2){
						curObject2.transform.rotation=startDirection2;
					 }
					 if(curObject3){
						curObject3.transform.rotation=startDirection3;
					 } 

					 

					checkBattle(location);
 }

 function checkBattle(location:GameObject){
 					 for(var i =0;i<groups.length;i++){
					 	 for(var j =0;j<Egroups.length;j++){
						 	 if(groups[i].location == Egroups[j].location){
								if(inCombat==false){
									Debug.Log("checkBattle");
									startBattle(groups[i].location,i,j);
								}
							 }
						 }
					 }	 				
 }

function startBattle(location,groupNum,EgroupNum){
	groups[groupNum].circle.SetActive(false);
	moveGrid.SetActive(false);
	location.GetComponent("locations").Grid.SetActive(true);
	inCombat=true;
	GetComponent("combat").resetSpaces();
	//set active slots
	eslots=[];
	for(var i =0;i<Eunits.length;i++){
		if(Eunits[i].group==EgroupNum){
			eslots.push(Eunits[i]);
		}
	}
	slots=[];
	var scoutPresent=false;
	for(var j =0;j<units.length;j++){
		if(!units[j].body){
			continue;
		}
		units[j].didAction=false;
		units[j].hasMoved=false;
		units[j].protectedBy=-1;
		if(units[j].type=="Thief"){
			if(units[j].actionsActive["Invisible"]){
				units[j].invisible=true;
				units[j].body.GetComponent("Thief").turnInvisible();
				GetComponent("combat").wordPopup(units[j],"Invisible");
			}
		}
		if(units[j].type=="Wizard" && units[j].body){
			units[j].charge=0;
			if(units[j].actionsActive["Start Charge"]){
				units[j].charge=2;
			}
			units[j].body.GetComponent("AllyClick").item.GetComponent("Text").text=units[j].charge.ToString();
		}
		if(units[j].type=="Knight"){
			units[j].energy=100;
			GetComponent("combat").setEnergyBar(units[j]);
		}
		if(units[j].type=="Guard"){
			units[j].energy=25;
			if(units[j].actionsActive["SuperShield"]){
				units[j].energy=50;
			}
			if(units[j].actionsActive["Scout"]){
				scoutPresent=true;
			}
			GetComponent("combat").setEnergyBar(units[j]);
		}
		if(units[j].type=="Templar"){
			units[j].arrows["Silence"]=units[j].arrowCapacity;
			units[j].arrows["GrapplingHook"]=units[j].arrowCapacity;
			units[j].arrows["Disrupt"]=units[j].arrowCapacity;
			units[j].arrows["Burst"]=units[j].arrowCapacity;
		}
		if(units[j].type=="Archer"){
			units[j].arrows["Explosion"]=units[j].arrowCapacity;
			units[j].arrows["Piercing"]=units[j].arrowCapacity;
			units[j].arrows["Immobolize"]=units[j].arrowCapacity;
			units[j].arrows["Titan"]=units[j].arrowCapacity;
		}
		if(units[j].type=="Rouge"){
			units[j].arrows["Poison"]=units[j].arrowCapacity;
			units[j].arrows["Blindness"]=units[j].arrowCapacity;
			units[j].arrows["Sleep"]=units[j].arrowCapacity;
			units[j].arrows["Enfeeble"]=units[j].arrowCapacity;
		}
		if(units[j].group==groupNum){
			slots.push(units[j]);
		}
	}
	pass.GetComponent("pass").setInfo(slots,eslots,location,Egroups[EgroupNum].experience);
	curGrid = location.GetComponent("locations").allspaces;

	//zoom camera
	var t = 0.0;
	var startPosition = curCamera.transform.position;
	var endPosition = Vector3(location.transform.position.x,60,location.transform.position.z);
	while (t < 1.0)
	{
		t += 0.05;
		curCamera.transform.position = Vector3.Lerp(startPosition,endPosition,t);
		yield;
	}

	//enemy goes first?
	var starting = Random.Range(1,3);
	Debug.Log(starting);
	if(starting==1 && scoutPresent==false){
		pass.GetComponent("pass").enemyturn();
	}
}

function hideEntries(){
	var objects = GameObject.FindGameObjectsWithTag("Entry");
	for(var i = 0;i<objects.length;i++){
		objects[i].GetComponent("entry").readyMove=false;
	}
}

function checkGroup(location){
	for(var i = 0;i<groups.length;i++){
		if(groups[i].location == location){
			return true;
		}
	}
	return false;
}

function Update(){
	if(inCombat){
		return;
	}
	var d = Input.GetAxis("Mouse ScrollWheel");
	 if (d < 0f && curCamera.transform.position.y<285)
	 {
		 curCamera.transform.position.y+=5;
	 }
	 else if (d > 0f && curCamera.transform.position.y>6)
	 {
		 curCamera.transform.position.y-=5;
	 }
}
 
 function increaseItems(item, amount){
	items[item]+=amount;
	quickMessage("Recieved " + amount  + " " + item);
 }

 var qmNum=0;
 function quickMessage(message){
	
	messages.push(message);
	popupText = Resources.Load("Prefabs/MessageText", GameObject);
	var instance = Instantiate(popupText);
	instance.GetComponent("Text").text = message;
	instance.transform.SetParent(messageBox.transform, false);
	instance.transform.position.y-=(30*qmNum);
	qmNum+=1;
	yield WaitForSeconds(2);
	qmNum-=1;
	Destroy(instance);
 }
 function makeBigMessage(message){
	bigBox.SetActive(true);
	bigMessage.GetComponent("Text").text=message;
 }
 function closeBigBox(){
	bigBox.SetActive(false);
 }

 function restart(){
	Application.LoadLevel(Application.loadedLevel);
 }

 function gameOver(){
 	 gameover.SetActive(true);
 }