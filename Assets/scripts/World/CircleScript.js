var slot1: GameObject;
var slot2: GameObject;
var slot3: GameObject;
var slots = new Array();
var circle:GameObject;
var pics:GameObject;
var pic1:GameObject;
var pic2:GameObject;
var pic3:GameObject;
var pic4:GameObject;
var pic5:GameObject;
var groupIndex:int;

function UpdateDisplay(){
	pic1.GetComponent("SpriteRenderer").sprite=Resources.Load("alliesPics/Cleric",Sprite);
}
function showCircle(){
	circle.SetActive(true);
}
function hideCircle(){
	circle.SetActive(false);
}