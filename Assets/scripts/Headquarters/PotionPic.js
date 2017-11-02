var attack: GameObject;
var defense: GameObject;
var resistance: GameObject;
var health: GameObject;
var evasion: GameObject;
var accuracy: GameObject;
var lastClickTime:float;
var catchTime: float = 0.25f;
var clickState:String = "single";

function clickIt(){
	if(clickState=="double"){
		
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