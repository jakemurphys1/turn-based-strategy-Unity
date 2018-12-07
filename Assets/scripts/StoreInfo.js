//var level=1;
var stage=1;
var posting;
var stageReached:int;
var main: GameObject;
var levels=new Array();
var units = new Array();
var items = new Array();
var defaultlevels=new Array();
var defaultunits = new Array();
var defaultitems = new Array();
var gold:int=0;
var diffLevel:int=3;
var job;

function Start(){
	DontDestroyOnLoad(gameObject);
	Load();
}

function Awake () {
			setInfo();
 }
 function setInfo(){
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
				{"name":"Potion Making","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Revive Potion Recipe","Healing Potion Recipe","Teleport Potion Recipe","Master Potion Recipe","Ability Potion Recipe","Accuracy Potion Recipe","Evasion Potion Recipe","Replicate Potion Recipe"],"message":"You can now brew and use potions from the nexus. You need to buy the recipes now."},
				{"name":"Iron Forging","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Steel Forging"], "message":"You can now upgrade bronze weapons and armor to iron in the armory."},
				{"name":"Steel Forging","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Titanium Forging"], "message":"You can now upgrade iron weapons and armor to steel in the armory."},
				{"name":"Titanium Forging","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[], "message":"You can now upgrade steel weapons and armor to titanium in the armory."},
				{"name":"Sewing","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Advanced Sewing"], "message":"You can now upgrade cotton clothing to wool in the armory."},
				{"name":"Advanced Sewing","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Silk Manufacturing"], "message":"You can now upgrade wool clothing to leather in the armory."},
				{"name":"Silk Manufacturing","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[], "message":"You can now upgrade leather clothing to silk in the armory."},
				{"name":"Wand Making","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Advanced Wand Making"], "message":"You can now upgrade glass wands to emerald in the armory."},
				{"name":"Advanced Wand Making","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Mastery of Wand Making"], "message":"You can now upgrade emerald wands to ruby in the armory."},
				{"name":"Mastery of Wand Making","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[], "message":"You can now upgrade ruby wands to diamond in the armory."},
				{"name":"Long Bow Building","unlocked":true,"bought":false, "price":500,"type":"Book","unlocks":["Elite Bow Building"], "message":"You can now upgrade wood bows to long bows in the armory."},
				{"name":"Elite Bow Building","unlocked":false,"bought":false, "price":1000,"type":"Book","unlocks":["Master Bow Building"], "message":"You can now upgrade long bows to elite bows in the armory."},
				{"name":"Master Bow Building","unlocked":false,"bought":false, "price":2000,"type":"Book","unlocks":[], "message":"You can now upgrade elite bows to master bows in the armory."},

				{"name":"Revive Potion Recipe","unlocked":false,"bought":false, "price":200,"type":"Scroll", "message":"You can now brew revive potion, which brings a dead unit back to life."},
				{"name":"Healing Potion Recipe","unlocked":false,"bought":false, "price":200,"type":"Scroll", "message":"You can now brew a healing potion, which can fully heal a unit, or immediately return a turn that is healing in the nexus."},
				{"name":"Teleport Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now brew a teleport potion, which will immediately return a unit that had escaped during battle."},
				{"name":"Accuracy Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now brew an accuracy potion, which increased the unit's accuracy by one for the rest of the battle. Once per battle."},
				{"name":"Evasion Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now brew an evasion potion, which increased the unit's evasion by one for the rest of the battle. Once per battle."},
				{"name":"Ability Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now brew an ability potion, which unlocks the unit's secret ability for the rest of the battle."},
				{"name":"Master Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now brew a master potion, which allows a level-6 unit to use it's level-6 ability."},
				{"name":"Replicate Potion Recipe","unlocked":false,"bought":false, "price":100,"type":"Scroll", "message":"You can now use replicate potion, which allow you to turn one ingrediant and an essence ingrediant into another ingrediant."}
			];
			gold=0;
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
	setInfo();
	Save();
}