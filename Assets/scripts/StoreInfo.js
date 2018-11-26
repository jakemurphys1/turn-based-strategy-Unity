var level=1;
var stage=1;
var posting;
var stageReached:int;
var main: GameObject;
var levels=new Array();
var units = new Array();
var items = new Array();
var gold:int=0;
var diffLevel:int=3;
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
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false},
				{"unlocked":false,"completed":false}
			];
			units =[
				{"type":"Soldier","unlocked":true,"hired":true,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor","Price":25},
				{"type":"Mage","unlocked":true,"hired":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth","Price":25},
				{"type":"Archer","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth","Price":50},
				{"type":"Templar","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth","Price":50},
				{"type":"Wizard","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth","Price":75},
				{"type":"Guard","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Shield","armor":"Bronze","armorType":"Armor","Price":75},
				{"type":"Knight","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor","Price":100},
				{"type":"Monk","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"None","weaponType":"None","armor":"Cotton","armorType":"Cloth","Price":100},
				{"type":"Rogue","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Wood","weaponType":"Bow","armor":"Cotton","armorType":"Cloth","Price":100},
				{"type":"Thief","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Bronze","weaponType":"Sword","armor":"Bronze","armorType":"Armor","Price":100},
				{"type":"Cleric","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"None","weaponType":"None","armor":"Cotton","armorType":"Cloth","Price":125},
				{"type":"Sorcerer","unlocked":false,"hired":false,"level":1,"experience":0,"weapon":"Glass","weaponType":"Wand","armor":"Cotton","armorType":"Cloth","Price":125}
			];
			items=[
				{"name":"Potion Making","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Revive Potion Recipe","Recover Potion Recipe","Teleport Potion Recipe","Defense Potion Recipe","Resistance Potion Recipe","Attack Potion Recipe","Health Potion Recipe","Accuracy Potion Recipe","Evasion Potion Recipe","Replicate Potion Recipe"]},
				{"name":"Iron Forging","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Steel Forging"]},
				{"name":"Steel Forging","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Titanium Forging"]},
				{"name":"Titanium Forging","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[]},
				{"name":"Sewing","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Advanced Sewing"]},
				{"name":"Advanced Sewing","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Silk Manufacturing"]},
				{"name":"Silk Manufacturing","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[]},
				{"name":"Wand Making","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Advanced Wand Making"]},
				{"name":"Advanced Wand Making","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Mastery of Wand Making"]},
				{"name":"Mastery of Wand Making","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[]},
				{"name":"Long Bow Building","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Elite Bow Building"]},
				{"name":"Elite Bow Building","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Master Bow Building"]},
				{"name":"Master Bow Building","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[]},
				{"name":"Revive Potion Recipe","unlocked":false,"bought":false, "price":200,"type":"Scroll"},
				{"name":"Recover Potion Recipe","unlocked":false,"bought":false, "price":200,"type":"Scroll"},
				{"name":"Teleport Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Defense Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Resistance Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Attack Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Health Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Accuracy Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Evasion Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"},
				{"name":"Replicate Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll"}
			];
 }


public function Save(){
		for(var i =0;i<levels.length;i++){
			GetComponent("SaveCustom").customData.levels[i].unlocked=levels[i]["unlocked"];
			GetComponent("SaveCustom").customData.levels[i].completed=levels[i]["completed"];
		}
		for(i =0;i<units.length;i++){
			GetComponent("SaveCustom").customData.units[i].unlocked=units[i]["unlocked"];
			GetComponent("SaveCustom").customData.units[i].hired=units[i]["hired"];
			GetComponent("SaveCustom").customData.units[i].type=units[i]["type"];
			GetComponent("SaveCustom").customData.units[i].level=units[i]["level"];
			GetComponent("SaveCustom").customData.units[i].experience=units[i]["experience"];
			GetComponent("SaveCustom").customData.units[i].weapon=units[i]["weapon"];
			GetComponent("SaveCustom").customData.units[i].armor=units[i]["armor"];
		}
		for(i =0;i<items.length;i++){
			GetComponent("SaveCustom").customData.items[i].unlocked=items[i]["unlocked"];
			GetComponent("SaveCustom").customData.items[i].name=items[i]["name"];
			GetComponent("SaveCustom").customData.items[i].bought=items[i]["bought"];
		}
		GetComponent("SaveCustom").customData.gold=gold;
		GetComponent("SaveCustom").customData.diffLevel=diffLevel;
		GetComponent("SaveCustom").Save();
}
public function Load(){
	GetComponent("SaveCustom").Load();
	if(GetComponent("SaveCustom").customData.units[0].unlocked){
		for(var i =0;i<levels.length;i++){
			if(i<levels.length){
				levels[i]["unlocked"]=GetComponent("SaveCustom").customData.levels[i].unlocked;
				levels[i]["completed"]=GetComponent("SaveCustom").customData.levels[i].completed;
			}
		}
		for(i =0;i<units.length;i++){
			units[i]["unlocked"]=GetComponent("SaveCustom").customData.units[i].unlocked;
			units[i]["hired"]=GetComponent("SaveCustom").customData.units[i].hired;
			units[i]["type"]=GetComponent("SaveCustom").customData.units[i].type;
			units[i]["level"]=GetComponent("SaveCustom").customData.units[i].level;
			units[i]["experience"]=GetComponent("SaveCustom").customData.units[i].experience;
			units[i]["weapon"]=GetComponent("SaveCustom").customData.units[i].weapon;
			units[i]["armor"]=GetComponent("SaveCustom").customData.units[i].armor;
		}

		for(i =0;i<items.length;i++){
			items[i]["unlocked"]=GetComponent("SaveCustom").customData.items[i].unlocked;
			items[i]["name"]=GetComponent("SaveCustom").customData.items[i].name;
			items[i]["bought"]=GetComponent("SaveCustom").customData.items[i].bought;
		}
		gold=GetComponent("SaveCustom").customData.gold;
		diffLevel=GetComponent("SaveCustom").customData.diffLevel;

	}
}
public function eraseData(){
	GetComponent("SaveCustom").eraseData();
	GetComponent("SaveCustom").Load();
}