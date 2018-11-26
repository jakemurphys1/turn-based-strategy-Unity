var givehor: int;
var giveGroup;
var isOver:boolean=false;
var location: GameObject;
var main: GameObject;
var groupScreen:GameObject;

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
	unit1.hor = givehor;
	unit1.group = giveGroup.index;

	var space = location.GetComponent("locations").allspaces[0][givehor];

	var groups = main.GetComponent("Main").groups;

	main.GetComponent("Main").switchNum=-1;
	main.GetComponent("Main").switchImage=null;

	main.GetComponent("Main").takeSpace(unit1,space);
}