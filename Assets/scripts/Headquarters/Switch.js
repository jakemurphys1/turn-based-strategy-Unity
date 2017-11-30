var givehor: int;
var giveGroup;
var isOver:boolean=false;
var location: GameObject;
var main: GameObject;

function Start(){
	main = GameObject.Find("Main");
}

function Update(){
	if(Input.GetMouseButtonDown(1) && isOver){
				takeSpace();
	}
}

function OnPointerOver(){
	isOver=true;
}
function OnPointerExit(){
	isOver=false;
}

function takeSpace(){
	if(transform.childCount > 0){
		return;
	}
	var unit1 = main.GetComponent("Main").units[main.GetComponent("Main").switchNum];
	var otherImage = main.GetComponent("Main").switchImage;
	otherImage.transform.SetParent(gameObject.transform,false);

	var oldgroup = unit1.group;
	var oldHor = unit1.hor;
	unit1.group = giveGroup.index;

	var space = location.GetComponent("locations").allspaces[0][givehor];

	var groups = main.GetComponent("Main").groups;
	if(unit1.hor==1){
		groups[unit1.group].slot1Object=unit1.body;
		groups[unit1.group].slot1=unit1.index;
	} else if(unit1.hor==2){
		groups[unit1.group].slot2Object=unit1.body;
		groups[unit1.group].slot2=unit1.index;
	}else if(unit1.hor==3){
		groups[unit1.group].slot3Object=unit1.body;
		groups[unit1.group].slot3=unit1.index;
	}

	if(oldHor==1){
		groups[oldgroup].slot1Object=null;
		groups[oldgroup].slot1=-1;
	} else if(oldHor==2){
		groups[oldgroup].slot2Object=null;
		groups[oldgroup].slot2=-1;
	}else if(oldHor==3){
		groups[oldgroup].slot3Object=null;
		groups[oldgroup].slot3=-1;
	}

	main.GetComponent("Main").switchNum=-1;
	main.GetComponent("Main").switchImage=null;

	var startPosition = unit1.body.transform.position;
	var endPosition = new Vector3(space.transform.position.x,space.transform.position.y,space.transform.position.z);

		//rotation
		var upDirection = unit1.body.transform.rotation;

		 unitPosition = unit1.body.transform.position;
		 spacePosition=space.transform.position;
		 var _direction = (spacePosition - unitPosition).normalized;
		 var _lookRotation = Quaternion.LookRotation(_direction);
		 unit1.body.transform.rotation=_lookRotation;
		 unit1.body.GetComponent("AllyClick").Run=1;


		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.02;
			 if(t>0.6){
				unit1.body.GetComponent("AllyClick").Run=0;
			 }
			 unit1.body.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
}