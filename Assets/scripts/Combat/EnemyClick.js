var main: GameObject;
var eindex:int=0;
var health: GameObject;
var healthbar:GameObject;
var Run:float;
var hit:int;
var attack:int;
var animator: Animator;
var curcamera: GameObject;
var chargeText:GameObject;
var item:GameObject;
var statsBox:GameObject;

var immobolized:GameObject;
var blindness:GameObject;
var poison:GameObject;
var enfeebled:GameObject;
var sleep:GameObject;
var silenced:GameObject;

function Start(){
	main = GameObject.Find("Main");
	statsBox = main.GetComponent("Main").statBox;
	animator = GetComponent.<Animator>();
}

function OnMouseDown(){
	
	var active = main.GetComponent("Main").Eunits[eindex];
	statsBox.SetActive(true);
	statsBox.GetComponent("stats").updateText(active,active.health,active.maxhealth,active.attack,active.defense,active.resistance,active.accuracy,active.type,active.evasion, active.passiveActions);
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
			 
				main.GetComponent("combat").unitAction(eindex);
				
         }
     }
 }

 function FixedUpdate(){
	animator.SetFloat("Run",Run);
	animator.SetInteger("hit",hit);
	animator.SetInteger("attack",attack);
	var thisEnemy=main.GetComponent("Main").Eunits[eindex];
	if(thisEnemy.immobolized>0){
		immobolized.SetActive(true);
	}else{
		immobolized.SetActive(false);
	}
	if(thisEnemy.blind>0){
		blindness.SetActive(true);
	}else{
		blindness.SetActive(false);
	}
	if(thisEnemy.sleep>0){
		sleep.SetActive(true);
	}else{
		sleep.SetActive(false);
	}

	if(thisEnemy.poison>0){
		poison.SetActive(true);
	}else{
		poison.SetActive(false);
	}
	if(thisEnemy.enfeebled>0){
		enfeebled.SetActive(true);
	}else{
		enfeebled.SetActive(false);
	}
	if(thisEnemy.silenced>0){
		silenced.SetActive(true);
	}else{
		silenced.SetActive(false);
	}
}

function moveTo(space){
	var enemy = main.GetComponent("Main").Eunits[eindex];
	enemy.hasMoved=true;
	enemy.hor = space.GetComponent("SpaceClick").hor;
	enemy.vert = space.GetComponent("SpaceClick").vert;
		var startPosition = transform.position;
		var endPosition = new Vector3(space.transform.position.x,enemy.height,space.transform.position.z);

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
		 main.GetComponent("Main").Eunits[eindex].hasMoved=true;
		 if(main.GetComponent("Main").inCombat==false){
			transform.Rotate(new Vector3(0,180,0));
		 }
}

