﻿var space00:GameObject;
var space01:GameObject;
var space02:GameObject;
var space03:GameObject;
var space04:GameObject;
var space10:GameObject;
var space11:GameObject;
var space12:GameObject;
var space13:GameObject;
var space14:GameObject;
var space20:GameObject;
var space21:GameObject;
var space22:GameObject;
var space23:GameObject;
var space24:GameObject;
var space30:GameObject;
var space31:GameObject;
var space32:GameObject;
var space33:GameObject;
var space34:GameObject;
var space40:GameObject;
var space41:GameObject;
var space42:GameObject;
var space43:GameObject;
var space44:GameObject;
var row1= new Array();
var row2= new Array();
var row3= new Array();
var row4= new Array();
var row5= new Array();
var allspaces= new Array();

var allyMove1: GameObject;
var allyMove2: GameObject;
var allyMove3: GameObject;
var allyMove4: GameObject;
var allyMove5: GameObject;
var allyMove6: GameObject;
var allyMoves= new Array();

var enemyMove1:GameObject;
var enemyMove2:GameObject;
var enemyMove3:GameObject;
var enemyMove4:GameObject;
var enemyMoves= new Array();

var entry: GameObject;

var main: GameObject;
var locIndex:int;
var itself: GameObject;
var Grid: GameObject;

function Start(){
	row1 = [space00,space10,space20,space30,space40];
	row2 = [space01,space11,space21,space31,space41];
	row3 = [space02,space12,space22,space32,space42];
	row4 = [space03,space13,space23,space33,space43];
	row5 = [space04,space14,space24,space34,space44];
	allspaces = [row1,row2,row3,row4,row5];

	if(allyMove1){
		allyMoves.push(allyMove1);
	}
	if(allyMove2){
		allyMoves.push(allyMove2);
	}
	if(allyMove3){
		allyMoves.push(allyMove3);
	}
	if(allyMove4){
		allyMoves.push(allyMove4);
	}
	if(allyMove5){
		allyMoves.push(allyMove5);
	}
	if(allyMove6){
		allyMoves.push(allyMove6);
	}

	if(enemyMove1){
		enemyMoves.push(enemyMove1);
	}
	if(enemyMove2){
		enemyMoves.push(enemyMove2);
	}
	if(enemyMove3){
		enemyMoves.push(enemyMove3);
	}
	if(enemyMove4){
		enemyMoves.push(enemyMove4);
	}
}

function OnMouseOver(){
	if(Input.GetMouseButtonDown(1)){
		moveActive();
	};
}


 function moveActive(){
	//if(!main){
		main= GameObject.Find("Main");
	//}
	 main.GetComponent.<Main>().hideEntries();
 	 main.GetComponent.<Main>().moveGroup(space10.transform.position,space20.transform.position,space30.transform.position,locIndex, itself);
	 main.GetComponent("Special").SpecialFunction("moveGroup");
 }