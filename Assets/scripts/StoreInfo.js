var level=1;
var stage=1;
var stageReached:int;
var main: GameObject;
var levels=new Array();
var units = new Array();
var gold:int=10;
var job;

function Start(){
	DontDestroyOnLoad(gameObject);
	Load();
}

function Awake () {
			levels =[
				{"unlocked":true,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false}
			];
			units =[
				{"type":"Soldier","unlocked":true,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor"},
				{"type":"Mage","unlocked":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth"},
				{"type":"Archer","unlocked":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth"},
				{"type":"Templar","unlocked":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth"},
				{"type":"Rogue","unlocked":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth"},
				{"type":"Knight","unlocked":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor"},
				{"type":"Thief","unlocked":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor"},
				{"type":"Monk","unlocked":false,"level":1,"experience":0,"weapon":"None","weaponType":"None","armor":"Cotton","armorType":"Cloth"},
				{"type":"Cleric","unlocked":false,"level":1,"experience":0,"weapon":"None","weaponType":"None","armor":"Cotton","armorType":"Cloth"},
				{"type":"Guard","unlocked":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Shield","armor":"Bronze","armorType":"Armor"},
				{"type":"Wizard","unlocked":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth"},
				{"type":"Sorcerer","unlocked":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth"}
			];
 }


public function Save(){
		for(var i =0;i<levels.length;i++){
			GetComponent("SaveCustom").customData.levels[i].unlocked=levels[i]["unlocked"];
			GetComponent("SaveCustom").customData.levels[i].completed=levels[i]["completed"];
		}
		for(i =0;i<units.length;i++){
			GetComponent("SaveCustom").customData.units[i].unlocked=units[i]["unlocked"];
			GetComponent("SaveCustom").customData.units[i].type=units[i]["type"];
			GetComponent("SaveCustom").customData.units[i].level=units[i]["level"];
			GetComponent("SaveCustom").customData.units[i].experience=units[i]["experience"];
			GetComponent("SaveCustom").customData.units[i].weapon=units[i]["weapon"];
			GetComponent("SaveCustom").customData.units[i].armor=units[i]["armor"];
		}
		GetComponent("SaveCustom").customData.gold=gold;
		GetComponent("SaveCustom").Save();
}
public function Load(){
	GetComponent("SaveCustom").Load();
	if(GetComponent("SaveCustom").customData.units[0].unlocked){
		for(var i =0;i<levels.length;i++){
				levels[i]["unlocked"]=GetComponent("SaveCustom").customData.levels[i].unlocked;
				levels[i]["completed"]=GetComponent("SaveCustom").customData.levels[i].completed;
		}
		for(i =0;i<units.length;i++){
			units[i]["unlocked"]=GetComponent("SaveCustom").customData.units[i].unlocked;
			units[i]["type"]=GetComponent("SaveCustom").customData.units[i].type;
			units[i]["level"]=GetComponent("SaveCustom").customData.units[i].level;
			units[i]["experience"]=GetComponent("SaveCustom").customData.units[i].experience;
			units[i]["weapon"]=GetComponent("SaveCustom").customData.units[i].weapon;
			units[i]["armor"]=GetComponent("SaveCustom").customData.units[i].armor;
		}
		gold=GetComponent("SaveCustom").customData.gold;
	}
}