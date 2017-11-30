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
		Debug.Log("check");
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
	GetComponent("special_" + GetComponent("Main").curname).Pass(Entrances);
}

function MakeEnemies(){
	GetComponent("special_" + GetComponent("Main").curname).MakeEnemies();
}

function groupPass(Egroup){
	GetComponent("special_" + GetComponent("Main").curname).groupPass(Egroup);
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
	GetComponent("special_" + GetComponent("Main").curname).placeEnemies(location,count);

}
