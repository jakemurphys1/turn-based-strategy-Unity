var main: GameObject;
var index: int = 0;
var animator: Animator;
var Run: float;
var hit:int;
var attack:int;
var itself:GameObject;
var menu:GameObject;
var menuPosition = Vector2(0,0);
var curcamera: Camera;
var clickState:String = "single";
var lastClickTime:float;
var catchTime: float = 0.25f;
var statsBox:GameObject;
var healthbar:GameObject;
var energybar:GameObject;
var health:GameObject;
var arrow:GameObject;
var item:GameObject;
var body:GameObject;
var thisAlly;

var spotlight:GameObject;

function Start(){
	main = GameObject.Find("Main");
	statsBox = main.GetComponent("Main").statBox;
	menu = GameObject.Find("Canvas/MenuB");
	animator = GetComponent.<Animator>();
	thisAlly=main.GetComponent("Main").units[index];
}


function OnMouseDown(){
	if(main.GetComponent("Main").inCombat){
		var active = main.GetComponent("Main").units[index];

		if(main.GetComponent("Main").isOverMenu==true){
			return;
		}

		main.GetComponent("Main").activeIndex = index;
		main.GetComponent("Main").activeEnemy = thisAlly;
		main.GetComponent("Main").selectedUnit = itself;
		var curGrid = main.GetComponent("Main").curGrid;
		var activeGroup = main.GetComponent("Main").activeGroup;
		if(active.group != activeGroup){
			return;
		}

		vert = active.vert;
		hor = active.hor;
		transform.gameObject.tag = "Active";
		//highlight spaces
		//[y(0 at left)][x(0 at bottom)]
		for(var i = 0;i<5;i++){
			for(var j = 0;j<5;j++){
				curGrid[i][j].GetComponent("SpaceClick").readyMove=false;
			}
		}


		if(vert<4 && spaceFree(hor,vert + 1)){
			curGrid[vert+1][hor].GetComponent("SpaceClick").readyMove=true;
		}
		if(vert>0 && spaceFree(hor,vert - 1)){
			curGrid[vert-1][hor].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor>0 && spaceFree(hor-1,vert)){
			curGrid[vert][hor-1].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor<4 && spaceFree(hor+1,vert)){
			curGrid[vert][hor+1].GetComponent("SpaceClick").readyMove=true;
		}
		if(active.actionsActive["Flying"]){
			for(var k = 0;k<5;k++){
				for(var p = 0;p<5;p++){
					curGrid[k][p].GetComponent("SpaceClick").readyMove=true;
				}
			}
		}


		//show menu
		main.GetComponent("Main").menu.SetActive(true);
		var mousePos = Input.mousePosition;
		main.GetComponent("Main").menu.GetComponent("Menu").setMenu(mousePos.x,mousePos.y,active.actions,active.type,active.actionsActive,active);
		statsBox.SetActive(true);
		statsBox.GetComponent("stats").updateText(active,active.health,active.maxhealth,active.attack,active.defense,active.resistance,active.accuracy,active.type,active.evasion, active.passiveActions);
	}else{
		main.GetComponent("Main").clickGroup(index);
		main.GetComponent("Special").SpecialFunction("clickGroup");
	}	
}
function OnRightClick(){
     // Cast a ray from the mouse
     // cursors position
     var clickPoint : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
     var hitPoint : RaycastHit;
 
     // See if the ray collided with an object
     if (Physics.Raycast(clickPoint, hitPoint))
     {
         // Make sure this object was the
         // one that received the right-click
         if (hitPoint.collider == this.GetComponent.<Collider>())
         {
             // Add code for the right click event
				if(main.GetComponent("Main").inCombat){
					main.GetComponent("combat").unitActionOnAlly(index);
				}else{
					switchUnits();
				}
				
				
         }
     }
 }

function spaceFree(hor, vert){
	var slots = main.GetComponent("Main").slots;
	var eslots = main.GetComponent("Main").eslots;
	var isFree = true;
	for(var i = 0;i<slots.length;i++){
		if(slots[i].vert ==vert && slots[i].hor ==hor){
			isFree=false;
		}
	}
	for(var j = 0;j<eslots.length;j++){
		if(eslots[j].vert ==vert && eslots[j].hor ==hor){
			isFree=false;
		}
	}
	return isFree;
}

function FixedUpdate(){
	if(!thisAlly){
		return;
	}
	animator.SetFloat("Run",Run);
	animator.SetInteger("hit",hit);
	animator.SetInteger("attack",attack);

	if(thisAlly.poison<=0 && thisAlly.ailmentBody["Poison"]){
		Destroy(thisAlly.ailmentBody["Poison"]);
	}
	if(thisAlly.blind<=0 && thisAlly.ailmentBody["Blind"]){
		Destroy(thisAlly.ailmentBody["Blind"]);
	}
	if(thisAlly.immobolized<=0 && thisAlly.ailmentBody["Immobolized"]){
		Destroy(thisAlly.ailmentBody["Immobolized"]);
	}
	if(thisAlly.sleep<=0 && thisAlly.ailmentBody["Sleep"]){
		Destroy(thisAlly.ailmentBody["Sleep"]);
	}
	if(thisAlly.enfeebled<=0 && thisAlly.ailmentBody["Enfeebled"]){
		Destroy(thisAlly.ailmentBody["Enfeebled"]);
	}
	if(thisAlly.silenced<=0 && thisAlly.ailmentBody["Silenced"]){
		Destroy(thisAlly.ailmentBody["Silenced"]);
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
	//rightclick
	if(Input.GetMouseButtonDown(1))
     {
         OnRightClick();
     }
	  transform.rotation = Quaternion.Euler(0, transform.eulerAngles.y,transform.eulerAngles.z);
}

function zoomin(){

	curcamera.enabled=true;
	menu.GetComponent("Menu").hideAll();
}
 
 function moveTo(space){
		var startPosition = transform.position;
		var endPosition = new Vector3(space.transform.position.x,transform.position.y,space.transform.position.z);

		//rotation
		 unitPosition = transform.position;
		 spacePosition=space.transform.position;
		 var _direction = (spacePosition - unitPosition).normalized;
		var _lookRotation = Quaternion.LookRotation(_direction);
		 transform.rotation=_lookRotation;
		Run = 1;
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.02;
			 transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 Run=0;
		 if(main.GetComponent("Main").inCombat==false){
			transform.Rotate(new Vector3(0,180,0));
		 }
}

function switchUnits(){


	var group1 = main.GetComponent("Main").groups[main.GetComponent("Main").units[index].group];
	var group2 = main.GetComponent("Main").groups[main.GetComponent("Main").activeGroup];
	var groupScreen = main.GetComponent("Main").groupScreen;

	//see if units are beside each other
	var location1 = group1.location;
	var location2 = group2.location;
	var isAdjacent = false;
	main.GetComponent("Main").istransporting=false;
	if(location1.GetComponent("locations").allyMove1==location2 || location1.GetComponent("locations").allyMove2==location2 || location1.GetComponent("locations").allyMove3==location2 || location1.GetComponent("locations").allyMove4==location2 || location1.GetComponent("locations").allyMove5==location2 || location1.GetComponent("locations").allyMove6==location2){
		isAdjacent=true;
	}
	if(location2.GetComponent("locations").allyMove1==location1 || location2.GetComponent("locations").allyMove2==location1 || location2.GetComponent("locations").allyMove3==location1 || location2.GetComponent("locations").allyMove4==location1 || location2.GetComponent("locations").allyMove5==location1 || location2.GetComponent("locations").allyMove6==location1){
		isAdjacent=true;
	}
	if(location1.GetComponent("locations").entry.GetComponent("entry").teleporter && location2.GetComponent("locations").entry.GetComponent("entry").teleporter){
		isAdjacent=true;
		main.GetComponent("Main").istransporting=true;
	}
	if(location1==location2){
		isAdjacent=true;
		groupScreen.GetComponent("GroupScreen").switchAll.SetActive(false);
	}else{
		groupScreen.GetComponent("GroupScreen").switchAll.SetActive(true);
	}
	if(isAdjacent==false){
		return;
	}

	main.GetComponent("Main").groupScreen.SetActive(true);
	if(group1==group2){
		groupScreen.transform.GetChild(2).gameObject.SetActive(false);
	}else{
		groupScreen.transform.GetChild(2).gameObject.SetActive(true);
	}
	var objects = GameObject.FindGameObjectsWithTag("barrackPic");
	for(var i =0;i<objects.length;i++){
		objects[i].transform.parent.gameObject.GetComponent("Image").color=Color.white;
		Destroy(objects[i]);
	}

	
	var curslots = new Array();
	curslots[0] = giveUnitSlotIndex(1,group2.index);
	curslots[1]=giveUnitSlotIndex(2,group2.index);
	curslots[2]=giveUnitSlotIndex(3,group2.index);

	var curslots2 = new Array();
	curslots2[0] = giveUnitSlotIndex(1,group1.index);
	curslots2[1]=giveUnitSlotIndex(2,group1.index);
	curslots2[2]=giveUnitSlotIndex(3,group1.index);

	for(i = 0;i<curslots.length;i++){
		
		if(curslots[i]!=-1){
			var unitInfo = main.GetComponent("Main").units[curslots[i]];
			if(unitInfo.alive){
				var unit = Instantiate(Resources.Load("alliesPics/" + unitInfo.type + "_prefab"));
				unit.transform.position.x=0;
				unit.transform.position.y=5;
				unit.transform.SetParent(main.GetComponent("Main").groupScreen.transform.GetChild(1).transform.GetChild(i),false);
				groupScreen.transform.GetChild(1).transform.GetChild(0).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo.group].location;
				groupScreen.transform.GetChild(1).transform.GetChild(1).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo.group].location;
				groupScreen.transform.GetChild(1).transform.GetChild(2).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo.group].location;

				groupScreen.transform.GetChild(1).transform.GetChild(0).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo.group];
				groupScreen.transform.GetChild(1).transform.GetChild(1).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo.group];
				groupScreen.transform.GetChild(1).transform.GetChild(2).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo.group];

				unit.GetComponent("barrackpicbutton").locationType="Switch";
				unit.GetComponent("barrackpic").index=unitInfo.index;
				var level = unit.GetComponent("barrackpic").levelText;
					level.GetComponent("Text").text=unitInfo.level.ToString();
					var healthbar=unit.GetComponent("barrackpic").healthbar;
					var health = unitInfo.health + 0.0f;
					var maxhealth = unitInfo.maxhealth + 0.0f;
					var percentage= health/maxhealth;
					var newlength = 1 * percentage;
					healthbar.transform.localScale = Vector3(newlength,1,1);
			}
			
		}
		if(curslots2[i]==-1){
			continue;
		}

		var unitInfo2 = main.GetComponent("Main").units[curslots2[i]];

		if(unitInfo2.alive){
			var unit2 = Instantiate(Resources.Load("alliesPics/" + unitInfo2.type + "_prefab"));
			unit2.transform.position.x=0;
			unit2.transform.position.y=5;
			unit2.transform.SetParent(main.GetComponent("Main").groupScreen.transform.GetChild(2).transform.GetChild(i),false);
			groupScreen.transform.GetChild(2).transform.GetChild(0).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo2.group].location;
			groupScreen.transform.GetChild(2).transform.GetChild(1).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo2.group].location;
			groupScreen.transform.GetChild(2).transform.GetChild(2).GetComponent("Switch").location = main.GetComponent("Main").groups[unitInfo2.group].location;

			groupScreen.transform.GetChild(2).transform.GetChild(0).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo2.group];
			groupScreen.transform.GetChild(2).transform.GetChild(1).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo2.group];
			groupScreen.transform.GetChild(2).transform.GetChild(2).GetComponent("Switch").giveGroup = main.GetComponent("Main").groups[unitInfo2.group];
			unit2.GetComponent("barrackpicbutton").locationType="Switch";
			unit2.GetComponent("barrackpic").index=unitInfo2.index;
			level = unit2.GetComponent("barrackpic").levelText;
			level.GetComponent("Text").text=unitInfo2.level.ToString();
			healthbar=unit2.GetComponent("barrackpic").healthbar;
			health = unitInfo2.health + 0.0f;
			maxhealth = unitInfo2.maxhealth + 0.0f;
			percentage= health/maxhealth;
			newlength = 1 * percentage;
			healthbar.transform.localScale = Vector3(newlength,1,1);
		}
		
	}
}

 function giveUnitSlotIndex(number,group){
	var units = main.GetComponent("Main").units;
	for(var i =0;i<units.length;i++){
		if(units[i].group==group && units[i].hor==number){
			return units[i].index;
		}
	}
	return -1;
 }

 function OnMouseOver(){
	if(spotlight==null && main.GetComponent("Main").inCombat){
		magic = Resources.Load("prefabs/Spotlight-a", GameObject);
		instance = Instantiate(magic);
		spotlight=instance;
		ally = main.GetComponent("Main").units[index];
		instance.transform.position = ally.body.transform.position;
		instance.transform.SetParent(ally.body.transform,true);
	}
	if(main.GetComponent("Main").inCombat==false){
		main.GetComponent("Main").groups[thisAlly.group].circle.GetComponent("CircleScript").pics.SetActive(true);
		main.GetComponent("Main").groups[thisAlly.group].circle.GetComponent("CircleScript").UpdateDisplay();
	}
}

function OnMouseExit(){
	if(spotlight){
		Destroy(spotlight);
	}
	if(main.GetComponent("Main").inCombat==false){
		main.GetComponent("Main").groups[thisAlly.group].circle.GetComponent("CircleScript").pics.SetActive(false);
	}
}