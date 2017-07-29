var main: GameObject;
var index: int = 0;
var animator: Animator;
var Run: float;
var vert:int;
var hor:int;
var itself:GameObject;
var menu:GameObject;
var menuPosition = Vector2(0,0);
var curcamera: Camera;
var clickState:String = "single";
var lastClickTime:float;
var catchTime: float = 0.25f;
var statsBox:GameObject;

function Start(){
	main = GameObject.Find("Main");
	statsBox = GameObject.Find("stats");
	menu = GameObject.Find("Canvas/MenuB");
	animator = GetComponent.<Animator>();
}


function OnMouseDown(){
if(clickState=="double"){
		zoomin();
	}


	if(main.GetComponent("Main").inCombat){
		var active = main.GetComponent("Main").units[index];
		main.GetComponent("Main").selectedUnit = itself;
		var curGrid = main.GetComponent("Main").curGrid;

		transform.gameObject.tag = "Active";

		//highlight spaces
		//[y(0 at left)][x(0 at bottom)]
		for(var i = 0;i<5;i++){
			for(var j = 0;j<5;j++){
				curGrid[i][j].GetComponent("SpaceClick").readyMove=false;
			}
		}


		if(vert<4 && spaceTaken(hor,vert + 1)){
			curGrid[hor][vert+1].GetComponent("SpaceClick").readyMove=true;
		}
		if(vert>0 && spaceTaken(hor,vert - 1)){
			curGrid[hor][vert-1].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor>0 && spaceTaken(hor-1,vert)){
			curGrid[hor-1][vert].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor<4 && spaceTaken(hor+1,vert)){
			curGrid[hor+1][vert].GetComponent("SpaceClick").readyMove=true;
		}


		//show menu
		var mousePos = Input.mousePosition;
		statsBox.GetComponent("stats").updateText(active.health,active.maxhealth,active.attack,active.defense,active.resistance,active.accuracy);
		menu.GetComponent("Menu").setMenu(mousePos.x,mousePos.y,active.actions,active.type,active.actionsActive);

	}else{
		main.GetComponent("Main").clickGroup(index);
	}
	
}

function spaceTaken(hor, vert){
	var mainGroups = main.GetComponent("Main").groups;
	var activeGroup = main.GetComponent("Main").activeGroup;
	var curObject1 = mainGroups[activeGroup].slot1Object;
	var curObject2 = mainGroups[activeGroup].slot2Object;
	var curObject3 = mainGroups[activeGroup].slot3Object;

	if ((curObject1.GetComponent("AllyClick").vert == vert && curObject1.GetComponent("AllyClick").hor == hor) || (curObject2.GetComponent("AllyClick").vert == vert && curObject2.GetComponent("AllyClick").hor == hor) || (curObject3.GetComponent("AllyClick").vert == vert  && curObject3.GetComponent("AllyClick").hor == hor)){
		return false;
	}else{
		return true;
	}


}

function FixedUpdate(){
	animator.SetFloat("Run",Run);
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
}

function zoomin(){

	curcamera.enabled=true;
	menu.GetComponent("Menu").hideAll();
}
 
