var readyMove : boolean = false;
var vert : int;
var hor : int;
var main: GameObject;
var menu:GameObject;

function Start(){
	yield WaitForSeconds(2);
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
		main.GetComponent("Special").SpecialFunction("moveUnit");
		var selectedUnit = main.GetComponent("Main").selectedUnit;
		var curIndex = selectedUnit.GetComponent("AllyClick").index;
		var ally = main.GetComponent("Main").units[curIndex];

		if(ally.sleep){
			main.GetComponent("combat").wordPopup(ally,"Sleeping");
			return;
		}
		if(ally.immobolized){
			main.GetComponent("combat").wordPopup(ally,"Immobolized");
			return;
		}

		

		//Soldier
		if(main.GetComponent("Main").units[curIndex].hasMoved==true){
			if((main.GetComponent("Main").units[curIndex].actionsActive["Dash"] && main.GetComponent("Main").units[curIndex].didAction==false)){
				main.GetComponent("Main").units[curIndex].didAction=true;
				main.GetComponent("combat").wordPopup(main.GetComponent("Main").units[curIndex],"Dash");
			}else{
				return;
			}
		}

		//knight energy
		if(ally.type=="Knight"){
			if(!ally.actionsActive["FreeMove"]){
				if(ally.energy<30){
					main.GetComponent("combat").wordPopup(ally,"Low Energy");
					return;
				}else{
					ally.energy-=30;
					main.GetComponent("combat").setEnergyBar(ally);
				}
			}
		}
		


		resetSpaces();

		//move active
		var startPosition = selectedUnit.transform.position;
		var endPosition = new Vector3(transform.position.x,selectedUnit.transform.position.y,transform.position.z);

		//rotation
		 unitPosition = selectedUnit.transform.position;
		 spacePosition=transform.position;
		 var _direction = (spacePosition - unitPosition).normalized;
		var _lookRotation = Quaternion.LookRotation(_direction);
		 selectedUnit.transform.rotation=_lookRotation;
		 selectedUnit.GetComponent("AllyClick").Run=1;
		 main.GetComponent("Main").units[curIndex].hasMoved=true;
		 main.GetComponent("Main").units[curIndex].vert=vert;
		 main.GetComponent("Main").units[curIndex].hor=hor;

		 //check for cannon
		var eslots = main.GetComponent("Main").eslots;
		var cannon;
		var curUnit=main.GetComponent("Main").units[curIndex];
		for(var i =0;i<eslots.length;i++){
			if(eslots[i].type=="Cannon"){
				cannon=eslots[i];
			}
		}
		if(cannon && curUnit.invisible==false){
			if(curUnit.vert==cannon.vert || curUnit.hor==cannon.hor){
				var damage = (cannon.attack-main.GetComponent("combat").getdefense(curUnit,cannon.defenseType))*(cannon.charge +1);
				cannon.charge=0;
				cannon.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=cannon.charge.ToString();
				main.GetComponent("combat").damageAlly(curUnit.index,damage,"None",0);
				magic = Resources.Load("effects/missile", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = cannon.body.transform.position;
				if(curUnit.hor!=cannon.hor){
					if(curUnit.hor<cannon.hor){
						instance.transform.Rotate(new Vector3(0,90,0));
						Debug.Log(cannon.body);
						Debug.Log(cannon.body.transform.rotation);
						Debug.Log(cannon.body.transform.rotation.eulerAngles);
						Debug.Log(cannon.body.transform.rotation.eulerAngles.y);
						cannon.body.transform.rotation.eulerAngles.y=-90;
					}else{
						instance.transform.Rotate(new Vector3(0,-90,0));
						cannon.body.transform.rotation.eulerAngles.y=90;
					}
				}else{
					if(curUnit.vert<cannon.vert){
						cannon.body.transform.rotation.eulerAngles.y=180;
					}else{
						cannon.body.transform.rotation.eulerAngles.y=0;
					}
				}
				main.GetComponent("sounds").playSound("missiles");
			}
		}

		 		 //hide menu
		 main.GetComponent("Main").menu.GetComponent("Menu").hideAll();

		 main.GetComponent("combat").showStatus(curUnit);

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

 function resetSpaces(){
		//reset all other spaces
		var objects = GameObject.FindGameObjectsWithTag("Space");
		for(var i = 0;i<objects.length;i++){
			objects[i].GetComponent.<SpaceClick>().readyMove=false;
		}
 }

 