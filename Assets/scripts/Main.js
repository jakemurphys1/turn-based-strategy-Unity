var units = new Array();
var Eunits = new Array();
var descriptionPanel: GameObject;
var actionPanel: GameObject;
var AttackValue: GameObject;
var slots = new Array();
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
var entrance1: GameObject;
var curCamera: GameObject;
var moveGrid: GameObject;
var curGrid = new Array();
var floatText: GameObject;


function Start () {
//GetComponent("floatingTextController").Initialize();
	tempStart();
}

function tempStart(){
	createUnit("Soldier");
	createUnit("Soldier");
	createUnit("Soldier");

	entrance1 = ship;
	createEGroup("Vampire","Vampire","Vampire","Vampire","Vampire",entrance1);
	createGroup(0,1,2);
	checkBattle(ship);
	curGrid = ship.GetComponent("locations").allspaces;
	activeGroup=0;
}


//unit creation
function createUnit(name){
	units[indexNum]= new Soldier(indexNum);
	indexNum+=1;
}
 function createEUnit(name){
	Eunits[EindexNum]= new Vampire(EindexNum);
	EindexNum+=1;
}
function createGroup(slot1:int,slot2:int,slot3:int){
	groups[groupIndex]= new Group(slot1,slot2,slot3,ship);
	circle = Instantiate(Resources.Load("GroupCircle", GameObject));
	groups[groupIndex].circle = circle;
	circle.transform.position=ship.GetComponent.<locations>().space20.transform.position;


	units[slot1].group = groupIndex;
	unit1 = Instantiate(Resources.Load("allies3D/Soldier", GameObject));
	unit1.transform.position=ship.GetComponent.<locations>().space10.transform.position;
	unit1.transform.SetParent(Terrain.transform,false);
	unit1.GetComponent("AllyClick").index=slot1;
	unit1.GetComponent("AllyClick").vert=1;
	unit1.GetComponent("AllyClick").hor=0;
	groups[groupIndex].slot1Object = unit1;

	units[slot2].group = groupIndex;
	unit2 = Instantiate(Resources.Load("allies3D/Soldier", GameObject));
	unit2.transform.position=ship.GetComponent.<locations>().space20.transform.position;
	unit2.transform.SetParent(Terrain.transform,false);
	unit2.GetComponent("AllyClick").index=slot2;
	unit2.GetComponent("AllyClick").vert=2;
	unit2.GetComponent("AllyClick").hor=0;
	groups[groupIndex].slot2Object = unit2;
	

	units[slot3].group = groupIndex;
	unit3 = Instantiate(Resources.Load("allies3D/Soldier", GameObject));
	unit3.transform.position=ship.GetComponent.<locations>().space30.transform.position;
	unit3.transform.SetParent(Terrain.transform,false);
	unit3.GetComponent("AllyClick").index=slot3;
	unit3.GetComponent("AllyClick").vert=3;
	unit3.GetComponent("AllyClick").hor=0;
	groups[groupIndex].slot3Object = unit3;

	groups[groupIndex].location = ship;

	groupIndex+=1;
}
function createEGroup(slot1:String,slot2:String,slot3:String,slot4:String,slot5:String,location:GameObject){
	Egroups[EgroupIndex]= new EGroup(EindexNum,EindexNum+1,EindexNum+2,EindexNum+3,EindexNum+4,location);

	createEUnit(slot1);
	Eunits[EindexNum-1].group = EgroupIndex;
	unit1 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
	unit1.transform.position=entrance1.GetComponent.<locations>().space14.transform.position;
	unit1.transform.position.y=1;
	unit1.transform.SetParent(Terrain.transform,false);
	unit1.GetComponent("EnemyClick").eindex = EindexNum-1;
	Egroups[EgroupIndex].slot1Object = unit1;
	Eunits[EindexNum-1].body = unit1;
	

	if(slot2!=""){
			createEUnit(slot2);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit2 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit2.transform.position=entrance1.GetComponent.<locations>().space24.transform.position;
			unit2.transform.position.y=1;
			unit2.transform.SetParent(Terrain.transform,false);
			unit2.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot2Object = unit2;
			Eunits[EindexNum-1].body = unit2;
	}
	if(slot3!=""){
			createEUnit(slot2);
			Eunits[EindexNum-1].group = EgroupIndex;
			unit3 = Instantiate(Resources.Load("enemy3D/" + Eunits[EindexNum-1].type, GameObject));
			unit3.transform.position=entrance1.GetComponent.<locations>().space34.transform.position;
			unit3.transform.position.y=1;
			unit3.transform.SetParent(Terrain.transform,false);
			unit3.GetComponent("EnemyClick").eindex = EindexNum-1;
			Egroups[EgroupIndex].slot3Object = unit3;
			Eunits[EindexNum-1].body = unit3;
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

	function EGroup(slot1:int,slot2:int,slot3:int,slot4:int,slot5:int,location:GameObject){
		this.location=location;
		this.slot1=slot1;
		this.slot2=slot2;
		this.slot3=slot3;
		this.slot4=slot4;
		this.slot5=slot5;

	}
}
class Soldier{
   var type:String="Soldier";
   var maxhealth:int=30;
   var health:int=30;
   var attack:int=10;
   var index:int;
   var vert: int;
   var hor:int;
   var group:int = -1;
   var actions= new Array();

   function Soldier(indexNum:int){
   	   this.index = indexNum;
	   this.actions[0] = "Normal";
	   this.actions[1] = "Piercing";
	   this.actions[2] = "Grounding";
	   this.actions[3] = "Titan";
   }
 }
class Vampire{
   var type:String="Vampire";
   var maxhealth:int=30;
   var health:int=30;
   var attack:int=10;
   var index:int;
   var vert: int;
   var hor:int;
   var group:int = -1;
   var body:GameObject;

   function Vampire(indexNum:int){
   	   this.index = indexNum;
   }
 }
 function clickGroup(index){
  if(inCombat==false){
	activeGroup = units[index].group;
	groups[activeGroup].circle.SetActive(true);
  }
 }



 function moveGroup(slot1:Vector3, slot2:Vector3,slot3:Vector3,locIndex:int,location:GameObject){
			var curObject1 = groups[activeGroup].slot1Object;
			var curObject2 = groups[activeGroup].slot2Object;
			var curObject3 = groups[activeGroup].slot3Object;
			var curCircle = groups[activeGroup].circle;

			slot1.y=1;
			slot2.y=1;
			slot3.y=1;

			curObject1.GetComponent("AllyClick").Run=0.2;
			curObject2.GetComponent("AllyClick").Run=0.2;
			curObject3.GetComponent("AllyClick").Run=0.2;
					//move active
					var startPosition1 = curObject1.transform.position;
					var startPosition2 = curObject2.transform.position;
					var startPosition3 = curObject3.transform.position;
					var startPositionC = groups[activeGroup].circle.transform.position;
					
					//rotate the right way
					_direction1 = (slot1 - startPosition1).normalized;
					_lookRotation1 = Quaternion.LookRotation(_direction1);
					startDirection1 = curObject1.transform.GetChild(0).transform.rotation;
					curObject1.transform.GetChild(0).transform.rotation=_lookRotation1;

					_direction2 = (slot2 - startPosition2).normalized;
					_lookRotation2 = Quaternion.LookRotation(_direction2);
					startDirection2= curObject2.transform.GetChild(0).transform.rotation;
					curObject2.transform.GetChild(0).transform.rotation=_lookRotation2;

					_direction3 = (slot3 - startPosition3).normalized;
					_lookRotation3 = Quaternion.LookRotation(_direction3);
					startDirection3 = curObject3.transform.GetChild(0).transform.rotation;
					curObject3.transform.GetChild(0).transform.rotation=_lookRotation3;

					var t = 0.0;
					 while (t < 1.0)
					 {
						 t += 0.005;
						 curObject1.transform.position = Vector3.Lerp(startPosition1,slot1,t);
						 curObject2.transform.position = Vector3.Lerp(startPosition2,slot2,t);
						 curObject3.transform.position = Vector3.Lerp(startPosition3,slot3,t);
						 curCircle.transform.position = Vector3.Lerp(startPositionC,slot2,t);
						 yield;
					 }
					 curCircle.transform.position.y=1;
					 curCircle.SetActive(false);
					 curObject1.transform.GetChild(0).transform.rotation=startDirection1;
					 curObject2.transform.GetChild(0).transform.rotation=startDirection2;
					 curObject3.transform.GetChild(0).transform.rotation=startDirection3;
					 curObject1.GetComponent("AllyClick").Run=-0.2;
					 curObject2.GetComponent("AllyClick").Run=-0.2;
					 curObject3.GetComponent("AllyClick").Run=-0.2;
					 curObject1.GetComponent("AllyClick").vert=1;
					 curObject2.GetComponent("AllyClick").vert=2;
					 curObject3.GetComponent("AllyClick").vert=3;
					 curObject1.GetComponent("AllyClick").hor=5;
					 curObject2.GetComponent("AllyClick").hor=5;
					 curObject3.GetComponent("AllyClick").hor=5;

					 groups[activeGroup].location = location;

					checkBattle(location);
 }

 function checkBattle(location:GameObject){
 					 for(var i =0;i<groups.length;i++){
					 	 for(var j =0;j<Egroups.length;j++){
						 	 if(groups[i].location == Egroups[j].location){
								startBattle(location);
							 }
						 }
					 }	 				
 }

function startBattle(location){
	moveGrid.SetActive(false);
	location.GetComponent("locations").Grid.SetActive(true);
	inCombat=true;
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
}
 