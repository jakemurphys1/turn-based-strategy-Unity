var main: GameObject;
var eslots = new Array();
var slots = new Array();
var spaces = new Array();
var experience: int;
var curDisabled=false;
var self:GameObject;

function enemyturn(){
	DisablePass();
	//reset allies
	for(var i =0;i<slots.length;i++){
		slots[i].hasMoved=false;
		slots[i].didAction=false;
		if(slots[i].type=="Knight"){
			slots[i].energy+=20;
			if(slots[i].energy>100){
				slots[i].energy=100;
			}
			main.GetComponent("combat").setEnergyBar(slots[i]);
		}
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
			main.GetComponent("combat").damageEnemy(eslots[p],pDamage);
		}
	}

	
	//enemy attack
	enemyAttack();
	
	enemyMove();
	
	
	//enemy attack2
	enemyAttack();

	//reduce ailments
	for(var k =0;k<eslots.length;k++){
		if(eslots[k].immobolized>0){
			eslots[k].immobolized-=1;
		}
		if(eslots[k].sleep>0){
			eslots[k].sleep-=1;
		}
		if(eslots[k].enfeebled>0){
			eslots[k].enfeebled-=1;
		}
		if(eslots[k].blind>0){
			eslots[k].blind-=1;
		}
		if(eslots[k].silenced>0){
			eslots[k].silenced-=1;
		}
		if(eslots[k].poison>0){
			eslots[k].poison-=1;
		}
	}
	for(var q =0;q<slots.length;q++){
		turnVisible(slots[q]);
		if(slots[q].immobolized>0){
			slots[q].immobolized-=1;
		}
		if(slots[q].sleep>0){
			slots[q].sleep-=1;
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
			slots[q].poison-=1;
		}
	}
	
	
}

function DisablePass(){
	self.GetComponent("Button").enabled=false;
	yield WaitForSeconds(2);
	self.GetComponent("Button").enabled=true;
}


function enemyMove(){
	for(var j =0;j<eslots.length;j++){
		if(eslots[j].immobolized>0){
			eslots[j].immobolized-=1;
			continue;
		}
		if(eslots[j].sleep>0){
			eslots[j].sleep-=1;
			continue;
		}
		if(eslots[j].hasMoved || eslots[j].didAction){
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
	}
}
function enemyAttack(){
	for(var n =0;n<eslots.length;n++){
		if(eslots[n].didAction==false){
			if(eslots[n].sleep>0 || eslots[n].didAction){
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
			if(eslots[n].charge>-1){
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
		}
	}
}



//Attacks
function closeAttack(enemy,eslots,slots){
		if(enemy.blind>0 || enemy.sleep>0){
			enemy.didAction=true;
			return;
		}
		var waittime=0;
		if(enemy.body.GetComponent("EnemyClick").Run>0){
			waittime=1;
		}
		var reverseX=0;
		var reverseY = 0;
		var attackThis = isAdjacent(enemy.hor,enemy.vert,slots);
		if(attackThis!=-1){
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
			enemy.body.GetComponent("EnemyClick").attack =1;
			var damage = enemy.attack-main.GetComponent("combat").getdefense(slots[attackThis],"defense");
			main.GetComponent("combat").damageAlly(slots[attackThis].index,damage,enemy,1);
			yield WaitForSeconds(1);
			enemy.body.GetComponent("EnemyClick").attack =0;
			main.GetComponent("sounds").playSound("hit");
			yield WaitForSeconds(0.5);
			
			move(enemy.body,reverseX,reverseY);
			counter(enemy,slots[attackThis]);
		}
}
function IceAttack(enemy,eslots,slots){
	var attackThis = isTwoAway(enemy.hor,enemy.vert,slots);

	if(enemy.silenced>0 || enemy.sleep>0){
			enemy.didAction=true;
			return;
		}
	
	if(enemy.charge<2 || attackThis==-1){
		charge(enemy);
	} else{
	var ally = slots[attackThis];
	enemy.didAction=true;
	enemy.hasMoved=true;
		enemy.charge-=2;
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
		 main.GetComponent("combat").damageAlly(slots[attackThis].index,10,enemy,0);
		 item.SetActive(false);
		 item.transform.position=startPosition;
		
		enemy.body.GetComponent("EnemyClick").attack =0;
		
		
	}
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
		doAilment(target,"Enfeebled");
	}
	if(enemy.type=="GreenOoze"){
		doAilment(target,"Poison");
	}

	counter(enemy,target);
}
function FireAttack(enemy){
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
	enemy.body.GetComponent("EnemyClick").attack =1;
	var damage = enemy.attack-main.GetComponent("combat").getdefense(target,enemy.defenseType);
	main.GetComponent("combat").damageAlly(target.index,damage,enemy,1);

	yield WaitForSeconds(0.5);

	main.GetComponent("sounds").playSound("shootFire");
	magic = Resources.Load("effects/FireBall", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	shootObject(instance,target);
	enemy.body.GetComponent("EnemyClick").attack =0;
	yield WaitForSeconds(0.5);
	magic = Resources.Load("effects/Fire", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = target.body.transform.position;
	instance.transform.position.y+=10;
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
	for(var i = 0;i<slots.length;i++){
		if(!spaceFilled(slots[i].hor,slots[i].vert-1) || !spaceFilled(slots[i].hor,slots[i].vert+1) || !spaceFilled(slots[i].hor-1,slots[i].vert) || !spaceFilled(slots[i].hor+1,slots[i].vert)){
			options.push(slots[i]);
		}
	}
	var target = lowestDefense(options,"defense");
	if(!spaceFilled(target.hor,target.vert-1)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert-1][target.hor]);
		enemy.vert = target.vert-1;
		enemy.hor = target.hor;
	}
	if(!spaceFilled(target.hor,target.vert+1)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert+1][target.hor]);
		enemy.vert = target.vert+1;
		enemy.hor = target.hor;
	}
	if(!spaceFilled(target.hor-1,target.vert)){
		enemy.body.GetComponent("EnemyClick").moveTo(spaces[target.vert][target.hor-1]);
		enemy.vert = target.vert;
		enemy.hor = target.hor-1;
	}
	if(!spaceFilled(target.hor+1,target.vert)){
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



//other stuff
function counter(enemy,ally){
	if(ally.actionsActive["Counter"]){
		if(enemy.hor == ally.hor){
			if((enemy.vert==ally.vert+1)||(enemy.vert==ally.vert-1)){
				main.GetComponent("combat").swordattack(ally, enemy);
			}
		}
		if(enemy.vert == ally.vert){
			if((enemy.hor==ally.vert+1)||(enemy.vert==ally.hor-1)){
				main.GetComponent("combat").swordattack(ally, enemy);
			}
		}
	}
}
function move(body,x,z){
	body.GetComponent("EnemyClick").Run =1;
	var startPosition = body.transform.position;
	var endPosition = Vector3(body.transform.position.x + x,1, body.transform.position.z + z);
	var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.1;
			 body.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
	body.GetComponent("EnemyClick").Run =0;
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
function charge(enemy){
	enemy.didAction=true;
	enemy.charge+=1;
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
		return;
	}
	var option = options[0];
	if(type=="defense"){
		for(var j = 1;j<options.length;j++){
			if(options[j].defense<option.defense){
				option= options[j];
			}
		}
	}else{
		for(var k = 1;k<options.length;k++){
			if(options[k].defense<option.resistance){
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

 function doAilment(target,type){
 	 if(type=="Enfeebled"){
	 	 target.enfeebled+=2;
	 }
	 if(type=="Sleep"){
	 	 target.sleep+=1;
	 }
	 if(type=="Blind"){
	 	 target.blind+=2;
	 }
	 if(type=="Silenced"){
	 	 target.silenced+=2;
	 }
	 if(type=="Poison"){
	 	 target.poison+=3;
	 }
	 if(type=="Immobolized"){
	 	 target.Immobolized+=2;
	 }
	 main.GetComponent("combat").wordPopup(target,type);
	 main.GetComponent("sounds").playSound("poison");
 }
