var menu: GameObject;
var main: GameObject;

function OnMouseDown(){
	menu.SetActive(true);

}
function Start(){
	main = GameObject.Find("Main");
}

function Update(){
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
					returnUnits();
         }
     }
 }

 function returnUnits(){
 	 var ship = main.GetComponent("Main").ship;
	 var groups = main.GetComponent("Main").groups;
	 var units = main.GetComponent("Main").units;
	 var theGroup=-2;
	 main.GetComponent("Main").hideEntries();

	 for(var i = 0;i<groups.length;i++){
	 	 if(groups[i].location == ship){
		 	 theGroup = i;
		 }
	 }
	 for(i = 0;i<units.length;i++){
	 	 if(units[i].group == theGroup){
			energyReturn(units[i]);
			groups[units[i].group].location=null;
		 	 units[i].group = -1;
			 Destroy(units[i].body);
			 Destroy(groups[theGroup].circle);
			  
		 }
		
	 }

 }

 function energyReturn(ally){
			var magic = Resources.Load("effects/energy", GameObject);
			var instance = Instantiate(magic);
			instance.transform.position = ally.body.transform.position;
			var startPosition = instance.transform.position;
			var endPosition = new Vector3(gameObject.transform.position.x,gameObject.transform.position.y,gameObject.transform.position.z);
			Debug.Log(endPosition);
			t = 0.0;
			 while (t < 1.0)
			 {
				 t += 0.01;
				 instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
				 yield;
			 }
 }
