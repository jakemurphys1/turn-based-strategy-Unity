 
 
 function damageEnemy(enemyNum,amount){
 var Eunits = GetComponent("Main").Eunits;

	Eunits[enemyNum].health-=amount;
	if(Eunits[enemyNum].health<0){
		Eunits[enemyNum].health=0;
	}
	
	var healthbar = Eunits[enemyNum].body.GetComponent("EnemyClick").healthbar;
	var health = Eunits[enemyNum].health + 0.0f;
	var maxhealth = Eunits[enemyNum].maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);
	var damage = amount.ToString();

	popupText = Resources.Load("Prefabs/PopupTextParent", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.SetParent(Eunits[enemyNum].body.transform,false);
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;
	var t = 0.0;
					 while (t < 1.0)
					 {
						 t += 0.013;
						 yield;
					 }
	Destroy(instance);
 }
