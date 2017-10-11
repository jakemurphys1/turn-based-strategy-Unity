var givehor: int;
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

	var space = location.GetComponent("locations").allspaces[0][givehor];

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