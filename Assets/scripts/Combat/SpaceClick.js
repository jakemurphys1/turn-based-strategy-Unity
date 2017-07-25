var readyMove : boolean = false;
var vert : int;
var hor : int;
var main: GameObject;
var menu:GameObject;

function Start(){
	main = GameObject.Find("Main");
	menu = GameObject.Find("Canvas/MenuB");
}

function Update()
 {
	if(readyMove==false){
		GetComponent.<Renderer>().enabled = false;
	} else{
		GetComponent.<Renderer>().enabled = true;
	}
     if(Input.GetMouseButtonDown(1))
     {
         OnRightClick();
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
             moveActive();
         }
     }
 }

 function moveActive(){
	var thisposition = transform.position;

	if(readyMove==true){
		//reset all other spaces
		var objects = GameObject.FindGameObjectsWithTag("Space");
		for(var i = 0;i<objects.length;i++){
			objects[i].GetComponent.<SpaceClick>().readyMove=false;
		}

		//remove panels
		main.GetComponent.<Main>().descriptionPanel.SetActive(false);
		main.GetComponent.<Main>().actionPanel.SetActive(false);

		//move active
		var selectedUnit = main.GetComponent("Main").selectedUnit;
		var startPosition = selectedUnit.transform.position;
		var endPosition = new Vector3(transform.position.x,selectedUnit.transform.position.y,transform.position.z);
		selectedUnit.GetComponent("AllyClick").vert=vert;
		selectedUnit.GetComponent("AllyClick").hor=hor;

		//rotation
		 unitPosition = selectedUnit.transform.position;
		 spacePosition=transform.position;
		 var _direction = (spacePosition - unitPosition).normalized;
		var _lookRotation = Quaternion.LookRotation(_direction);
		 selectedUnit.transform.rotation=_lookRotation;
		 selectedUnit.GetComponent("AllyClick").Run=.1;

		 		 //hide menu
		 menu.GetComponent("Menu").hideAll();

		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.02;
			 selectedUnit.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }

		 //reset active to null
		 selectedUnit.GetComponent("AllyClick").Run=0;
		
		 var index = selectedUnit.GetComponent("AllyClick").index;
		 var activeScript = GameObject.Find("Main").GetComponent("Main").units[index];



		 activeScript.vert=vert;
		activeScript.hor=hor;
		
	}
	
 }