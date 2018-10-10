var hitRatio:GameObject;
var damageBar:GameObject;
var healthBar:GameObject;

function updateView(ally,enemy, attackName){
	var range;
	if(ally.attackProperties[attackName]){
		range = ally.attackProperties[attackName]["Range"];
	}else{
		Destroy(gameObject);
		return;
	}
	if(range=="Line"){
		if(ally.hor!=enemy.hor && ally.vert!=enemy.vert){
			Destroy(gameObject);
			return;
		}
	}
	if(range=="Adjacent"){
		if(!((ally.hor==(enemy.hor + 1) || ally.hor==(enemy.hor - 1)) && ally.vert==enemy.vert) && !((ally.vert==(enemy.vert + 1) || ally.vert==(enemy.vert - 1)) && ally.hor==enemy.hor)){
			Destroy(gameObject);
			return;
		}
	}
	if(range=="Fire"){
		if(!isDiagonal(enemy,ally) && !isTwoAway(enemy,ally)){
			Destroy(gameObject);
			return;
		}
	}
	if(range=="Freeze"){
		if(!isThreeAway(enemy,ally)){
			Destroy(gameObject);
			return;
		}
	}
	if(range=="Zap"){
		if(!isTwoAway(enemy,ally)){
			Destroy(gameObject);
			return;
		}
	}
	if(range=="Sweep"){
		if(!isAdjacent(enemy,ally) && !isDiagonal(enemy,ally)){
			Destroy(gameObject);
			return;
		}
	}
	//health ratio
	var hitDiff= enemy.evasion-ally.accuracy + 0.0f;
	var hitperc;

		if(hitDiff<=0){
			hitperc="100%";
		}else{

			hitperc=((4-hitDiff)/4);
			print(hitDiff);
			hitperc=(hitperc*100)+"%";
		}

	hitRatio.GetComponent("Text").text=hitperc;

	//damage bar
	var DefenseType=ally.attackProperties[attackName]["DefenseType"];
	var damage = ally.attack;
	if(DefenseType=="defense"){
		damage-=enemy.defense;
	}else if(DefenseType=="resistance"){
		damage-=enemy.resistance;
	}
	if(ally.attackProperties[attackName]["Multiplier"]!="Charge"){
		damage=damage*ally.attackProperties[attackName]["Multiplier"];
	}else{
		damage=damage*ally.charge;
	}
	
	if(attackName=="Burst"){
		damage+=enemy.resistence;
	}

	if( ally.attackProperties[attackName]["Element"]!="None" && ally.attackProperties[attackName]["Element"]!="none"){
		if(ally.attackProperties[attackName]["Element"]!="Templar"){
			damage=damage * enemy.elemental[ally.attackProperties[attackName]["Element"]];
		}else{
			if(ally.element){
				damage=damage * enemy.elemental[ally.element];
			}
		}
		
	}
	var lifeLeft=enemy.health-damage;
	if(lifeLeft<0){
		lifeLeft=0;
	}
	lifeLeft = lifeLeft + 0.0f;
	var maxhealth = enemy.maxhealth + 0.0f;
	var percentage= lifeLeft/maxhealth;
	var newlength = 0.8 * percentage;
	healthBar.transform.localScale = Vector3(newlength,0.2,1);

	var damagebarPercentage = enemy.health/maxhealth;
	newlength = 0.8 * damagebarPercentage;
	damageBar.transform.localScale = Vector3(newlength,0.2,1);
}

 function isDiagonal(enemy,ally){
	if(ally.vert==(enemy.vert+1) && ally.hor == (enemy.hor+1)){
		return true;
	}
	if(ally.vert==(enemy.vert-1) && ally.hor == (enemy.hor+1)){
		return true;
	}
	if(ally.vert==(enemy.vert+1) && ally.hor == (enemy.hor-1)){
		return true;
	}
	if(ally.vert==(enemy.vert-1) && ally.hor == (enemy.hor-1)){
		return true;
	}
	return false;
 }
 function isTwoAway(enemy,ally){
	if(isAdjacent(enemy,ally)){
		return true;
	}
	if(ally.hor == enemy.hor){
		if(ally.vert==(enemy.vert+2) || ally.vert==(enemy.vert-2)){
			return true;
		}
	}
	if(ally.vert == enemy.vert){
		if(ally.hor==(enemy.hor+2) || ally.hor==(enemy.hor-2)){
			return true;
		}
	}
 }
 function isThreeAway(enemy,ally){
	if(isTwoAway(enemy,ally)){
		return true;
	}
	if(ally.hor == enemy.hor){
		if(ally.vert==(enemy.vert+3) || ally.vert==(enemy.vert-3)){
			return true;
		}
	}
	if(ally.vert == enemy.vert){
		if(ally.hor==(enemy.hor+3) || ally.hor==(enemy.hor-3)){
			return true;
		}
	}
 }
  function isAdjacent(enemy,ally){
	if(enemy.vert == ally.vert && enemy.hor == (ally.hor + 1)){
		return true;
	}
	if(enemy.vert == ally.vert && enemy.hor == (ally.hor - 1)){
		return true;
	}
	if(enemy.vert == (ally.vert+1) && enemy.hor == ally.hor){
		return true;
	}
	if(enemy.vert == (ally.vert-1) && enemy.hor == ally.hor){
		return true;
	}
	return false;
 }
 function sweepRange(){
 
 }
