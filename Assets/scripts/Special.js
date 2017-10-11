var Entrance1: GameObject;
var Entrance2: GameObject;
var Entrance3: GameObject;
var Entrance4: GameObject;
var Entrance5: GameObject;
var Entrance6: GameObject;
var Entrances = new Array();


function Start () {
	MakeEnemies();

	if(Entrance1){
		Entrances.push(Entrance1);
	}
	if(Entrance2){
		Entrances.push(Entrance2);
	}
	if(Entrance3){
		Entrances.push(Entrance3);
	}
	if(Entrance4){
		Entrances.push(Entrance4);
	}
	if(Entrance5){
		Entrances.push(Entrance5);
	}
	if(Entrance6){
		Entrances.push(Entrance6);
	}
}

function Pass(){
	
}

function MakeEnemies(){
	var locations = GameObject.FindGameObjectsWithTag("location");
	var count = 0;
	var backupCount=0;
	while(count<15 && backupCount<200){
		var location = locations[Random.Range(0,locations.length)];
		if(location.GetComponent("locations").locIndex>0 && isEmpty(location)){
			placeEnemies(location,count);
			count+=1;
		}
		backupCount+=1;
	}
	
}

function isEmpty(location){
	var Egroups = GetComponent("Main").Egroups;

	for(var i =0;i<Egroups.length;i++){
		if(Egroups.location == location){
			return false;
		}
	}
	return true;
}

function placeEnemies(location, count){
	switch(count){
		case 1:
			GetComponent("Main").createEGroup("","Goblin","Goblin","Goblin","",location, 300);
			break;
		case 2:
			GetComponent("Main").createEGroup("","Goblin","Magnet","","",location, 400);
			break;
		case 3:
			GetComponent("Main").createEGroup("","Goblin","Goblin","Goblin","",location, 300);
			break;
		case 4:
			GetComponent("Main").createEGroup("","Bat","","","",location, 200);
			break;
		case 5:
			GetComponent("Main").createEGroup("","Silencer","Magnet","","",location, 400);
			break;
		case 6:
			GetComponent("Main").createEGroup("","","Clunker","","",location, 200);
			break;
		case 7:
			GetComponent("Main").createEGroup("","Bat","Bat","","",location, 400);
			break;
		case 8:
			GetComponent("Main").createEGroup("","Goblin","","","",location, 100);
			break;
		case 9:
			GetComponent("Main").createEGroup("","Goblin","Goblin","Goblin","Goblin",location, 400);
			break;
		case 10:
			GetComponent("Main").createEGroup("","FireElemental","","","",location, 200);
			break;
		case 11:
			GetComponent("Main").createEGroup("","FireElemental","FireElemental","","",location, 400);
			break;
		case 12:
			GetComponent("Main").createEGroup("","FireElemental","LightningElemental","FireElemental","",location, 600);
			break;
		case 13:
			GetComponent("Main").createEGroup("","IceElemental","IceElemental","","",location, 400);
			break;
		case 14:
			GetComponent("Main").createEGroup("","Bat","Bat","Bat","",location, 500);
			break;
		case 15:
			GetComponent("Main").createEGroup("","IceElemental","FireElemental","LightningElemental","",location, 700);
			break;
	}
}
