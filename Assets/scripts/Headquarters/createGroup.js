﻿var slot1: GameObject;
var slot2: GameObject;
var slot3: GameObject;
var main: GameObject;
var menu: GameObject;

function createGroup(){
	menu.SetActive(false);
	main.GetComponent.<Main>().createGroup(slot1.GetComponent.<slots>().index,slot2.GetComponent.<slots>().index,slot3.GetComponent.<slots>().index);
}
