var main: GameObject;
var parent:GameObject;
var statBox:GameObject;
var lastClickTime:float;
var catchTime: float = 0.25f;
var clickState:String = "single";
var slot1: GameObject;
var slot2: GameObject;
var slot3: GameObject;
var startPosition: Vector2;
var inslot: boolean=false;
var staticslot:GameObject;
var backgroundHighlight:GameObject;
var locationType:String;
var isOver:boolean=false;
var potion:GameObject;
var potionText:GameObject;


function Start(){
	main = GameObject.Find("Main");
	startPosition = Vector2(gameObject.transform.position.x,gameObject.transform.position.y);
	statBox = main.GetComponent("Main").statBox2;
	slot1 = GameObject.Find("Slot1");
	slot2 = GameObject.Find("Slot2");
	slot3 = GameObject.Find("Slot3");
	staticslot=slot1;
}

function clickit(){
	var unitnum = parent.GetComponent("barrackpic").index;
	var unit = main.GetComponent("Main").units[unitnum];
	if(clickState=="single"){
		statBox.SetActive(true);
		statBox.GetComponent("SetStats").UpdateStats(unit);
		main.GetComponent("Main").healButton.GetComponent("Heal").activeIndex=unitnum;
		if(locationType=="Switch"){
			var objects = GameObject.FindGameObjectsWithTag("Switch");
			for(var i = 0;i<objects.length;i++){
				objects[i].GetComponent("Image").color=Color.white;
			}
			transform.parent.gameObject.GetComponent("Image").color=Color.yellow;
			main.GetComponent("Main").switchNum = unitnum;
			main.GetComponent("Main").switchImage = gameObject;

		}
		
	}else{
		if(inslot==false){
				if(unit.enroute>0){
					main.GetComponent("Main").makeBigMessage("This Unit is still reforming after it's escape. It will be ready in " + unit.enroute + " turns");
					return;
				}
				if(unit.healing>0){
					main.GetComponent("Main").makeBigMessage("This Unit is still healing. It will be ready in " + unit.healing + " turns");
					return;
				}
				if(unit.alive==false){
					main.GetComponent("Main").makeBigMessage("This Unit is dead. Make a 'Revive Potion' to bring it back.");
					return;
				}
				
				var curslot = slot1;
				inslot=true;
				if(slot1.GetComponent.<slots>().isfilled){
					if(slot2.GetComponent.<slots>().isfilled){
						if(slot3.GetComponent.<slots>().isfilled==false){
							curslot=slot3;
						}else{
							return;
						}
					}else{
						curslot=slot2;
					}
				}
		

				var endPosition = curslot.transform.position;
				endPosition.y+=3;
				staticslot=curslot;

					parent.transform.position = endPosition;
					curslot.GetComponent.<slots>().isfilled=true;
					curslot.GetComponent.<slots>().index=parent.GetComponent.<barrackpic>().index;
				
		} else{
			parent.transform.position = startPosition;
			staticslot.GetComponent.<slots>().isfilled=false;
			staticslot.GetComponent.<slots>().index=-1;
			inslot=false;
		}

			 
	}
}

function Update(){
	//checkdoubleclicking
	if(Input.GetButtonDown("Fire1"))
		{
			if(Time.time - lastClickTime < catchTime)
			{
				//double click
				clickState="double";
			}
			else
			{
				//normal click
				clickState="single";
			}
			lastClickTime = Time.time;
		}	
		if(Input.GetMouseButtonDown(1) && isOver && locationType=="Switch"){
				makeSwitch();
		}
}

function OnPointerOver(){
	isOver=true;
}
function OnPointerExit(){
	isOver=false;
}


function makeSwitch(){
	//if(main.GetComponent("combat").usedAction){
	//	return;
	//}
	//main.GetComponent("combat").preventDoubleAction();
	var parent1 = transform.parent;
	var otherImage = main.GetComponent("Main").switchImage;
	var parent2 = main.GetComponent("Main").switchImage.transform.parent;

	transform.SetParent(parent2.transform,false);
	
	otherImage.transform.SetParent(parent1.transform,false);


	var unit1 = main.GetComponent("Main").units[main.GetComponent("Main").switchNum];
	var unitnum = parent.GetComponent("barrackpic").index;
	var unit2 = main.GetComponent("Main").units[unitnum];

	if(main.GetComponent("Main").switchNum==unitnum || main.GetComponent("Main").switchNum==-1 || main.GetComponent("Main").switchImage==null){
		return;
	}
	main.GetComponent("Main").switchNum=-1;
	main.GetComponent("Main").switchImage=null;

	var objects = GameObject.FindGameObjectsWithTag("Switch");
	for(var i = 0;i<objects.length;i++){
		objects[i].GetComponent("Image").color=Color.white;
	}

	main.GetComponent("Main").moveIndivBodies(unit1,unit2);

}



function potionClick(){
	var unitnum = parent.GetComponent("barrackpic").index;
	var unit = main.GetComponent("Main").units[unitnum];
	var items = main.GetComponent("Main").items;
	if(potionText.GetComponent("Text").text=="Teleport"){
		unit.enroute = 0;
		items["Teleport Potion"]-=1;
		main.GetComponent("Main").barrackButton.GetComponent("goToBarracks").gotobarracks();
	}
	if(potionText.GetComponent("Text").text=="Recover"){
		unit.healing = 0;
		items["Recover Potion"]-=1;
		main.GetComponent("Main").barrackButton.GetComponent("goToBarracks").gotobarracks();
	}
	if(potionText.GetComponent("Text").text=="Revive"){
		unit.alive = true;
		unit.health = unit.maxhealth;
		items["Revive Potion"]-=1;
		main.GetComponent("Main").barrackButton.GetComponent("goToBarracks").gotobarracks();
	}
}

 
