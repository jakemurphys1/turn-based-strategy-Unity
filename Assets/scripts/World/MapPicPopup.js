var pic1: GameObject;
var pic2: GameObject;
var pic3: GameObject;
var pic4: GameObject;
var pic5: GameObject;
var name1:GameObject;
var name2:GameObject;
var name3:GameObject;
var name4:GameObject;
var name5:GameObject;
var health1:GameObject;
var health2:GameObject;
var health3:GameObject;
var health4:GameObject;
var health5:GameObject;
var level1:GameObject;
var level2:GameObject;
var level3:GameObject;
var level4:GameObject;
var level5:GameObject;
var levels=[];
var pics=[];
var names=[];
var healths=[];
var unitNums=[];
var EunitNums=[];
var main:GameObject;
var activeType;

function Start(){
	pics=[pic1,pic2,pic3,pic4,pic5];
	names=[name1,name2,name3,name4,name5];
	healths=[health1,health2,health3,health4,health5];
	levels=[level1,level2,level3,level4,level5];
}

function updatePics(curType,location,curGroupNum){
	gameObject.SetActive(true);
	activeType=curType;
	if(pics.length==0){
		Start();
	}
	unitNums=[null,null,null,null,null];
	EunitNums=[null,null,null,null,null];
	var group;
	var activeUnits=[null,null,null,null,null];
	var folderName;
	if(curType=="AllyActive" || curType=="AllyUsed"){
		group=curGroupNum;
		var units = main.GetComponent("Main").units;
		for(var i = 0;i<units.length;i++){
			if(units[i].group == group){
				activeUnits[units[i].hor]=units[i];
				unitNums[units[i].hor]=i;
			}
		}
		folderName="alliesPics";
	}
	if(curType=="Enemy"){
		Egroup=curGroupNum;
		var Eunits = main.GetComponent("Main").Eunits;
		for(i = 0;i<Eunits.length;i++){
			if(Eunits[i].group == Egroup){
				activeUnits[Eunits[i].hor]=Eunits[i];
				EunitNums[Eunits[i].hor]=i;
			}
		}
		folderName="enemiesPics";
	}
	for(i =0;i<5;i++){
		if(activeUnits[i]!=null){
			pics[i].SetActive(true);

			pics[i].GetComponent("Image").sprite=Resources.Load(folderName+"/"+activeUnits[i].type,typeof(Sprite));
			names[i].GetComponent("Text").text=activeUnits[i].type;
			if(activeUnits[i].level){
				print(activeUnits[i].level);
				levels[i].GetComponent("Text").text=activeUnits[i].level.ToString();
			}else{
				levels[i].GetComponent("Text").text="";
			}
			

			//if(curType=="AllyActive" || curType=="AllyUsed"){
				var health = activeUnits[i].health + 0.0f;
				var maxhealth = activeUnits[i].maxhealth + 0.0f;
				var percentage= health/maxhealth;
				healths[i].transform.localScale = Vector3(percentage,1,0.02);
			//}	
		}else{
			pics[i].SetActive(false);
		}
	}
}

function clickPic(num){
	var statBox = main.GetComponent("Main").statBox;
	print(activeType);
	if(activeType=="Ally" || activeType=="AllyActive"){
		var active = main.GetComponent("Main").units[unitNums[num]];
		statBox.SetActive(true);
		statBox.GetComponent("stats").updateText(active,active.health,active.maxhealth,active.attack,active.defense,active.resistance,active.accuracy,active.type,active.evasion, active.passiveActions);
	}
	if(activeType=="Enemy" || activeType=="EnemyActive"){
		main.GetComponent("Main").activeEnemy=EunitNums[num];
		var Eactive = main.GetComponent("Main").Eunits[EunitNums[num]];
		statBox.SetActive(true);
		statBox.GetComponent("stats").updateText(Eactive,Eactive.health,Eactive.maxhealth,Eactive.attack,Eactive.defense,Eactive.resistance,Eactive.accuracy,Eactive.type,Eactive.evasion, Eactive.passiveActions);
	}
}


