var main: GameObject;
var eindex:int=0;
var  groupnum:int;
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

var spotlight:GameObject;

function Start(){
	main = GameObject.Find("Main");
	statsBox = main.GetComponent("Main").statBox;
	animator = GetComponent.<Animator>();
}

function OnMouseDown(){
	var active = main.GetComponent("Main").Eunits[eindex];
	main.GetComponent("Main").activeEnemy=active;
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
	if(main.GetComponent("Main").Eunits.length==0){
		return;
	}
	var thisEnemy=main.GetComponent("Main").Eunits[eindex];
	if(thisEnemy.poison<=0 && thisEnemy.ailmentBody["Poison"]){
		Destroy(thisEnemy.ailmentBody["Poison"]);
	}
	if(thisEnemy.blind<=0 && thisEnemy.ailmentBody["Blind"]){
		Destroy(thisEnemy.ailmentBody["Blind"]);
	}
	if(thisEnemy.immobolized<=0 && thisEnemy.ailmentBody["Immobolized"]){
		Destroy(thisEnemy.ailmentBody["Immobolized"]);
	}
	if(thisEnemy.sleep<=0 && thisEnemy.ailmentBody["Sleep"]){
		Destroy(thisEnemy.ailmentBody["Sleep"]);
	}
	if(thisEnemy.enfeebled<=0 && thisEnemy.ailmentBody["Enfeebled"]){
		Destroy(thisEnemy.ailmentBody["Enfeebled"]);
	}
	if(thisEnemy.silenced<=0 && thisEnemy.ailmentBody["Silenced"]){
		Destroy(thisEnemy.ailmentBody["Silenced"]);
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
			transform.eulerAngles = Vector3(0, 180, 0);
		 }
}

function OnMouseOver(){
	if(spotlight==null  && main.GetComponent("Main").inCombat){
		magic = Resources.Load("prefabs/Spotlight", GameObject);
		instance = Instantiate(magic);
		spotlight=instance;
		enemy = main.GetComponent("Main").Eunits[eindex];
		instance.transform.position = enemy.body.transform.position;
		instance.transform.position.y+=10;
		instance.transform.SetParent(enemy.body.transform,true);
	}
}

function OnMouseExit(){
	if(spotlight){
		Destroy(spotlight);
	}
}
