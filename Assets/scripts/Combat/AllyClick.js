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

var immobolized:GameObject;
var blindness:GameObject;
var poison:GameObject;
var enfeebled:GameObject;
var sleep:GameObject;
var silenced:GameObject;

function Start(){
	main = GameObject.Find("Main");
	statsBox = main.GetComponent("Main").statBox;
	menu = GameObject.Find("Canvas/MenuB");
	animator = GetComponent.<Animator>();
}


function OnMouseDown(){
	if(clickState=="double"){
		
		}


	if(main.GetComponent("Main").inCombat){
		var active = main.GetComponent("Main").units[index];
		main.GetComponent("Main").activeIndex = index;
		main.GetComponent("Main").selectedUnit = itself;
		var curGrid = main.GetComponent("Main").curGrid;
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
		var mousePos = Input.mousePosition;
		menu.GetComponent("Menu").setMenu(mousePos.x,mousePos.y,active.actions,active.type,active.actionsActive,active);
		statsBox.SetActive(true);
		statsBox.GetComponent("stats").updateText(active,active.health,active.maxhealth,active.attack,active.defense,active.resistance,active.accuracy,active.type,active.evasion, active.passiveActions);
		

	}else{
		main.GetComponent("Main").clickGroup(index);
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
			 
				main.GetComponent("combat").unitActionOnAlly(index);
				
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
	animator.SetFloat("Run",Run);
	animator.SetInteger("hit",hit);
	animator.SetInteger("attack",attack);

	var thisAlly=main.GetComponent("Main").units[index];
	if(thisAlly.immobolized>0){
		immobolized.SetActive(true);
	}else{
		immobolized.SetActive(false);
	}
	if(thisAlly.blind>0){
		blindness.SetActive(true);
	}else{
		blindness.SetActive(false);
	}
	if(thisAlly.sleep>0){
		sleep.SetActive(true);
	}else{
		sleep.SetActive(false);
	}

	if(thisAlly.poison>0){
		poison.SetActive(true);
	}else{
		poison.SetActive(false);
	}
	if(thisAlly.enfeebled>0){
		enfeebled.SetActive(true);
	}else{
		enfeebled.SetActive(false);
	}
	if(thisAlly.silenced>0){
		silenced.SetActive(true);
	}else{
		silenced.SetActive(false);
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
