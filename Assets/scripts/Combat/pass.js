﻿var main: GameObject;
var eslots = new Array();
var slots = new Array();
var spaces = new Array();
var experience: int;
var curDisabled=false;
var self:GameObject;
var buttonDisabled=false;

function enemyturn(){
	if(buttonDisabled){
		DisablePass();
		return;
	}
	DisablePass();
	main.GetComponent("Main").removePotentialDamage();
	if(main.GetComponent("Main").inCombat==false){
		worldturn();
		return;
	}
	main.GetComponent("Special").SpecialFunction("pass2");
	if(slots.length==0){
		main.GetComponent("Main").loseBattle();
	}
	//reset allies
	for(var i =0;i<slots.length;i++){
		if(slots[i].type=="Knight"){
			if(slots[i].hasMoved==false && slots[i].didAction==false){
				slots[i].energy+=30;
				if(slots[i].energy>100){
					slots[i].energy=100;
				}
				main.GetComponent("combat").setEnergyBar(slots[i]);
			}
		}
		slots[i].hasMoved=false;
		slots[i].didAction=false;
		main.GetComponent("combat").showStatus(slots[i]);
	}

	//reset enemies
	for(var p =0;p<eslots.length;p++){
		
		eslots[p].hasMoved=false;
		eslots[p].didAction=false;
		if(eslots[p].poison>0){
			var pDamage = 10;
			if(eslots[p].health<11){
				pDamage=eslots[p].health-1;
			}
			print("Poison");
			main.GetComponent("combat").damageEnemy(eslots[p],pDamage,"None");
		}
		if(eslots[p].type == "Werewolf"){
			heal(eslots[p],40);
		}
		if(eslots[p].phasing && eslots[p].phasedout==false){
			eslots[p].phasedout=true;
			eslots[p].body.GetComponent("Thief").turnInvisible();
			main.GetComponent("combat").wordPopup(eslots[p],"Phased Out");
		}
	}
	
	//enemy attack
	enemyAttack();
	
	enemyMove();
	
	//enemy attack2
	enemyAttack();

	for(i=0;i<eslots.length;i++){
		if(eslots[i].doubleAttack>1 && eslots[i].didAction==false){
			eslots[i].hasMoved=false;
			enemyMove();
			enemyAttack();
		}
	}

	//reduce ailments
	for(var k =0;k<eslots.length;k++){
		if(eslots[k].immobolized>0){
			eslots[k].immobolized-=1;
			main.GetComponent("combat").wordPopup(eslots[k],"Immobolized: " + eslots[k].immobolized);
		}
		if(eslots[k].sleep>0){
			eslots[k].sleep-=1;
			main.GetComponent("combat").wordPopup(eslots[k],"Sleep: " + eslots[k].sleep);
		}
		if(eslots[k].enfeebled>0){
			eslots[k].enfeebled-=1;
		}
		if(eslots[k].blind>0){
			eslots[k].blind-=1;
			main.GetComponent("combat").wordPopup(eslots[k],"Blind: " + eslots[k].blind);
		}
		if(eslots[k].silenced>0){
			eslots[k].silenced-=1;
			main.GetComponent("combat").wordPopup(eslots[k],"Silenced: " + eslots[k].silenced);
		}
		if(eslots[k].poison>0){
			eslots[k].poison-=1;
		}
		if(eslots[k].sluggishness>0){
			eslots[k].sluggishness-=1;
		}
		if(eslots[k].vulnerable>0){
			eslots[k].vulnerable-=1;
		}
	}
	for(var q =0;q<slots.length;q++){
		turnVisible(slots[q]);
		if(slots[q].immobolized>0){
			slots[q].immobolized-=1;
		}
		if(slots[q].sleep>0){
			slots[q].sleep-=1;
			main.GetComponent("combat").wordPopup(slots[q],"Sleep: " + slots[q].sleep);
		}
		if(slots[q].enfeebled>0){
			slots[q].enfeebled-=1;
		}
		if(slots[q].blind>0){
			slots[q].blind-=1;
		}
		if(slots[q].silenced>0){
			slots[q].silenced-=1;
		}
		if(slots[q].poison>0){
			pDamage = 10;
			if(slots[q].health<11){
				pDamage=slots[q].health-1;
			}
			main.GetComponent("combat").damageAlly(slots[q].index,pDamage,null,0);
			slots[q].poison-=1;
		}
	}
	
	returnUnits();
}
function worldturn(){
	var groups = main.GetComponent("Main").groups;
	var Egroups = main.GetComponent("Main").Egroups;
	var units = main.GetComponent("Main").units;


	main.GetComponent("Special").SpecialFunction("pass");

	for(var i = 0;i<groups.length;i++){
		groups[i].hasMoved=false;
		var groupempty=true;
		for(var j = 0;j<units.length;j++){
			if(units[j].group == i){
				groupempty=false;
			}
		}
		if(groupempty){
			groups[i].location =null;
		}
	}
	for(i = 0;i<units.length;i++){
		if(units[i].type=="Sorcerer"){
			units[i].energy+=10;
			if(units[i].actionsActive["Surge"]){
				units[i].energy+=10;
			}
			if(units[i].energy>100){
				units[i].energy=100;
			}
			main.GetComponent("combat").setEnergyBar(units[i]);
		}
		if(units[i].enroute>0){
			units[i].enroute-=1;
			if(units[i].enroute==0){
				main.GetComponent("Main").quickMessage(units[i].type + " has returned to the Nexus.");
			}
		}
		if(units[i].healing>0){
			units[i].healing-=1;
			if(units[i].healing==0){
				main.GetComponent("Main").quickMessage(units[i].type + " has fully healed.");
			}
		}
	}

	//move enemies
	for(i = 0;i<Egroups.length;i++){
		if(!Egroups[i].location || Egroups[i].location==null){
			continue;
		}
		main.GetComponent("Special").groupPass(Egroups[i]);
		var location = Egroups[i].location;
		var rand = Random.Range(1,3);
		
		var moveLocation; 
		if(location.GetComponent("locations").enemyMove1){
			moveLocation = location.GetComponent("locations").enemyMove1;
		}else{
			continue;
		}
		if(rand>1 && location.GetComponent("locations").enemyMove2){
			moveLocation = location.GetComponent("locations").enemyMove2;
		}

		if(moveLocation){
			var isFilled = false;
			for(j = 0;j<Egroups.length;j++){
				if(Egroups[j].location == moveLocation){
					isFilled=true;
				}
			}
			if(isFilled==false){
				moveEnemies(Egroups[i], moveLocation);
			}
		}
	}
	main.GetComponent("Special").Pass();
	main.GetComponent("Main").UpdateIconsMain();
	yield WaitForSeconds(2);
	main.GetComponent("Main").checkBattle(location);
}

function moveEnemies(Egroup, location:GameObject){
			if(main.GetComponent("Main").inCombat){
 				return;
			}
			Egroup.location = location;
			var slot1 = location.GetComponent("locations").space04.transform.position;
			var slot2= location.GetComponent("locations").space14.transform.position;
			var slot3 = location.GetComponent("locations").space24.transform.position;
			var slot4 = location.GetComponent("locations").space34.transform.position;
			var slot5 = location.GetComponent("locations").space44.transform.position;

			slot1.y=1;
			slot2.y=1;
			slot3.y=1;
			slot4.y=1;
			slot5.y=1;
			var curObject1 = giveEnemySlot(0,Egroup.index);
			var curObject2 = giveEnemySlot(1,Egroup.index);
			var curObject3 = giveEnemySlot(2,Egroup.index);
			var curObject4 = giveEnemySlot(3,Egroup.index);
			var curObject5 = giveEnemySlot(4,Egroup.index);
			if(curObject1){
				
				curObject1.GetComponent("EnemyClick").Run=1;

				var startPosition1 = curObject1.transform.position;

				_direction1 = (slot1 - startPosition1).normalized;
				_lookRotation1 = Quaternion.LookRotation(_direction1);
				startDirection1 = curObject1.transform.rotation;
				curObject1.transform.rotation=_lookRotation1;
			}
			if(curObject2){
				curObject2.GetComponent("EnemyClick").Run=1;
				var startPosition2 = curObject2.transform.position;

				_direction2 = (slot2 - startPosition2).normalized;
					_lookRotation2 = Quaternion.LookRotation(_direction2);
					startDirection2= curObject2.transform.rotation;
					curObject2.transform.rotation=_lookRotation2;
			}
			if(curObject3){
				curObject3.GetComponent("EnemyClick").Run=1;
				var startPosition3 = curObject3.transform.position;

				_direction3 = (slot3 - startPosition3).normalized;
					_lookRotation3 = Quaternion.LookRotation(_direction3);
					startDirection3 = curObject3.transform.rotation;
					curObject3.transform.rotation=_lookRotation3;
			}
			if(curObject4){
				curObject4.GetComponent("EnemyClick").Run=1;
				var startPosition4 = curObject4.transform.position;

				_direction4 = (slot4 - startPosition4).normalized;
					_lookRotation4 = Quaternion.LookRotation(_direction4);
					startDirection4 = curObject4.transform.rotation;
					curObject4.transform.rotation=_lookRotation4;
			}
			if(curObject5){
				curObject5.GetComponent("EnemyClick").Run=1;
				var startPosition5 = curObject5.transform.position;

				_direction5 = (slot5 - startPosition5).normalized;
					_lookRotation5 = Quaternion.LookRotation(_direction5);
					startDirection5 = curObject3.transform.rotation;
					curObject5.transform.rotation=_lookRotation5;
			}
					var t = 0.0;
					 while (t < 1.0)
					 {
						 t += 0.03;
						 if(curObject1){
							curObject1.transform.position = Vector3.Lerp(startPosition1,slot1,t);
						 }
						 if(curObject2){
							curObject2.transform.position = Vector3.Lerp(startPosition2,slot2,t);
						 }
						 if(curObject3){
							curObject3.transform.position = Vector3.Lerp(startPosition3,slot3,t);
						 }
						 if(curObject4){
							curObject4.transform.position = Vector3.Lerp(startPosition4,slot4,t);
						 }
						 if(curObject5){
							curObject5.transform.position = Vector3.Lerp(startPosition5,slot5,t);
						 }
						 yield;
					 }

					 if(curObject1){
						curObject1.transform.rotation=startDirection1;
						curObject1.GetComponent("EnemyClick").Run=0;
					 }
					 if(curObject2){
						curObject2.transform.rotation=startDirection2;
						curObject2.GetComponent("EnemyClick").Run=0;
					 }
					 if(curObject3){
						curObject3.transform.rotation=startDirection3;
						curObject3.GetComponent("EnemyClick").Run=0;
					 } 
					 if(curObject4){
						curObject4.transform.rotation=startDirection4;
						curObject4.GetComponent("EnemyClick").Run=0;
					 }
					 if(curObject5){
						curObject5.transform.rotation=startDirection5;
						curObject5.GetComponent("EnemyClick").Run=0;
					 } 					 
 }

function DisablePass(){
	//self.GetComponent("Button").enabled=false;
	buttonDisabled=true;
	yield WaitForSeconds(2);
	//self.GetComponent("Button").enabled=true;
	buttonDisabled=false;
}

function giveEnemySlot(number,group){
	var Eunits = main.GetComponent("Main").Eunits;
	for(var i =0;i<Eunits.length;i++){
		if(Eunits[i].group==group && Eunits[i].hor==number){
			return Eunits[i].body;
		}
	}
	return null;
 }

function enemyMove(){
	for(var j =0;j<eslots.length;j++){
		if(eslots[j].immobolized>0){
			continue;
		}
		if(eslots[j].sleep>0){
			continue;
		}
		if(eslots[j].hasMoved){
			continue;
		}
		if(eslots[j].moveType=="Agressive"){
			aggressiveMove(eslots[j]);
		}
		if(eslots[j].moveType=="Flying"){
			flyMove(eslots[j]);
		}
		if(eslots[j].moveType=="Scroll"){
				scrollMove(eslots[j]);
		}
		if(eslots[j].moveType=="Afraid"){
			afraidMove(eslots[j]);
		}
		if(eslots[j].moveType=="Random"){
			randomMove(eslots[j]);
		}
		if(eslots[j].moveType=="Passing"){
			passing(eslots[j]);
		}
	}
}
function enemyAttack(){
	for(var n =0;n<eslots.length;n++){
		if(eslots[n].didAction==false){
			if(eslots[n].sleep>0){
				continue;
			}
			if(eslots[n].didAction){
				continue;
			}
			if(eslots[n].defenseType=="defense"){
				if(eslots[n].blind>0){
					continue;
				}
			}else{
				if(eslots[n].silenced>0){
					continue;
				}
			}
			if(eslots[n].maxcharge>-1 && eslots[n].chargeAfterAttack==false){
				if(eslots[n].charge<eslots[n].maxcharge){
					charge(eslots[n]);
					continue;
				}
			}


			if(eslots[n].attackType=="CloseAttack"){
				closeAttack(eslots[n],eslots,slots);
			}
			if(eslots[n].attackType=="IceAttack"){
				IceAttack(eslots[n],eslots,slots);
			}
			if(eslots[n].attackType=="SpitterAttack"){
				SpitterAttack(eslots[n],eslots,slots);
			}
			if(eslots[n].attackType=="FireAttack"){
				FireAttack(eslots[n]);
			}
			if(eslots[n].attackType=="LightningAttack"){
				LightningAttack(eslots[n]);
			}
			if(eslots[n].attackType=="NecromancerAttack"){
				NecromancerAttack(eslots[n]);
			}
			if(eslots[n].attackType=="SpiderAttack"){
				SpiderAttack(eslots[n]);
			}
			if(eslots[n].attackType=="GuardAttack"){
				closeAttack(eslots[n],eslots,slots);
				if(eslots[n].didAction==false){
					GuardAction(eslots[n]);
				}
			}
			if(eslots[n].attackType=="VacuumAttack"){
				closeAttack(eslots[n],eslots,slots);
				if(eslots[n].didAction==false){
					SpiderAttack(eslots[n]);
				}
			}

			if(eslots[n].attackType=="FrostwraithAttack"){
				closeAttack(eslots[n],eslots,slots);
				if(eslots[n].didAction==false && eslots[n].charge>=eslots[n].maxcharge){
					IceAttack(eslots[n],eslots,slots);
				}
			}
			if(eslots[n].attackType=="FlamewraithAttack"){
				closeAttack(eslots[n],eslots,slots);
				if(eslots[n].didAction==false && eslots[n].charge>=eslots[n].maxcharge){
					FireAttack(eslots[n]);
				}
			}
			if(eslots[n].attackType=="WaterwraithAttack"){
				closeAttack(eslots[n],eslots,slots);
				if(eslots[n].didAction==false && eslots[n].charge>=eslots[n].maxcharge){
					WaterwraithAttack(eslots[n],eslots,slots);
				}
			}
			if(eslots[n].attackType=="ArrowAttack"){
				arrowAttack(eslots[n]);
			}
			if(eslots[n].attackType=="Healer"){
				Healer(eslots[n]);
			}
			if(eslots[n].attackType=="CannonAttack"){
				CannonAttack(eslots[n]);
			}
			if(eslots[n].attackType=="MageAttack"){
				MageAttack(eslots[n],eslots,slots);
			}
			if(eslots[n].maxcharge>-1 && eslots[n].chargeAfterAttack && eslots[n].didAction==false){
				if(eslots[n].charge<eslots[n].maxcharge){
					charge(eslots[n]);
					continue;
				}
			}
		}
	}
}



//Attacks
function closeAttack(enemy,eslots,slots){
		var waittime=0;
		if(!enemy.body || enemy.blind>0){
			return;
		}
		if(enemy.body.GetComponent("EnemyClick").Run>0){
			waittime=1;
		}
		var reverseX=0;
		var reverseY = 0;
		var attackThis = isAdjacent(enemy.hor,enemy.vert,slots);
		var isSpecial=false;
		if(enemy.type=="Warrior" && enemy.hasMoved==false){
			isSpecial=true;
		}
		if(attackThis!=-1){
			enemy.enemyHit = main.GetComponent("combat").hitResult(enemy, slots[attackThis].evasion,enemy.accuracy);
			enemy.hasMoved=true;
			enemy.didAction=true;
			yield WaitForSeconds(waittime);
			lookAt(enemy,slots[attackThis]);
			if(enemy.vert==slots[attackThis].vert){
				if(enemy.hor>slots[attackThis].hor){
					//go left
					reverseX=4;
					move(enemy.body,-4,0);
				}else{
					//go right
					reverseX=-4;
					move(enemy.body,4,0);
				}
			}else{
				if(enemy.vert<slots[attackThis].vert){
					//go up
					reverseY=-4;
					move(enemy.body,0,4);
				}else{
					//go down
					reverseY=4;
					move(enemy.body,0,-4);
				}
			}
			var damage = enemy.attack-main.GetComponent("combat").getdefense(slots[attackThis],"defense");
			if(isSpecial){
				enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",1);
				damage=damage*2;
			}else{
				enemy.body.GetComponent("EnemyClick").attack =1;
			}
			
			main.GetComponent("combat").damageAlly(slots[attackThis].index,damage,enemy,1);
			yield WaitForSeconds(1);
			if(isSpecial){
				main.GetComponent("combat").wordPopup(slots[attackThis],"Double Damage");
			}
			enemy.body.GetComponent("EnemyClick").attack =0;
			enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",0);
			main.GetComponent("sounds").playSound("hit");
			yield WaitForSeconds(0.5);
			
			if(enemy.type=="Pixie"){
				doAilment(enemy,slots[attackThis],"Poison");
				doAilment(enemy,slots[attackThis],"Enfeeble");
			}
			if(enemy.type=="Snake"){
				doAilment(enemy,slots[attackThis],"Poison");
			}
			if(enemy.type=="Bear"){
				doAilment(enemy,slots[attackThis],"Blind");
			}
			if(enemy.type=="Plague"){
				doAilment(enemy,slots[attackThis],"Sleep");
				doAilment(enemy,slots[attackThis],"Enfeebled");
			}
			move(enemy.body,reverseX,reverseY);
			if(enemy.type=="Thief"){
				enemy.phasedout=false;
				enemy.body.GetComponent("Thief").turnVisible();
				main.GetComponent("combat").wordPopup(enemy,"Phased In!");
			}
			counter(enemy,slots[attackThis]);
		}
}
function arrowAttack(enemy){
	if(!enemy.body || enemy.blind>0){
		return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;
	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(slots,enemy.defenseType);
	lookAt(enemy,target);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy, target.evasion,enemy.accuracy);
	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);

	yield WaitForSeconds(1);
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);
	yield WaitForSeconds(1);
	enemy.body.GetComponent("EnemyClick").attack =0;
	main.GetComponent("sounds").playSound("arrow");
	if(enemy.type=="Assassin"){
		var rand = Random.Range(1,5);
		if(rand==1){
			doAilment(enemy,target,"Enfeebled");
		}else if(rand==2){
			doAilment(enemy,target,"Sleep");
		}else if(rand==3){
			doAilment(enemy,target,"Poison");
		}else if(rand==4){
			doAilment(enemy,target,"Immobolized");
		}
	}
		 
		 
	counter(enemy,target);
}
function IceAttack(enemy,eslots,slots){
	var attackThis = isTwoAway(enemy.hor,enemy.vert,slots);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy, slots[attackThis].evasion,enemy.accuracy);
	if(attackThis==-1){
		return;
	}
	
		var ally = slots[attackThis];
		enemy.didAction=true;
		enemy.hasMoved=true;
		enemy.charge-=enemy.maxcharge;
		enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
		enemy.body.GetComponent("EnemyClick").attack =1;
		lookAt(enemy,slots[attackThis]);
		yield WaitForSeconds(0.5);
		//ice animation
		var item = enemy.body.GetComponent("EnemyClick").item;
		item.SetActive(true);
		var startPosition = item.transform.position;
		var endPosition = new Vector3(ally.body.transform.position.x,item.transform.position.y,ally.body.transform.position.z);
		
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.02;
			 item.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 main.GetComponent("sounds").playSound("ice");
		 var damage = enemy.attack-main.GetComponent("combat").getdefense(slots[attackThis],"resistance");
		 main.GetComponent("combat").damageAlly(slots[attackThis].index,damage,enemy,0);
		 item.SetActive(false);
		 item.transform.position=startPosition;

		 magic = Resources.Load("effects/Frozen", GameObject);
		frozen = Instantiate(magic);
		frozen.transform.position = ally.body.transform.position;
		enemy.body.GetComponent("EnemyClick").attack =0;	
		yield WaitForSeconds(1);
		Destroy(frozen);
		counter(enemy,slots[attackThis]);
}
function MageAttack(enemy,eslots,slots){
	var attackThis = isTwoAway(enemy.hor,enemy.vert,slots);
	if(attackThis==-1){
		for(var j = 0;j<slots.length;j++){
			if(slots[j].invisible){
				continue;
			}
			if(isDiagonal(enemy,slots[j])){
				attackThis = j;
			}
		}
	}
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy, slots[attackThis].evasion,enemy.accuracy);
	if(attackThis==-1){
		return;
	}
	
		var ally = slots[attackThis];
		enemy.didAction=true;
		enemy.hasMoved=true;
		var waittime=0;
		if(enemy.body.GetComponent("EnemyClick").Run>0){
			waittime=1;
		}
		yield WaitForSeconds(waittime);
		enemy.body.GetComponent("EnemyClick").attack =1;
		lookAt(enemy,slots[attackThis]);
		yield WaitForSeconds(0.5);
		main.GetComponent("sounds").playSound("fire");
		magic = Resources.Load("effects/FireBall", GameObject);
		instance = Instantiate(magic);
		instance.transform.position = enemy.body.transform.position;
		shootObject(instance,ally);
		yield WaitForSeconds(0.5);
		 var damage = enemy.attack-main.GetComponent("combat").getdefense(slots[attackThis],"resistance");
		 main.GetComponent("combat").damageAlly(slots[attackThis].index,damage,enemy,0);
		 magic = Resources.Load("effects/Fire", GameObject);
		instance = Instantiate(magic);
		instance.transform.position = ally.body.transform.position;
		instance.transform.position.y+=10;
		enemy.body.GetComponent("EnemyClick").attack =0;	
		yield WaitForSeconds(1);
		counter(enemy,slots[attackThis]);
}
function SpitterAttack(enemy,eslots,slots){
	var options = new Array();
	for(var i = 0;i<slots.length;i++){
		if((slots[i].hor)==enemy.hor || (slots[i].vert)==enemy.vert){
			options.push(slots[i]);
		}
	}
	if(options.length==0){
		return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(options,enemy.defenseType);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,target.evasion,enemy.accuracy);
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);

	waittime=0;
	if(enemy.type=="Spitter" || enemy.type=="Belcher"){
		magic = Resources.Load("effects/Tar", GameObject);
		main.GetComponent("sounds").playSound("spit");
	}
	if(enemy.type=="Rogue" || enemy.type=="Templar"){
		waittime=1.5;
	}
	if(enemy.type=="GreenOoze"){
		magic = Resources.Load("effects/Poison", GameObject);
		main.GetComponent("sounds").playSound("shootFire");
	}
	if(enemy.type=="BrownOoze"){
		magic = Resources.Load("effects/Brown", GameObject);
		main.GetComponent("sounds").playSound("shootFire");
	}
	if(enemy.type=="BlueOoze"){
		magic = Resources.Load("effects/Ice", GameObject);
		enemy.charge-=1;
		enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
		main.GetComponent("sounds").playSound("shootFire");
	}
	if(enemy.type=="RedOoze"){
		magic = Resources.Load("effects/FireMagic", GameObject);
		main.GetComponent("sounds").playSound("shootFire");
		enemy.charge+=1;
		enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
		damage= damage * enemy.charge;
	}
	yield WaitForSeconds(waittime);
	
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);
	yield WaitForSeconds(0.5);
	if(enemy.type=="Rogue" || enemy.type=="Templar"){
		main.GetComponent("sounds").playSound("arrow");
	}
	if(magic){
		instance = Instantiate(magic);
		instance.transform.position = enemy.body.transform.position;
		shootObject(instance,target);
	}
	
	enemy.body.GetComponent("EnemyClick").attack =0;
	
	yield WaitForSeconds(0.5);
	
	if(enemy.type=="Belcher"){
		doAilment(enemy,target,"Enfeebled");
	}
	if(enemy.type=="GreenOoze" || enemy.type=="Rogue"){
		doAilment(enemy,target,"Poison");
	}
	if(enemy.type=="Templar"){
		doAilment(enemy,target,"Silenced");
	}
	if(enemy.type=="BlueOoze"){
		if(!spaceFilled(target.hor,target.vert-1)){
			moveInstant(target,target.hor,target.vert-1);
			main.GetComponent("sounds").playSound("gust");
		}
	}

	counter(enemy,target);
}
function FireAttack(enemy){
	if(!enemy.body || enemy.silenced>0){
			return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;
	enemy.charge-=enemy.maxcharge;
	enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(slots,enemy.defenseType);
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,target.evasion,enemy.accuracy);
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);

	yield WaitForSeconds(0.5);

	main.GetComponent("sounds").playSound("shootFire");
	if(enemy.type=="FireElemental"){
		magic = Resources.Load("effects/FireBall", GameObject);
	}
	if(enemy.type=="Dryad" || enemy.type=="Wisp"){
		magic = Resources.Load("effects/Ice", GameObject);
	}
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	shootObject(instance,target);
	enemy.body.GetComponent("EnemyClick").attack =0;
	yield WaitForSeconds(0.5);
	magic = Resources.Load("effects/Fire", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = target.body.transform.position;
	instance.transform.position.y+=10;
	counter(enemy,target);
}
function LightningAttack(enemy){
	enemy.didAction=true;
	enemy.hasMoved=true;
	enemy.charge-=enemy.maxcharge;
	enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(slots,enemy.defenseType);
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,target.evasion,enemy.accuracy);
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);

	yield WaitForSeconds(0.5);

	main.GetComponent("sounds").playSound("explosion");
	magic = Resources.Load("effects/Lightning", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = target.body.transform.position;
	instance.transform.position.y+=50;
	enemy.body.GetComponent("EnemyClick").attack =0;
	yield WaitForSeconds(0.5);
	Destroy(instance);
	counter(enemy,target);
}
function BlueOozeAttack(enemy){
	var options = new Array();
	for(var i = 0;i<slots.length;i++){
		if((slots[i].hor)==enemy.hor || (slots[i].vert)==enemy.vert){
			options.push(slots[i]);
		}
	}
	if(options.length==0){
		return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(options,enemy.defenseType);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,target.evasion,enemy.accuracy);
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);

	yield WaitForSeconds(0.5);
	if(enemy.type=="Spitter"){
		magic = Resources.Load("effects/Tar", GameObject);
		main.GetComponent("sounds").playSound("spit");
	}
	if(enemy.type=="GreenOoze"){
		magic = Resources.Load("effects/Poison", GameObject);
		main.GetComponent("sounds").playSound("shootFire");
	}
	if(enemy.type=="BrownOoze"){
		magic = Resources.Load("effects/Brown", GameObject);
		main.GetComponent("sounds").playSound("shootFire");
	}
	
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	shootObject(instance,target);
	enemy.body.GetComponent("EnemyClick").attack =0;
	
	yield WaitForSeconds(0.5);
	
	if(enemy.type=="Spitter"){
		doAilment(enemy,target,"Enfeebled");
	}
	if(enemy.type=="GreenOoze"){
		doAilment(enemy,target,"Poison");
	}

	counter(enemy,target);
}
function NecromancerAttack(enemy){
	if(enemy.didAction || enemy.silenced>0 || eslots.length>=5){
		return;
	}
	var curhor;
	var curvert;
	if(!spaceFilled(enemy.hor,enemy.vert-1)){
		curhor = enemy.hor;
		curvert = enemy.vert-1;
	} else if(!spaceFilled(enemy.hor+1,enemy.vert)){
		curhor = enemy.hor+1;
		curvert = enemy.vert;
	} else if(!spaceFilled(enemy.hor-1,enemy.vert)){
		curhor = enemy.hor-1;
		curvert = enemy.vert;
	}else if(!spaceFilled(enemy.hor,enemy.vert+1)){
		curhor = enemy.hor;
		curvert = enemy.vert+1;
	}
		enemy.charge-=1;
		enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
		enemy.hasMoved=true;
		summon(enemy,curhor,curvert,"Zombie");	
}
function WaterwraithAttack(enemy,eslots,slots){
	enemy.charge-=enemy.maxcharge;
	enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
	enemy.didAction=true;
	enemy.hasMoved=true;
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",1);

	magic = Resources.Load("effects/Waves", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	instance.transform.position.x+=150;
	instance.transform.position.y+=20;

		var startPosition = instance.transform.position;
		var endPosition = new Vector3(instance.transform.position.x-400,instance.transform.position.y,instance.transform.position.z + 100);
		
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.006;
			 instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 Destroy(instance);
	
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",0);
	for(var i = 0;i<slots.length;i++){
		var damage = enemy.secondaryAttack-main.GetComponent("combat").getdefense(slots[i],"resistance");
		enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,slots[i].evasion,enemy.accuracy);
		main.GetComponent("combat").damageAlly(slots[i].index,damage,enemy,1);
	}
}

function SpiderAttack(enemy){
	var options = new Array();
	for(var i = 0;i<slots.length;i++){
		if((slots[i].hor)==enemy.hor){
			options.push(slots[i]);
		}
	}
	if(options.length==0){
		return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = lowestDefense(options,enemy.defenseType);
	enemy.enemyHit = main.GetComponent("combat").hitResult(enemy,target.evasion,enemy.accuracy);
	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	if(enemy.type=="Spider"){
		enemy.body.GetComponent("EnemyClick").attack =1;
	}
	
			var newlength;
			var moveToHor;
			var moveToVert;

			ropeEffect = Resources.Load("effects/Rope", GameObject);
			rope = Instantiate(ropeEffect);
			rope.transform.position = enemy.body.transform.position;
			if(enemy.type=="Vacuum"){
				rope.SetActive(false);
			}

			if(target.hor == enemy.hor){
				if(target.vert>enemy.vert){
					//enemy on top
					newlength= target.body.transform.position.z-enemy.body.transform.position.z;
					if(main.GetComponent("combat").spaceEmpty(enemy.hor,enemy.vert+1,slots,eslots)){
						moveToHor=enemy.hor;
						moveToVert=enemy.vert+1;
					}
				}else{
					newlength= enemy.body.transform.position.z-target.body.transform.position.z;
					if(main.GetComponent("combat").spaceEmpty(enemy.hor,enemy.vert-1,slots,eslots)){
						moveToHor=enemy.hor;
						moveToVert=enemy.vert-1;
						}
				}
			}else{
				rope.transform.rotation.eulerAngles.y=rope.transform.rotation.eulerAngles.y+90;
				if(enemy.hor>enemy.hor){
					//enemy on left
					newlength= target.body.transform.position.x-enemy.body.transform.position.x;
					if(main.GetComponent("combat").spaceEmpty(enemy.hor+1,enemy.vert,slots,eslots)){
						moveToHor=enemy.hor+1;
						moveToVert=enemy.vert;
					}
				}else{
				newlength= enemy.body.transform.position.x-target.body.transform.position.x;
					if(main.GetComponent("combat").spaceEmpty(enemy.hor-1,enemy.vert,slots,eslots)){
						moveToHor=enemy.hor-1;
						moveToVert=enemy.vert;
						}
				}
			}
	
			var ropePos = rope.transform.position;
			var ropeLength = rope.transform.localScale;
			var newPosition =Vector3((target.body.transform.position.x+enemy.body.transform.position.x)/2,enemy.body.transform.position.y+5,(target.body.transform.position.z+enemy.body.transform.position.z)/2);
			var newRopeLength = new Vector3(ropeLength.x,newlength/2,ropeLength.z);
			var t = 0.0;
			 while (t < 1.0)
			 {
				 t += 0.05;
				 rope.transform.localScale = Vector3.Lerp(ropeLength,newRopeLength,t);
				 rope.transform.position = Vector3.Lerp(ropePos,newPosition,t);
				 yield;
			 }
			enemy.didAction=true;
			main.GetComponent("sounds").playSound("rope");
			//if(hit){
				moveInstant(target,moveToHor,moveToVert);
			//}
			 t=0.0;
			 while (t < 1.0)
			 {
				 t += 0.05;
				 rope.transform.localScale = Vector3.Lerp(newRopeLength,ropeLength,t);
				 rope.transform.position = Vector3.Lerp(newPosition,ropePos,t);
				 yield;
			 }
			 Destroy(rope);
			 if(enemy.type=="Vacuum"){
				closeAttack(enemy,eslots,slots);
			 }
			 

	if(enemy.type=="Spider"){
		doAilment(enemy,target,"Poison");
		enemy.body.GetComponent("EnemyClick").attack =0;
	}
		

	counter(enemy,target);
}
function Healer(enemy){
	if(!enemy.body || enemy.silenced>0){
			return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;
	enemy.charge-=enemy.maxcharge;
	enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();

	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	var target = eslots[0];
	for(var i = 0;i<eslots.length;i++){
		var diffold=target.maxhealth-target.health;
		var diffnew=eslots[i].maxhealth-eslots[i].health;
		if(diffold<diffnew){
			target=eslots[i];
		}
	}
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.body.GetComponent("EnemyClick").attack =1;

	yield WaitForSeconds(0.5);

	main.GetComponent("sounds").playSound("heal");
	heal(target,50);
	magic = Resources.Load("effects/Charge", GameObject);

	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	shootObject(instance,target);
	enemy.body.GetComponent("EnemyClick").attack =0;
}
function GuardAction(enemy){
	if(!enemy.body){
			return;
	}
	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}

	var target = null;
	for(var i = 0;i<eslots.length;i++){
		if(eslots[i].protectedBy==-1 && eslots[i]!=enemy){
			target=eslots[i];
		}
	}
	if(target==null){
		return;
	}
	enemy.didAction=true;
	enemy.hasMoved=true;
	lookAt(enemy,target);

	yield WaitForSeconds(waittime);
	lookAt(enemy,target);
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",1);

	yield WaitForSeconds(0.5);

	target.protectedBy=enemy.index;
	main.GetComponent("combat").wordPopup(target,"Protected");
	main.GetComponent("sounds").playSound("protect");
	magic = Resources.Load("effects/Shield", GameObject);
	instance2 = Instantiate(magic);
	instance2.transform.position = target.body.transform.position;
	instance2.transform.position.y+=5;
	instance2.transform.position.z+=1;
	instance2.transform.SetParent(target.body.transform);
	if(enemy.shield1){
		enemy.shield2=instance2;
	}else{
		enemy.shield1=instance2;
	}
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",0);
}
function CannonAttack(enemy){
	for(i = 0;i<slots.length;i++){
		main.GetComponent("combat").damageAlly(slots[i].index,slots[i].health,"None",0);
	}
	var explosion = Resources.Load("effects/Explode", GameObject);
	var instance = Instantiate(explosion);
	instance.transform.position = enemy.body.transform.position;
	main.GetComponent("sounds").playSound("explosion");
}

//moves
function aggressiveMove(enemy){
	//move enemies
	
		//move up
		var x;
		var y;
		var spacevert = enemy.vert;
		var spacehor = enemy.hor;
		if(allAbove(enemy.vert)){
			if(spaceFilled(enemy.hor,enemy.vert+1)==false && enemy.hasMoved==false){
				enemy.vert+=1;
				x =enemy.hor;
				y =enemy.vert;
				enemy.body.GetComponent("EnemyClick").moveTo(spaces[y][x]);
			}
		}
	
		//move sideways
		var target = isClose(enemy.hor,enemy.vert);
		if(target!=-1){
			if(slots[target].hor >enemy.hor){
				//go right
				if(spaceFilled(enemy.hor+1,enemy.vert)==false && enemy.hasMoved==false){
					enemy.hor+=1;
					x =enemy.hor;
					y =enemy.vert;
					enemy.body.GetComponent("EnemyClick").moveTo(spaces[y][x]);
				}
			}else{
				//go left
				if(spaceFilled(enemy.hor-1,enemy.vert)==false && enemy.hasMoved==false){
					enemy.hor-=1;
					x =enemy.hor;
					y =enemy.vert;
					enemy.body.GetComponent("EnemyClick").moveTo(spaces[y][x]);
				}
			}
		}
			//move down
			if(spaceFilled(enemy.hor,enemy.vert-1)==false && enemy.hasMoved==false){
				enemy.vert-=1;
				x =enemy.hor;
				y =enemy.vert;
				enemy.body.GetComponent("EnemyClick").moveTo(spaces[y][x]);
			}
			checkPhase(y,x,spacevert,spacehor);
}
function flyMove(enemy){
	var options = new Array();
	var lure="";
	for(var i = 0;i<slots.length;i++){
		if(slots[i].invisible){
			continue;
		}
		if(!spaceFilled(slots[i].hor,slots[i].vert-1) || !spaceFilled(slots[i].hor,slots[i].vert+1) || !spaceFilled(slots[i].hor-1,slots[i].vert) || !spaceFilled(slots[i].hor+1,slots[i].vert)){
			if(slots[i].addedAbility=="Lure Flying"){
				lure = slots[i];
			}
			options.push(slots[i]);
		}
	}
	var target = lowestDefense(options,"defense");
	if(target == null){
		return;
	}
	if(lure!=""){
		target=lure;
	}
	if(!spaceFilled(target.hor,target.vert-1) && !spaceInvisible(target.hor,target.vert-1)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert-1][target.hor]);
		enemy.vert = target.vert-1;
		enemy.hor = target.hor;
	}
	if(!spaceFilled(target.hor,target.vert+1) && !spaceInvisible(target.hor,target.vert+1)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert+1][target.hor]);
		enemy.vert = target.vert+1;
		enemy.hor = target.hor;
	}
	if(!spaceFilled(target.hor-1,target.vert) && !spaceInvisible(target.hor-1,target.vert)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert][target.hor-1]);
		enemy.vert = target.vert;
		enemy.hor = target.hor-1;
	}
	if(!spaceFilled(target.hor+1,target.vert) && !spaceInvisible(target.hor +1,target.vert)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert][target.hor+1]);
		enemy.vert = target.vert;
		enemy.hor = target.hor+1;
	}
}
function scrollMove(enemy){
	if(enemy.didAction){
		return;
	}
	var options = new Array();
	var moveHor=enemy.hor;
	for(var i = 0;i<slots.length;i++){
		if((slots[i].hor+1)==enemy.hor || (slots[i].hor-1)==enemy.hor){
			options.push(slots[i]);
		}
	}
	if(options.length>0){
		var target = lowestDefense(options, enemy.defenseType);
		moveHor=target.hor;
	}
	if(options.length==0){
		target= lowestDefense(slots, enemy.defenseType);
		if(target.hor>enemy.hor){
			moveHor=enemy.hor+1;
		}else{
			moveHor=enemy.hor-1;
		}
	}
	
	if(!spaceFilled(target.hor,enemy.vert)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[enemy.vert][moveHor]);
	}
}
function afraidMove(enemy){
	//move up
	if(!spaceFilled(enemy.hor,enemy.vert+1)){
		var goUp = false;
		for(var i =0;i<slots.length;i++){
			if(slots[i].hor == enemy.hor){
				if((slots[i].vert+1) == enemy.vert || (slots[i].vert+2) == enemy.vert){
					goUp=true;
				}
			}
			if(slots[i].vert == enemy.vert){
				if((slots[i].hor-1) == enemy.hor || (slots[i].hor-2) == enemy.hor || (slots[i].hor+1) == enemy.hor || (slots[i].hor+2) == enemy.hor){
					goUp=true;
				}
			}
				if(((slots[i].hor-1) == enemy.hor && (slots[i].vert+1) == enemy.vert) || ((slots[i].hor+1) == enemy.hor && (slots[i].vert+1) == enemy.vert)){
					goUp=true;
				}
		}
		if(goUp){
			enemy.body.GetComponent("EnemyClick").moveTo(spaces[enemy.vert+1][enemy.hor]);
			return;
		}
	}
	//move left
	if(!spaceFilled(enemy.hor-1,enemy.vert)){
		var goLeft = false;
		for(i =0;i<slots.length;i++){
			if(slots[i].hor == enemy.hor){
				if((slots[i].vert+1) == enemy.vert || (slots[i].vert+2) == enemy.vert || (slots[i].vert-1) == enemy.vert || (slots[i].vert-2) == enemy.vert){
					goLeft=true;
				}
			}
			if(slots[i].vert == enemy.vert){
				if((slots[i].hor-1) == enemy.hor || (slots[i].hor-2) == enemy.hor){
					goLeft=true;
				}
			}
			if(((slots[i].hor-1) == enemy.hor && (slots[i].vert+1) == enemy.vert) || ((slots[i].hor-1) == enemy.hor && (slots[i].vert-1) == enemy.vert)){
				goLeft=true;
			}
		}
		if(goLeft){
			enemy.body.GetComponent("EnemyClick").moveTo(spaces[enemy.vert][enemy.hor-1]);
			return;
		}
	}
	//move right
	if(!spaceFilled(enemy.hor+1,enemy.vert)){
		var goRight = false;
		for(i =0;i<slots.length;i++){
			if(slots[i].hor == enemy.hor){
				if((slots[i].vert+1) == enemy.vert || (slots[i].vert+2) == enemy.vert || (slots[i].vert-1) == enemy.vert || (slots[i].vert-2) == enemy.vert){
					goRight=true;
				}
			}
			if(slots[i].vert == enemy.vert){
				if((slots[i].hor+1) == enemy.hor || (slots[i].hor+2) == enemy.hor){
					goRight=true;
				}
			}
			if(((slots[i].hor+1) == enemy.hor && (slots[i].vert+1) == enemy.vert) || ((slots[i].hor+1) == enemy.hor && (slots[i].vert-1) == enemy.vert)){
				goRight=true;
			}
		}
		if(goRight){
			enemy.body.GetComponent("EnemyClick").moveTo(spaces[enemy.vert][enemy.hor+1]);
			return;
		}
	}
	//move bottom
	if(!spaceFilled(enemy.hor,enemy.vert+1)){
	
	}
}
function randomMove(enemy){
	var keepgoing=true;
	var space;
	while(keepgoing){
			var i = Random.Range(0,4);
			var j = Random.Range(0,4);
			if(!spaceFilled(j,i)){
				keepgoing=false;
				enemy.body.GetComponent("EnemyClick").moveTo(spaces[i][j]);
			}
	}
}
function passing(enemy){
	if(enemy.vert>0){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[enemy.vert-1][enemy.hor]);
		for(var i =0;i<slots.length;i++){
			if(enemy.vert == slots[i].vert && enemy.hor == slots[i].hor){
				slots[i].vert+=1;
				slots[i].body.GetComponent("AllyClick").moveTo(spaces[slots[i].vert][slots[i].hor]);
			}
		}
	}else{
		Destroy(enemy.body);
		var group = enemy.group;
		for (var j =0;j<eslots.length;j++){
			if(eslots[j].index==enemy.index){
				eslots.splice(j,1);
			}
		}
		enemy.alive=false;
		main.GetComponent("Main").quickMessage("The Deer Escaped.");
		if(eslots.length==0){
			main.GetComponent("combat").winBattle(group);
		}
	}
}


//other stuff
function counter(enemy,ally){
	
	if(ally.actionsActive["Counter"] && ally.masterPotion){
		if(enemy.hor == ally.hor){
			if((enemy.vert==ally.vert+1)||(enemy.vert==ally.vert-1)){
				main.GetComponent("combat").swordattack(ally, enemy);
				ally.didAction=false;
			}
		}
		if(enemy.vert == ally.vert){
			if((enemy.hor==ally.vert+1)||(enemy.vert==ally.hor-1)){
				main.GetComponent("combat").swordattack(ally, enemy);
				ally.didAction=false;
			}
		}
	}
	if(enemy.enemyHit=="Miss"){
		if(enemy.hor == ally.hor){
			if((enemy.vert==ally.vert+1)||(enemy.vert==ally.vert-1)){
			 if(ally.actionsActive["Bulk"]){
				enemy.enfeebled=2;
				main.GetComponent("combat").showAilment("Enfeebled", enemy);
				main.GetComponent("combat").wordPopup(enemy,"Enfeebled");
			 }
			 if(ally.actionsActive["Off Balance"]){
				enemy.sleep=2;
				main.GetComponent("combat").showAilment("Sleep", enemy);
				main.GetComponent("combat").wordPopup(enemy,"Sleep");
			 }
			 if(ally.actionsActive["Respond"]){
				main.GetComponent("combat").swordattack(ally, enemy);
				ally.didAction=false;
			 }
			}
		}
		if(enemy.vert == ally.vert){
			if((enemy.hor==ally.hor+1)||(enemy.hor==ally.hor-1)){
					 if(ally.actionsActive["Bulk"]){
						enemy.enfeebled=2;
						main.GetComponent("combat").showAilment("Enfeebled", enemy);
						main.GetComponent("combat").wordPopup(enemy,"Enfeebled");
					 }
					 if(ally.actionsActive["Off Balance"]){
						enemy.sleep=2;
						main.GetComponent("combat").showAilment("Sleep", enemy);
						main.GetComponent("combat").wordPopup(enemy,"Sleep");
					 }
					 if(ally.actionsActive["Respond"]){
						main.GetComponent("combat").swordattack(ally, enemy);
						ally.didAction=false;
					 }
			}
		}
	}
}
function move(body,x,z){
	body.GetComponent("EnemyClick").Run =1;
	var startPosition = body.transform.position;
	var enemyindex = body.GetComponent("EnemyClick").eindex;
	var enemy = main.GetComponent("Main").Eunits[enemyindex];
	var endPosition = Vector3(body.transform.position.x + x,enemy.height, body.transform.position.z + z);
	var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.1;
			 body.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
	body.GetComponent("EnemyClick").Run =0;
 }
 function moveInstant(ally,hor,vert){
	if(vert==null){
		return;
	}
	ally.vert = vert;
	ally.hor = hor;
	var space = spaces[vert][hor];
	
	//move active
		var startPosition = ally.body.transform.position;
		var endPosition = new Vector3(space.transform.position.x,ally.body.transform.position.y,space.transform.position.z);
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.05;
			 ally.body.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
 }

 function lookAt(enemy,ally){
	var body = enemy.body;
	var abody = ally.body;
	enemybody = body.transform.position;
	allybody= abody.transform.position;
	var _direction = (allybody - enemybody).normalized;
	var _lookRotation = Quaternion.LookRotation(_direction);
	body.transform.rotation=_lookRotation;
 }
 function isAdjacent(hor,vert,slots){
	var target = -1;
	for(var j = 0;j<slots.length;j++){

			if(((slots[j].vert + 1) ==vert && slots[j].hor == hor) || ((slots[j].vert-1) ==vert && slots[j].hor == hor) || (slots[j].vert ==vert && (slots[j].hor+1) == hor) || (slots[j].vert ==vert && (slots[j].hor-1) == hor)){
				if(slots[j].invisible==false){
					target = j;
				}
			}
		}

	return target;
}
function isTwoAway(hor,vert,slots){
	var target = -1;
	for(var j = 0;j<slots.length;j++){
			if(slots[j].invisible){
				continue;
			}
			if(((slots[j].vert + 1) ==vert && slots[j].hor == hor) || ((slots[j].vert-1) ==vert && slots[j].hor == hor) || (slots[j].vert ==vert && (slots[j].hor+1) == hor) || (slots[j].vert ==vert && (slots[j].hor-1) == hor)){
				target = j;
			}
			if(((slots[j].vert + 2) ==vert && slots[j].hor == hor) || ((slots[j].vert-2) ==vert && slots[j].hor == hor) || (slots[j].vert ==vert && (slots[j].hor+2) == hor) || (slots[j].vert ==vert && (slots[j].hor-2) == hor)){
				target = j;
			}

		}

	return target;
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
function charge(enemy){
	if(enemy.didAction || !enemy.body){
		return;
	}
	enemy.didAction=true;
	yield WaitForSeconds(0.1);
	var waittime=0;
	if(enemy.body.GetComponent("EnemyClick").Run>0){
		waittime=1;
	}
	yield WaitForSeconds(waittime);
	
	enemy.charge+=1;
	if(enemy.moveType!="None"){
		enemy.body.GetComponent("EnemyClick").animator.SetInteger("Run",0);
	}
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",1);
	magic = Resources.Load("effects/Charge", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	instance.transform.position.y+=5;
	yield WaitForSeconds(1);
	enemy.body.GetComponent("EnemyClick").animator.SetInteger("special",0);
	enemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=enemy.charge.ToString();
}
function lowestDefense(options,type){
	if(options.length==0){
		return null;
	}
	var option = options[0];
	if(option.invisible){
		if(options.length==1){
			return null;
		}else{
			option = options[1];
		}
	}
	if(type=="defense"){
		for(var j = 1;j<options.length;j++){
			if(options[j].defense<option.defense && options[j].invisible==false){
				option= options[j];
			}
		}
	}else{
		for(var k = 1;k<options.length;k++){
			if(options[k].resistance<option.resistance && options[k].invisible==false){
				option= options[k];
			}
		}
	}
	
	return option;
}
function turnVisible(ally){
	
	if(ally.type=="Thief"){
			if(ally.actionsActive["Invisible"] && ally.invisible==false){
				yield WaitForSeconds(3);
				ally.invisible=true;
				ally.body.GetComponent("Thief").turnInvisible();
				main.GetComponent("combat").wordPopup(ally,"Invisible");
			}
		}
}
function checkPhase(vert,hor,spacevert,spacehor){
	
		for(var i =0;i<slots.length;i++){
			if(slots[i].invisible){
				if(slots[i].hor==hor && slots[i].vert==vert){
					slots[i].vert = spacevert;
					slots[i].hor = spacehor;
					slots[i].body.GetComponent("AllyClick").moveTo(spaces[spacevert][spacehor]);
				}
			}
		}
}
function spaceFilled(hor,vert){
	if(hor>4 || hor<0 || vert>4 || vert<0){
		return true;
	}
	for(var i = 0;i<eslots.length;i++){
		if(eslots[i].vert ==vert && eslots[i].hor == hor){
			return true;
		}
	}
	for(var j = 0;j<slots.length;j++){
		if(slots[j].vert ==vert && slots[j].hor == hor && slots[j].invisible==false){
			return true;
		}
	}
	return false;
}
function spaceInvisible(hor,vert){
	for(var i=0;i<slots.length;i++){
		if(slots[i].invisible && slots[i].hor == hor && slots[i].vert==vert){
			return true;
		}
	}
	return false;
}
function isClose(hor, vert){
	var distance = 100;
	var target=-1;
	for(var j = 0;j<slots.length;j++){
		if(slots[j].invisible==true){
			continue;
		}
		if(slots[j].vert ==(vert + 1) || slots[j].vert ==(vert - 1) || slots[j].vert ==vert){
			testdistance= slots[j].hor-hor;
			if(testdistance<0){
				testdistance = distance*-1;
			}
			if(testdistance<distance){
				distance=testdistance;
				target = j;
			}
		}
	}
	return target;
}
function allAbove(vert){
	var allAbove = true;
	for(var j = 0;j<slots.length;j++){
			if(slots[j].vert <vert){
				allAbove=false;
			}
		}
	return allAbove;
}
function setInfo(slotsMain,eslotsMain,location,curexperience){
	slots=[];
	eslots = [];
	spaces=[];
	slots = slotsMain;
	eslots = eslotsMain;
	spaces = location.GetComponent("locations").allspaces;
	experience=curexperience;
}
function shootObject(instance,target){
		var startPosition = instance.transform.position;
		var endPosition = new Vector3(target.body.transform.position.x,target.body.transform.position.y,target.body.transform.position.z);
		
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.04;
			 instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 Destroy(instance);
 }

 function doAilment(enemy, target,type){
	if(enemy.enemyHit=="Miss"){
		return;
	}
	if(target.actionsActive["Immunity"]){
		main.GetComponent("combat").wordPopup(target,"Immune");
		return;
	}
	showAilment(type,target);
 	 if(type=="Enfeebled"){
	 	 target.enfeebled=2;
	 }
	 if(type=="Sleep"){
	 	 target.sleep=1;
		 target.ailmentBody["Sleep"].transform.position.y+=5;
		 target.ailmentBody["Sleep"].transform.position.x+=3;
		 target.ailmentBody["Sleep"].transform.position.z+=2;
	 }
	 if(type=="Blind"){
	 	 target.blind=2;
	 }
	 if(type=="Silenced"){
		target.ailmentBody["Silenced"].transform.position.y+=5;
	 	 target.silenced=2;
	 }
	 if(type=="Poison"){
	 	 target.poison=3;
	 }
	 if(type=="Immobolized"){
	 	 target.immobolized=2;
		 target.ailmentBody["Immobolized"].transform.position.y-=5;
	 }
	 main.GetComponent("combat").wordPopup(target,type);
	 main.GetComponent("sounds").playSound("poison");
 }

 function showAilment(type, unit){
		if(unit.ailmentBody[type]){
			return;
		}
		ailment = Resources.Load("ailments/" + type, GameObject);
		var instance = Instantiate(ailment);
		instance.transform.position = unit.body.transform.position;
		instance.transform.position.y+=5;
		instance.transform.SetParent(unit.body.transform, true);
		unit.ailmentBody[type]=instance;
 }

 function heal(enemy,amount){
	if(enemy.poison>0){
		main.GetComponent("combat").wordPopup(enemy, "Heal Prevented");
		return;
	}
	enemy.health+=amount;
	if(enemy.health>enemy.maxhealth){
		enemy.health=enemy.maxhealth;
	}
	

	var healthbar = enemy.body.GetComponent("EnemyClick").healthbar;
	var health = enemy.health + 0.0f;
	var maxhealth = enemy.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);
	var damage = amount.ToString();
	popupText = Resources.Load("Prefabs/HealText", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.position = enemy.body.transform.position;
	instance.transform.position.y+=10;
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;
	yield WaitForSeconds(1);
	Destroy(instance);
}
function summon(enemy,hor,vert,type){
	var space = main.GetComponent("Main").Egroups[enemy.group].location.GetComponent("locations").allspaces[vert][hor];
	enemy.body.GetComponent("EnemyClick").attack =1;
	enemy.didAction=true;
	magic = Resources.Load("effects/Summon", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = space.transform.position;
	instance.transform.position.y+=10;
	yield WaitForSeconds(1);
	enemy.body.GetComponent("EnemyClick").attack =0;
	main.GetComponent("Main").createEUnit(type);
	EindexNum=main.GetComponent("Main").EindexNum;
	main.GetComponent("Main").Eunits[EindexNum-1].group = enemy.group;
	unit = Instantiate(Resources.Load("enemy3D/" + type, GameObject));
	
	unit.transform.position=space.transform.position;
	unit.transform.position.y=main.GetComponent("Main").Eunits[EindexNum-1].height;
	
	unit.transform.SetParent(main.GetComponent("Main").Terrain.transform,false);
	unit.GetComponent("EnemyClick").eindex = EindexNum-1;
	main.GetComponent("Main").Eunits[EindexNum-1].body = unit;
	main.GetComponent("Main").Eunits[EindexNum-1].hor = hor;
	main.GetComponent("Main").Eunits[EindexNum-1].vert = vert;
	eslots.push(main.GetComponent("Main").Eunits[EindexNum-1]);

	yield WaitForSeconds(2);
	Destroy(instance);
}

function returnUnits(){
	yield WaitForSeconds(3);
	var spaces = GetComponent("pass").spaces;
 	 for(var i=0;i<eslots.length;i++){
		var x =eslots[i].hor;
		var y =eslots[i].vert;
	 	 eslots[i].body.transform.position = spaces[y][x].transform.position;
	 }
 }
