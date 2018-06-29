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
var container1:GameObject;
var container2:GameObject;
var container3:GameObject;
var container4:GameObject;
var container5:GameObject;
var pic1text:GameObject;
var pic2text:GameObject;
var pic3text:GameObject;
var pic4text:GameObject;
var pic5text:GameObject;
var groupIndex:int;

function UpdateDisplay(units,groupNum){
	var curUnits=new Array( [ ] );
	for(var j =0;j<3;j++){
		for(var i =0;i<units.length;i++){
			if(units[i].group==groupNum && units[i].hor==(curUnits.length+1)){
				curUnits.Push(units[i]);
			}
		}
	}
	

	if(units[0].isAlly){
		pic1.GetComponent("SpriteRenderer").sprite=Resources.Load("alliesPics/" + curUnits[0].type,Sprite);
		pic1text.GetComponent("Text").text=curUnits[0].type;
		if(curUnits.length>1){
			pic2.GetComponent("SpriteRenderer").sprite=Resources.Load("alliesPics/" + curUnits[1].type,Sprite);
			pic2text.GetComponent("Text").text=curUnits[1].type;
		}else{
			pic2.GetComponent("SpriteRenderer").sprite=null;
			pic2text.GetComponent("Text").text="";
			container1.SetActive(false);
		}
		if(curUnits.length>2){
			pic3.GetComponent("SpriteRenderer").sprite=Resources.Load("alliesPics/" + curUnits[2].type,Sprite);
			pic3text.GetComponent("Text").text=curUnits[2].type;
		}else{
			pic3.GetComponent("SpriteRenderer").sprite=null;
			pic3text.GetComponent("Text").text="";
			container3.SetActive(false);
		}
	}else{
		pic1.GetComponent("SpriteRenderer").sprite=Resources.Load("enemiesPics/" + curUnits[0].type,Sprite);
		pic1text.GetComponent("Text").text=curUnits[0].type;
		if(curUnits.length>1){
			pic2.GetComponent("SpriteRenderer").sprite=Resources.Load("enemiesPics/" + curUnits[1].type,Sprite);
			pic2text.GetComponent("Text").text=curUnits[1].type;
		}else{
			pic2.GetComponent("SpriteRenderer").sprite=null;
			pic2text.GetComponent("Text").text="";
			container2.SetActive(false);
		}
		if(curUnits.length>2){
			pic3.GetComponent("SpriteRenderer").sprite=Resources.Load("enemiesPics/" + curUnits[2].type,Sprite);
			pic3text.GetComponent("Text").text=curUnits[2].type;
		}else{
			pic3.GetComponent("SpriteRenderer").sprite=null;
			pic3text.GetComponent("Text").text="";
			container3.SetActive(false);
		}
		if(curUnits.length>3){
			pic4.GetComponent("SpriteRenderer").sprite=Resources.Load("enemiesPics/" + curUnits[3].type,Sprite);
			pic4text.GetComponent("Text").text=curUnits[3].type;
		}else{
			pic4.GetComponent("SpriteRenderer").sprite=null;
			pic4text.GetComponent("Text").text="";
			container4.SetActive(false);
		}
		if(curUnits.length>4){
			pic5.GetComponent("SpriteRenderer").sprite=Resources.Load("enemiesPics/" + curUnits[4].type,Sprite);
			pic5text.GetComponent("Text").text=curUnits[4].type;
		}else{
			pic5.GetComponent("SpriteRenderer").sprite=null;
			pic5text.GetComponent("Text").text="";
			container5.SetActive(false);
		}
	}
	
}
function showCircle(){
	circle.SetActive(true);
}
function hideCircle(){
	circle.SetActive(false);
}