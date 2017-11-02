var listField: GameObject;
var main:GameObject;
var barracks: GameObject;
var makePotions:GameObject;
var potionInfo:GameObject;
var statsBox:GameObject;
var replicateBox:GameObject;
var usePotionsBox:GameObject;

function usePotions(){
	barracks.SetActive(false);
	makePotions.SetActive(false);
	potionInfo.SetActive(false);
	statsBox.SetActive(false);
	usePotionsBox.SetActive(true);
	var addX = 0;
	var addY = 0;
		gameObjects =  GameObject.FindGameObjectsWithTag ("barrackPic");
 
		 for(var p = 0 ; p < gameObjects.length ; p ++){
			Destroy(gameObjects[p]);
		 }
         

		var units = main.GetComponent("Main").units;
		for(var i = 0;i<units.length;i++){
			if(units[i].group==-1){
				
					unit = Instantiate(Resources.Load("alliesPics/" + units[i].type + "_prefab"));
					unit.transform.SetParent(listField.transform,false);
					if(addX>=375){
						addY+=100;
						addX=0;
					}
					unit.transform.position.x+=addX;
					unit.transform.position.y-=addY;
					addX+=75;
					unit.GetComponent("barrackpic").index = units[i].index;
					var healthbar = unit.GetComponent("barrackpic").healthbar;
					var health = units[i].health + 0.0f;
					var maxhealth = units[i].maxhealth + 0.0f;
					var percentage= health/maxhealth;
					var newlength = 1 * percentage;
					healthbar.transform.localScale = Vector3(newlength,1,0.02);

					var level = unit.GetComponent("barrackpic").levelText;
					level.GetComponent("Text").text=units[i].level.ToString();

			}
		}
}
