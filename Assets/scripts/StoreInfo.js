var level=1;
var stage=1;
var stageReached:int;
var main: GameObject;
var levels=new Array();
var gold:int=10;

function Start(){

}

function Awake () {
			levels =[
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true},
				{"unlocked":true,"completed":true}
			];
		Load();
 }


public function Save(){
		for(var i =0;i<levels.length;i++){
			GetComponent("SaveCustom").customData.levels[i].unlocked=levels[i]["unlocked"];
			GetComponent("SaveCustom").customData.levels[i].completed=levels[i]["completed"];
		}
		GetComponent("SaveCustom").Save();
}
public function Load(){
	GetComponent("SaveCustom").Load();
	for(var i =0;i<levels.length;i++){
			levels[i]["unlocked"]=GetComponent("SaveCustom").customData.levels[i].unlocked;
			levels[i]["completed"]=GetComponent("SaveCustom").customData.levels[i].completed;
		}
}