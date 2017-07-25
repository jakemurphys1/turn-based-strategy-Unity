var main: GameObject;
var eindex:int=0;
var healthbar:GameObject;

function Start(){
	main = GameObject.Find("Main");
}

function OnMouseDown(){
	Debug.Log("worked");
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
             main.GetComponent("combat").damageEnemy(eindex,15);
         }
     }
 }