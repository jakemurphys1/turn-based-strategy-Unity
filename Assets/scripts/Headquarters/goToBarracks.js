var main: GameObject;
var listField: GameObject;



function gotobarracks(){
var addX = 0;
var addY = 0;
	gameObjects =  GameObject.FindGameObjectsWithTag ("barrackPic");
 
     for(var p = 0 ; p < gameObjects.length ; p ++){
		Destroy(gameObjects[p]);
	 }
         

	var units = main.GetComponent("Main").units;
	for(var i = 0;i<units.length;i++){
		if(units[i].group==-1){
				unit = Instantiate(Resources.Load("alliesPics/Soldier_prefab"));
				unit.transform.SetParent(listField.transform,false);
				if(addX>=375){
					addY+=100;
					addX=0;
				}
				unit.transform.position.x+=addX;
				unit.transform.position.y-=addY;
				addX+=75;
				unit.GetComponent("barrackpic").index = units[i].index;
		}
	}
}
