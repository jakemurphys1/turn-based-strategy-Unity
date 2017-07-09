var parent:GameObject;
var statBox:GameObject;
var lastClickTime:float;
var catchTime: float = 0.25f;
var clickState:String = "single";
var slot1: GameObject;
var slot2: GameObject;
var slot3: GameObject;
//var startingx:int = gameObject.transform.position.x;
//var startingy:int = gameObject.transform.position.y;
var startPosition: Vector2;
var inslot: boolean=false;
var staticslot:GameObject;

function Start(){

	startPosition = Vector2(gameObject.transform.position.x,gameObject.transform.position.y);
	statBox = GameObject.Find("StatBox");
	slot1 = GameObject.Find("Slot1");
	slot2 = GameObject.Find("Slot2");
	slot3 = GameObject.Find("Slot3");
	staticslot=slot1;
}

function clickit(){
	if(clickState=="single"){
		statBox.GetComponent.<SetStats>().UpdateStats(1,2,3,"Soldier");
	}else{
		if(inslot==false){
				var curslot = slot1;
				inslot=true;
				if(slot1.GetComponent.<slots>().isfilled){
					if(slot2.GetComponent.<slots>().isfilled){
						if(slot3.GetComponent.<slots>().isfilled==false){
							curslot=slot3;
						}else{
							return;
						}
					}else{
						curslot=slot2;
					}
				}
		

				var endPosition = curslot.transform.position;
				staticslot=curslot;

					parent.transform.position = endPosition;
					curslot.GetComponent.<slots>().isfilled=true;
					curslot.GetComponent.<slots>().index=parent.GetComponent.<barrackpic>().index;
				
		} else{
			parent.transform.position = startPosition;
			staticslot.GetComponent.<slots>().isfilled=false;
			staticslot.GetComponent.<slots>().index=-1;
			inslot=false;
		}

			 
	}
}

function Update(){
	//checkdoubleclicking
	if(Input.GetButtonDown("Fire1"))
		{
			if(Time.time - lastClickTime < catchTime)
			{
				//double click
				clickState="double";
			}
			else
			{
				//normal click
				clickState="single";
			}
			lastClickTime = Time.time;
		}
}

 
