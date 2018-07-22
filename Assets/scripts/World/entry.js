var location: GameObject;
var teleporter: boolean=false;
var teleporterMode: boolean=false;
var readyMove: boolean=false;
var main:GameObject;

function Update () {
	if(teleporter==false){
		if(readyMove==false){
			GetComponent.<Renderer>().enabled = false;
			GetComponent.<Collider>().enabled = false;
		} else{
			GetComponent.<Renderer>().enabled = true;
			GetComponent.<Collider>().enabled = true;
		}
	}
	
     if(Input.GetMouseButtonDown(1) && readyMove)
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
			 if(!main){
				main= GameObject.Find("Main");
			}
			if(main.GetComponent("Main").mapCamera.activeSelf){
				return;
			}
             location.GetComponent("locations").moveActive();
         }
     }
 }