 var pass: GameObject;
 var victoryScreen: GameObject;
 var menu:GameObject;
 var usedAction:boolean=false;
 var nulllocation:GameObject;
 
 function damageEnemy(enemy,amount,element){
	amount=amount*enemy.elemental[element];

	if(hit=="Miss"){
		wordPopup(enemy,"Miss");
		return;
	}
	if(hit=="Near-Miss"){
		wordPopup(enemy,"Near-Miss");
		amount=amount/2;
	}

	if(enemy.phasedout){
		if(element!="None"){
			enemy.phasedout=false;
			enemy.body.GetComponent("Thief").turnVisible();
			wordPopup(enemy,"Phased In!");
		}
		if(enemy.elemental[element]<2){
			amount=0;
		}	
	}
	if(enemy.elemental[element]>1){
		wordPopup(enemy,"Effective!");
	}
	if(enemy.elemental[element]<1){
		wordPopup(enemy,"Not Effective!");
	}
	var Eunits = GetComponent("Main").Eunits;
	enemy.body.GetComponent("EnemyClick").hit=1;
	yield WaitForSeconds(0.1);
	enemy.body.GetComponent("EnemyClick").hit=0;
	if(amount<0){
		amount=0;
	}
	enemy.health-=amount;
	if(enemy.health<0){
		enemy.health=0;
	}
	if(enemy.health<1){
		dies("Enemy",enemy.body);
	}
	
	var healthbar = enemy.body.GetComponent("EnemyClick").healthbar;
	var health = enemy.health + 0.0f;
	var maxhealth = enemy.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);
	var damage = amount.ToString();

	popupText = Resources.Load("Prefabs/PopupTextParent", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.position = enemy.body.transform.position;
	instance.transform.position.y+=11;
	instance.transform.position.z+=3;
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;

	yield WaitForSeconds(1);
	Destroy(instance);
 }

 function damageAlly(allyNum,amount,enemy,delay){

	var units = GetComponent("Main").units;
	var ally = units[allyNum];
	if(ally.protectedBy!=-1){
		if(units[ally.protectedBy].health>0){
			ally = units[ally.protectedBy];
		}
	}
	yield WaitForSeconds(delay);

	if(enemy.enemyHit=="Miss"){
		wordPopup(ally,"Miss");
		if(ally.actionsActive["Off Balance"]){
			enemy.sleep=2;
			showAilment("Sleep", enemy);
		}
		return;
	}
	if(enemy.enemyHit=="Near-Miss"){
		var slots = pass.GetComponent("pass").slots;
		var enlightenedpresent=false;
		for(var q = 0;q<slots.length;q++){
			if(slots[q].actionsActive["Enlightenment"]){
				enlightenedpresent=true;
			}
		}
		if(enlightenedpresent){
			wordPopup(ally,"Enlightened");
			return;
		}else{
			wordPopup(ally,"Near-Miss");
			amount=amount/2;
		}
	}

	ally.body.GetComponent("AllyClick").hit=1;
	yield WaitForSeconds(0.1);
	ally.body.GetComponent("AllyClick").hit=0;

	//soldier
	if(amount>=ally.health && ally.actionsActive["Steadfast"] && ally.health>1){
		amount=ally.health-1;
		wordPopup(ally,"Steadfast");
	}
	
	if(amount<0){
		amount=0;
	}

	//popupText
	ally.damageCount+=1;
	var damage = amount.ToString();
	popupText = Resources.Load("Prefabs/PopupTextParent", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.position = ally.body.transform.position;
	instance.transform.position.y+=11;
	instance.transform.position.z+=3 + (ally.damageCount*3);
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;

	//shield for Guard
	if(ally.type=="Guard"){
		if(ally.energy>=amount){
			ally.energy-=amount;
			amount=0;
		}else{
			amount-=ally.energy;
			ally.energy=0;
		}
		setEnergyBar(ally);
	}

	ally.health-=amount;
	if(ally.health<0){
		ally.health=0;
	}
	if(ally.health<1){
		dies("Ally",ally.body);
	}
	var healthbar = ally.body.GetComponent("AllyClick").healthbar;
	var health = ally.health + 0.0f;
	var maxhealth = ally.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);

	yield WaitForSeconds(1);
	
	if(enemy){
		enemy.body.GetComponent("EnemyClick").attack =0;
	}

	ally.damageCount-=1;
	Destroy(instance);
 }

 var wordPopupAlter=0;
 function wordPopup(unit, word){
	//yield WaitForSeconds(0.5);
	popupText = Resources.Load("Prefabs/WordText", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.position = unit.body.transform.position;
	instance.transform.position.y+=12-unit.height;
	instance.transform.position.x+=2;
	instance.transform.position.z-=wordPopupAlter+1;
	wordPopupAlter+=2;
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=word;
	instance.transform.SetParent(unit.body.transform, true);
	yield WaitForSeconds(2);
	wordPopupAlter=0;
	Destroy(instance);
 }

 function dies(type, body){
	 if(type == "Ally"){
		var index = body.GetComponent("AllyClick").index;
		var slots = pass.GetComponent("pass").slots;
		GetComponent("Main").units[index].health=0;
		for (var i =0;i<slots.length;i++){
			if(slots[i].index==index){
				pass.GetComponent("pass").slots.splice(i,1);
			}
		}
		if(GetComponent("Main").units[index].type=="Guard"){
			Destroy(GetComponent("Main").units[index].shield1);
			Destroy(GetComponent("Main").units[index].shield2);
		}
		GetComponent("Main").units[index].alive=false;
		body.GetComponent("AllyClick").animator.SetFloat("death",1.0f);
		yield WaitForSeconds(3);
		GetComponent("Main").returnMagic(body,GetComponent("Main").nexus);
		Destroy(body);
		var curGroup = GetComponent("Main").groups[GetComponent("Main").units[index].group];
		GetComponent("Main").units[index].group=-1;
		
		if(pass.GetComponent("pass").slots.length==0){
			loseBattle(curGroup);
		}

	 }else{
		var eindex = body.GetComponent("EnemyClick").eindex;
		var eslots = pass.GetComponent("pass").eslots;
		slots = pass.GetComponent("pass").slots;
		var group = eslots[0].group;
		for (var j =0;j<eslots.length;j++){
			if(eslots[j].index==eindex){
				pass.GetComponent("pass").eslots.splice(j,1);
			}
		}
		GetComponent("Main").Eunits[eindex].alive=false;
		body.GetComponent("EnemyClick").animator.SetFloat("death",1.0f);
		yield WaitForSeconds(3);

		getIngredients();
		getIngredients();
		var herbalistPresent=false;
		for (j =0;j<slots.length;j++){
			if(slots[j].actionsActive["Herbalist"]){
				herbalistPresent=true;
			}
		}
		if(herbalistPresent){
			getIngredients();
			getIngredients();
		}

		Destroy(body);
		if(pass.GetComponent("pass").eslots.length==0){
			winBattle(group);
		}
	 }
 }

 function getIngredients(){
	var randnum = Random.Range(1,11);
	var item;
	switch(randnum){
		case 1:
			item = "Flowers";
			break;
		case 2:
			item = "Mushrooms";
			break;
		case 3:
			item = "Honey";
			break;
		case 4:
			item = "Roots";
			break;
		case 5:
			item = "Powder";
			break;
		case 6:
			item = "Sap";
			break;
		case 7:
			item = "Extract";
			break;
		case 8:
			item = "Berries";
			break;
		case 9:
			item = "Herbs";
			break;
		case 10:
			item = "Essence";
			break;
	}
	GetComponent("Main").increaseItems(item,1);
 }

 function loseBattle(group){
	menu.GetComponent("Menu").hideAll();
	GetComponent("Main").hideEntries();
	resetSpaces();
	GetComponent("Main").menu.SetActive(false);
	if(GetComponent("Main").inCombat==true){
		 GetComponent("Main").inCombat=false;
		 group.location = nulllocation;
		 group.alive=false;
		 var eslots = pass.GetComponent("pass").eslots;
		 var spaces = pass.GetComponent("pass").spaces;
		for(var i =0;i<eslots.length;i++){
			eslots[i].vert=4;
			eslots[i].hor = (i+1);
			var x =eslots[i].hor;
			var y =eslots[i].vert;
			eslots[i].body.GetComponent("EnemyClick").moveTo(spaces[y][x]);
		}

		 var curCamera = GetComponent("Main").curCamera;
		 //zoom camera
		var t = 0.0;
		var startPosition = curCamera.transform.position;
		var endPosition = Vector3(curCamera.transform.position.x,295,curCamera.transform.position.z);
		while (t < 1.0)
		{
			t += 0.05;
			curCamera.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			yield;
		}
		GetComponent("Main").moveGrid.SetActive(true);
	}
 }

 var curlocation;
 function winBattle(groupNum){
	var Egroup = GetComponent("Main").Egroups[groupNum];
	curlocation = Egroup.location;
	Egroup.location = null;
	menu.GetComponent("Menu").hideAll();
	GetComponent("Main").hideEntries();
	resetSpaces();
	DestroyShields();
	GetComponent("Main").moveGrid.SetActive(true);
	GetComponent("Main").menu.SetActive(false);
	GetComponent("Special").SpecialFunction("winBattle");
	if(GetComponent("Main").inCombat==true){
		 GetComponent("Main").inCombat=false;

		 var slots = pass.GetComponent("pass").slots;
		 var spaces = pass.GetComponent("pass").spaces;
		 var experience = pass.GetComponent("pass").experience;
		 var group;
		 if(slots[0] && slots[0].group>-1){
			group= GetComponent("Main").groups[slots[0].group];
		 }else if(slots[1] && slots[1].group>-1){
			group= GetComponent("Main").groups[slots[1].group];
		 }else{
			group= GetComponent("Main").groups[slots[2].group];
		 }
		 
		 var slotPosition=new Array();
		 for(var j=0;j<slots.length;j++){
			 if(slots[j]){
		 		 slotPosition[j]=slots[j].index;
			 }else{
				slotPosition[j]=-1;
			 }
		 }
		 

		for(var i =0;i<slots.length;i++){
			if(slots[i].alive==false){
				continue;
			}
			if(slotPosition[i]>-1){
				//level up
				slots[i].experience+=experience;
				//move back to original space
				slots[i].vert=0;
				GetComponent("Main").units[slotPosition[i]].hor = (i+1);
				var x =slots[i].hor;
				var y =slots[i].vert;
				slots[i].body.GetComponent("AllyClick").moveTo(spaces[y][x]);
				//remove Ailments
				slots[i].poison=0;
				slots[i].immobolized=0;
				slots[i].sleep =0;
				slots[i].enfeebled=0;
				slots[i].blind=0;
				slots[i].silenced=0;
			}
		}

		 var curCamera = GetComponent("Main").curCamera;
		 //zoom camera
		var t = 0.0;
		var startPosition = curCamera.transform.position;
		var endPosition = Vector3(curCamera.transform.position.x,295,curCamera.transform.position.z);
		while (t < 1.0)
		{
			t += 0.05;
			curCamera.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			yield;
		}
		yield WaitForSeconds(1);
		returnUnits(slots);
		levelup();
	}	
 }
 function returnUnits(slots){
	var spaces = pass.GetComponent("pass").spaces;
 	 for(var i=0;i<slots.length;i++){
		var x =slots[i].hor;
		var y =slots[i].vert;
	 	 slots[i].body.transform.position = spaces[y][x].transform.position;
	 }
 }
 
 function levelup(){
	GetComponent("Main").moveGrid.SetActive(false);
	victoryScreen.SetActive(false);
	var unit = findlevelup();
	if(unit!=false){
		if(unit.level>=6){
			return;
		}
		unit.experience -=1000;
		unit.level+=1;
		unit.body.GetComponent("AllyClick").curcamera.enabled=true;
		victoryScreen.SetActive(true);
		var newability = unit.abilities[unit.level-1];
		victoryScreen.GetComponent("victoryScreen").curname.GetComponent("Text").text = newability;
		victoryScreen.GetComponent("victoryScreen").sentence.GetComponent("Text").text = "Your " + unit.type + " gained a level and learned:";
		victoryScreen.GetComponent("victoryScreen").Description1.GetComponent("Text").text = unit.actionDes1[newability];
		victoryScreen.GetComponent("victoryScreen").Description2.GetComponent("Text").text = unit.actionDes2[newability];
		victoryScreen.GetComponent("victoryScreen").curimage.GetComponent("Image").sprite = Resources.Load("Icons/" + unit.type + "/" + newability, typeof(Sprite));
		//option1.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/" + type + "/" + actions[0], typeof(Sprite));
		unit.actionsActive[newability]=true;
	}else{
		GetComponent("Main").moveGrid.SetActive(true);
		GetComponent("Main").checkBattle(curlocation);
	}
 }

 function findlevelup(){
 	 var slots = pass.GetComponent("pass").slots;
	 var replyItem;
	 for(var i = 0;i<slots.length;i++){
		slots[i].body.GetComponent("AllyClick").curcamera.enabled=false;
	 	 if(slots[i].experience>=1000 && slots[i].level<6){
		 	 replyItem = slots[i];
		 }
	 }
	 if(replyItem){
	 	 return replyItem;
	 }else{
		return false;
	 } 
 }

 function resetSpaces(){
		//reset all other spaces
		var objects = GameObject.FindGameObjectsWithTag("Space");
		for(var i = 0;i<objects.length;i++){
			objects[i].GetComponent.<SpaceClick>().readyMove=false;
		}
 }
 ///////////////////////////////
 function unitActionOnAlly(index){
	if(usedAction){
		return;
	}
	resetSpaces();
	menu.GetComponent("Menu").hideAll();
	var thisUnit = GetComponent("Main").units[GetComponent("Main").activeIndex];
	var curAlly = GetComponent("Main").units[index];
	var curAction = GetComponent("Main").curAction;
	var eslots = pass.GetComponent("pass").eslots;
	var slots = pass.GetComponent("pass").slots;
	var num;
	if(thisUnit.didAction==true){
		return;
	}
	if(thisUnit.sleep>0){
		wordPopup(thisUnit,"Sleeping");
		return;
	}

	if(thisUnit.type=="Guard"){
		if(curAction=="Protect"){
			if(curAlly.protectedBy!=-1){
				wordPopup(curAlly,"Already Protected");
				return;
			}
			if(curAlly.type=="Guard"){
				return;
			}
			lookAt(curAlly,thisUnit);
			curAlly.protectedBy=thisUnit.index;
			wordPopup(curAlly,"Protected");
			GetComponent("sounds").playSound("protect");
			magic = Resources.Load("effects/Shield", GameObject);
			instance2 = Instantiate(magic);
			instance2.transform.position = curAlly.body.transform.position;
			instance2.transform.position.y+=5;
			instance2.transform.position.z+=1;
			instance2.transform.SetParent(curAlly.body.transform);
			if(thisUnit.shield1){
				thisUnit.shield2=instance2;
			}else{
				thisUnit.shield1=instance2;
			}
		}
	}
	if(thisUnit.type=="Cleric"){
		if(!thisUnit.actionsActive["Reach"]){
				if(!isAdjacent(curAlly,thisUnit)){
					return;
				}
			}
		magicAttack(thisUnit,curAlly);
		yield WaitForSeconds(0.5);
		if(curAction=="Heal" && thisUnit.arrows["Heal"]>0){
			heal(curAlly,40);
			thisUnit.arrows["Heal"]-=1;
			GetComponent("sounds").playSound("heal");
		}
		if(curAction=="Vigor"){
			
			GetComponent("sounds").playSound("vigor");
			curAlly.didAction=false;
			if(thisUnit.actionsActive["Move"]){
				curAlly.hasMoved=false;
			}
			wordPopup(curAlly,"Refreshed");
			
			magic = Resources.Load("effects/Vigor", GameObject);
			instance = Instantiate(magic);
			instance.transform.position = curAlly.body.transform.position;
			instance.transform.position.y+=5;

			//double vigor
			if(thisUnit.actionsActive["Double Vigor"]){
				var extra;
				for(i=0;i<slots.length;i++){
					if(slots[i].index!=thisUnit.index && slots[i].index!=curAlly.index){
						slots[i].didAction=false;
						if(thisUnit.actionsActive["Move"]){
							slots[i].hasMoved=false;
						}
						wordPopup(slots[i],"Refreshed");
			
						magic = Resources.Load("effects/Vigor", GameObject);
						instance2 = Instantiate(magic);
						instance2.transform.position = slots[i].body.transform.position;
						instance2.transform.position.y+=5;
					}
				}
			}

			yield WaitForSeconds(1);
			Destroy(instance);
			Destroy(instance2);
		}
	}
	if(thisUnit.type=="Monk"){
		if(curAction=="Transfer" && thisUnit.health>30){
			magicAttack(thisUnit,curAlly);
			transfer(thisUnit,curAlly,30);
			GetComponent("sounds").playSound("heal");
		}
	}
 }

 var hit;
 function unitAction(eindex){
	if(usedAction){
		return;
	}
	preventDoubleAction();
	resetSpaces();
	menu.GetComponent("Menu").hideAll();
	var thisUnit = GetComponent("Main").units[GetComponent("Main").activeIndex];
	var curEnemy = GetComponent("Main").Eunits[eindex];
	var curAction = GetComponent("Main").curAction;
	var eslots = pass.GetComponent("pass").eslots;
	var slots = pass.GetComponent("pass").slots;
	var num;

	hit = hitResult(thisUnit, curEnemy.evasion,thisUnit.accuracy);
	
	if(thisUnit.didAction==true){
		return;
	}
	if(thisUnit.sleep>0){
		wordPopup(thisUnit,"Sleeping");
		return;
	}

	var damage:int;
	if(thisUnit.type == "Archer"){
		GetComponent("Special").SpecialFunction("archerAttack");
		shootarrow(thisUnit,curEnemy);
			var intercept = interceptArrow();
			if(intercept!=-1){
				return;
			}
		yield WaitForSeconds(2);
		if(curAction=="Normal"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(thisUnit.arrows[curAction]==0){
			return;
		}else{
			if(curAction !="Normal"){
				thisUnit.arrows[curAction]-=1;
			}
		}
		if(curAction=="Explosion"){
			//explosion effect
				var explosion = Resources.Load("effects/explosion", GameObject);
				var instance = Instantiate(explosion);
				instance.transform.position = curEnemy.body.transform.position;
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,"Fire");
			for(var i =0;i<eslots.length;i++){
				var smalldamage = thisUnit.attack-getdefense(eslots[i],"defense");
				if(eslots[i].hor==curEnemy.hor){
					if(eslots[i].vert+1==curEnemy.vert||eslots[i].vert-1==curEnemy.vert){
						damageEnemy(eslots[i],smalldamage,"Fire");
					}
				}
				if(eslots[i].vert==curEnemy.vert){
					if(eslots[i].hor+1==curEnemy.hor||eslots[i].hor-1==curEnemy.hor){
						damageEnemy(eslots[i],smalldamage,"Fire");
					}
				}
			}
			GetComponent("sounds").playSound("explosion");
			thisUnit.didAction=true;
		}
		if(curAction=="Piercing"){
			damage = thisUnit.attack;
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(curAction=="Immobolize"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.immobolized=2;
				showAilment("Immobolized", thisUnit);
				GetComponent("sounds").playSound("poison");
				wordPopup(curEnemy,"Immobolized");
			}
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(curAction=="Titan"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damage=damage*2;
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Rogue"){
		if(thisUnit.vert != curEnemy.vert && thisUnit.hor !=curEnemy.hor){
			return;
		}
		shootarrow(thisUnit,curEnemy);
		intercept = interceptArrow();
			if(intercept!=-1){
				return;
			}
		yield WaitForSeconds(2);
		if(curAction=="Normal"){

			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(thisUnit.arrows[curAction]==0){
			return;
		}else{
			if(curAction !="Normal"){
				thisUnit.arrows[curAction]-=1;
			}
		}
		if(curAction=="Poison"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.poison=4;
				showAilment("Poison", curEnemy);
				GetComponent("sounds").playSound("poison");
				wordPopup(curEnemy,"Poisoned");
			}
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(curAction=="Blindness"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.blind=3;
				showAilment("Blind", curEnemy);
				GetComponent("sounds").playSound("poison");
				wordPopup(curEnemy,"Blinded");
			}
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
			
		}
		if(curAction=="Sleep"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.sleep=2;
				showAilment("Sleep", curEnemy);
				GetComponent("sounds").playSound("poison");
				wordPopup(curEnemy,"Sleep");
			}
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
		}
		if(curAction=="Enfeeble"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.enfeebled=3;
				showAilment("Enfeebled", curEnemy);
				GetComponent("sounds").playSound("poison");
				wordPopup(curEnemy,"Enfeebled");
			}
			damageEnemy(curEnemy,damage,"None");
			thisUnit.didAction=true;
			
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Templar"){
		if(thisUnit.vert != curEnemy.vert && thisUnit.hor !=curEnemy.hor){
			return;
		}
		
		var curElement = "None";
		if(thisUnit.actionsActive["Elemental"]){
			curElement=thisUnit.element;
		}
			shootarrow(thisUnit,curEnemy);
			intercept = interceptArrow();
			if(intercept!=-1){
				return;
			}
			yield WaitForSeconds(2);
		
		if(curAction=="Normal"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,curElement);
			thisUnit.didAction=true;
			showElementalArrow(curEnemy,curElement);
		}
		if(thisUnit.arrows[curAction]==0){
			return;
		}else{
			if(curAction !="Normal"){
				thisUnit.arrows[curAction]-=1;
			}
		}
		if(curAction=="Silence"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			if(hit=="Hit"){
				curEnemy.silenced=2;
				showAilment("Silenced", curEnemy);
				wordPopup(curEnemy,"Silenced");
				GetComponent("sounds").playSound("poison");
				showElementalArrow(curEnemy,curElement);
			}
			damageEnemy(curEnemy,damage,curElement);
			
			thisUnit.didAction=true;
			
		}
		if(curAction=="GrapplingHook"){
			var newlength;
			var moveToHor;
			var moveToVert;
			lookAt(curEnemy,thisUnit);

			ropeEffect = Resources.Load("effects/Rope", GameObject);
			rope = Instantiate(ropeEffect);
			rope.transform.position = thisUnit.body.transform.position;

			if(curEnemy.hor == thisUnit.hor){
				if(curEnemy.vert>thisUnit.vert){
					//enemy on top
					newlength= curEnemy.body.transform.position.z-thisUnit.body.transform.position.z;
					if(spaceEmpty(thisUnit.hor,thisUnit.vert+1,slots,eslots)){
						moveToHor=thisUnit.hor;
						moveToVert=thisUnit.vert+1;
					}
				}else{
					newlength= thisUnit.body.transform.position.z-curEnemy.body.transform.position.z;
					if(spaceEmpty(thisUnit.hor,thisUnit.vert-1,slots,eslots)){
						moveToHor=thisUnit.hor;
						moveToVert=thisUnit.vert-1;
						}
				}
			}else{
				rope.transform.rotation.eulerAngles.y=rope.transform.rotation.eulerAngles.y+90;
				if(curEnemy.hor>thisUnit.hor){
					//enemy on left
					newlength= curEnemy.body.transform.position.x-thisUnit.body.transform.position.x;
					if(spaceEmpty(thisUnit.hor+1,thisUnit.vert,slots,eslots)){
						moveToHor=thisUnit.hor+1;
						moveToVert=thisUnit.vert;
					}
				}else{
				newlength= thisUnit.body.transform.position.x-curEnemy.body.transform.position.x;
					if(spaceEmpty(thisUnit.hor-1,thisUnit.vert,slots,eslots)){
						moveToHor=thisUnit.hor-1;
						moveToVert=thisUnit.vert;
						}
				}
			}
			if(hit=="Hit"){
				showElementalArrow(curEnemy,curElement);
			}
			//extend rope
			//var rope = thisUnit.body.GetComponent("AllyClick").item;
			//rope.SetActive(true);

				
				
			var ropePos = rope.transform.position;
			var ropeLength = rope.transform.localScale;
			var newPosition =Vector3((curEnemy.body.transform.position.x+thisUnit.body.transform.position.x)/2,thisUnit.body.transform.position.y+5,(curEnemy.body.transform.position.z+thisUnit.body.transform.position.z)/2);
			var newRopeLength = new Vector3(ropeLength.x,newlength/2,ropeLength.z);
			var t = 0.0;
			 while (t < 1.0)
			 {
				 t += 0.05;
				 rope.transform.localScale = Vector3.Lerp(ropeLength,newRopeLength,t);
				 rope.transform.position = Vector3.Lerp(ropePos,newPosition,t);
				 yield;
			 }
			 damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,curElement);
			thisUnit.didAction=true;
			GetComponent("sounds").playSound("rope");
			if(hit=="Hit"){
				moveInstant(curEnemy,moveToVert,moveToHor);
			}
			 t=0.0;
			 while (t < 1.0)
			 {
				 t += 0.05;
				 rope.transform.localScale = Vector3.Lerp(newRopeLength,ropeLength,t);
				 rope.transform.position = Vector3.Lerp(newPosition,ropePos,t);
				 yield;
			 }
			 Destroy(rope);
		}
		if(curAction=="Disrupt"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense");
			damageEnemy(curEnemy,damage,curElement);
			thisUnit.didAction=true;
			if(hit=="Hit"){
				GetComponent("sounds").playSound("disrupt");
				for(num = 0;num<eslots.length;num++){
					if(eslots[num].charge>0){
						eslots[num].charge=0;
						eslots[num].body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=eslots[i].charge.ToString();
					}
				}
				showElementalArrow(curEnemy,curElement);
			}
		}
		if(curAction=="Burst"){
			damage = thisUnit.attack-getdefense(curEnemy,"defense") + thisUnit.resistance;
			if(hit=="Hit"){
				showElementalArrow(curEnemy,curElement);
			}
			damageEnemy(curEnemy,damage,curElement);
			thisUnit.didAction=true;
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Soldier"){
		if(curAction=="Attack" && isAdjacent(curEnemy,thisUnit)){
			swordattack(thisUnit,curEnemy);
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Knight"){
		if(curAction=="Attack" && isAdjacent(curEnemy,thisUnit)){
			if(thisUnit.energy<20){
				wordPopup(thisUnit,"Low Energy");
				return;
			}else{
				thisUnit.energy-=20;
				setEnergyBar(thisUnit);
				swordattack(thisUnit,curEnemy);
			}
		}
		if(curAction=="Swirl" && isAdjacent(curEnemy,thisUnit)){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Low Energy");
				return;
			}else{
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				lookAt(curEnemy,thisUnit);

				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",2);
				GetComponent("sounds").playSound("gust");
				yield WaitForSeconds(0.1);
				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",0);
				yield WaitForSeconds(0.5);
				GetComponent("sounds").playSound("hit");

				for(i =0;i<eslots.length;i++){
					damage = thisUnit.attack-getdefense(eslots[i],"defense");
					if(eslots[i].hor==thisUnit.hor){
						if(eslots[i].vert+1==thisUnit.vert||eslots[i].vert-1==thisUnit.vert){
							damageEnemy(eslots[i],damage,"None");
						}
					}
					if(eslots[i].vert==thisUnit.vert){
						if(eslots[i].hor+1==thisUnit.hor||eslots[i].hor-1==thisUnit.hor){
							damageEnemy(eslots[i],damage,"None");
						}
					}
				}
			}
		}
		if(curAction=="Sweep" && isAdjacent(curEnemy,thisUnit)){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Low Energy");
				return;
			}else{
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",1);
				yield WaitForSeconds(0.7);
				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",0);
				GetComponent("sounds").playSound("hit");
				damage = thisUnit.attack-getdefense(curEnemy,"defense");
				damageEnemy(curEnemy,damage,"None");
				lookAt(curEnemy,thisUnit);
				var checkvert1;
				var checkhor1;
				var checkvert2;
				var checkhor2;
					if(thisUnit.hor==curEnemy.hor){
						//enemy above or below
						if(thisUnit.vert==(curEnemy.vert-1) || thisUnit.vert==(curEnemy.vert+1)){
							checkvert1=curEnemy.vert;
							checkvert2=curEnemy.vert;
							checkhor1=curEnemy.hor+1;
							checkhor2=curEnemy.hor-1;
						}
					}else{
						//enemy right or left
						if(thisUnit.hor==(curEnemy.hor-1) || thisUnit.hor==(curEnemy.hor+1)){
							checkhor1=curEnemy.hor;
							checkhor2=curEnemy.hor;
							checkvert1=curEnemy.vert+1;
							checkvert2=curEnemy.vert-1;
						}
					}
				for(i =0;i<eslots.length;i++){
					damage = thisUnit.attack-getdefense(eslots[i],"defense");
					if((eslots[i].vert==checkvert1 && eslots[i].hor==checkhor1) || (eslots[i].vert==checkvert2 && eslots[i].hor ==checkhor2)){
							damageEnemy(eslots[i],damage,"None");
					}
				}
				
			}
		}
		if(curAction=="Push" && isAdjacent(curEnemy,thisUnit)){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Low Energy");
				return;
			}else{
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",3);
				lookAt(curEnemy,thisUnit);
				yield WaitForSeconds(0.1);
				thisUnit.body.GetComponent("AllyClick").animator.SetInteger("special",0);
				yield WaitForSeconds(0.5);
				GetComponent("sounds").playSound("hit");

				damage = thisUnit.attack-getdefense(curEnemy,"defense");
				damageEnemy(curEnemy,damage,"None");
				
				GetComponent("sounds").playSound("hit");
				var sendVert = curEnemy.vert;
				var sendHor = curEnemy.hor;
				var alterVert=0;
				var alterHor=0;
				if(curEnemy.hor==thisUnit.hor){
					//Go up
					if(curEnemy.vert==(thisUnit.vert+1)){
						alterVert=1;
					}else{
						alterVert=-1;
					}
				}else{
					//Go right
					if(curEnemy.hor==(thisUnit.hor+1)){
						alterHor=1;
					}else{
						alterHor=-1;
					}
				}
				var keepgoing=true;
				while(keepgoing){
					var testVert = sendVert+alterVert;
					var testHor = sendHor + alterHor;
					if(testVert<=4 && testVert>=0 && testHor<=4 && testHor>=0){
						if(spaceEmpty(testHor,testVert,slots,eslots)){
							sendVert+=alterVert;
							sendHor+=alterHor;
						}else{
							keepgoing=false;
						}
					}else{
						keepgoing=false;
					}
				}
				if(hit=="Hit"){
					moveInstant(curEnemy,sendVert,sendHor);
				}
			}//end of else
		}
		if(curAction=="Wail" && isAdjacent(curEnemy,thisUnit)){
			if(thisUnit.energy<15){
				wordPopup(thisUnit,"Low Energy");
				return;
			}else{
				lookAt(curEnemy,thisUnit);
				Wail(thisUnit,curEnemy);	
			}
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Thief"){
		if(curAction=="Attack" && isAdjacent(curEnemy,thisUnit)){
			
			steal(thisUnit,curEnemy);
			if(thisUnit.actionsActive["FirstBlow"]){
				if(curEnemy.health==curEnemy.maxhealth && hit=="Hit"){
					curEnemy.blind=2;
					showAilment("Blind", curEnemy);
					wordPopup(curEnemy,"Blinded");
				}
			}
			swordattack(thisUnit,curEnemy);
			thisUnit.invisible=false;
			if(thisUnit.actionsActive["Invisible"]){
				thisUnit.body.GetComponent("Thief").turnVisible();
				GetComponent("combat").wordPopup(thisUnit,"Visible");
			}
		}
		if(curAction=="Steal" && isAdjacent(curEnemy,thisUnit)){
			
		}
		if(curAction=="Phase" && isAdjacent(curEnemy,thisUnit)){
			curEnemy.enfeebled=2;
			showAilment("Enfeebled", curEnemy);
			thisUnit.didAction=true;
			GetComponent("sounds").playSound("poison");
			wordPopup(curEnemy,"Enfeebled");
			newvert = curEnemy.vert;
			newhor = curEnemy.hor;
			moveInstant(curEnemy,thisUnit.vert,thisUnit.hor);
			moveInstant(thisUnit,newvert,newhor);
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Mage"){
		if(checkSilencer(eslots)){
			return;
		}
		if(curAction=="Fire"){
			if(isDiagonal(curEnemy,thisUnit) || isTwoAway(curEnemy,thisUnit)){
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				magic = Resources.Load("effects/FireBall", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = thisUnit.body.transform.position;
				instance.transform.position.y+=20;
				shootObject(instance,curEnemy);
				yield WaitForSeconds(0.5);
				
				magic = Resources.Load("effects/Fire", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				instance.transform.position.y+=5;
				damage = thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Fire");
				GetComponent("sounds").playSound("fire");
				yield WaitForSeconds(1.5);	
				Destroy(instance);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Blind");
				}
			}
		}
		if(curAction=="Zap"){
			if(isTwoAway(curEnemy,thisUnit)){
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				
				magic = Resources.Load("effects/Zap", GameObject);
				instance = Instantiate(magic);
				var allyAngle= Mathf.Round(thisUnit.body.transform.rotation.eulerAngles.y);
				if(allyAngle>=360){
					allyAngle-=360;
				}
				instance.transform.rotation.eulerAngles.y=thisUnit.body.transform.rotation.eulerAngles.y+90;

				instance.transform.position = thisUnit.body.transform.position;
				instance.transform.position.y+=10;
				checkvert1=thisUnit.vert;
				checkhor1=thisUnit.hor;
				checkvert2=thisUnit.vert;
				checkhor2=thisUnit.hor;
				if(Mathf.Round(allyAngle)>-30 && Mathf.Round(allyAngle)<30){
					instance.transform.position.z+=15;
					checkvert1+=1;
					checkvert2+=2;
				}
				if(Mathf.Round(allyAngle)>150 && Mathf.Round(allyAngle)<210){
					instance.transform.position.z-=15;
					checkvert1-=1;
					checkvert2-=2;
				}
				if(Mathf.Round(allyAngle)>60 && Mathf.Round(allyAngle)<120){
					instance.transform.position.x+=15;
					checkhor1+=1;
					checkhor2+=2;
				}
				if(Mathf.Round(allyAngle)>240 && Mathf.Round(allyAngle)<=300){
					instance.transform.position.x-=15;
					checkhor1-=1;
					checkhor2-=2;
				}
				for(var p =0;p<eslots.length;p++){
					if((eslots[p].vert==checkvert1 && eslots[p].hor==checkhor1)||(eslots[p].vert==checkvert2 && eslots[p].hor==checkhor2)){
						
						damage = thisUnit.attack-getdefense(eslots[p],"resistance");
						damageEnemy(eslots[p],damage,"Lightning");
					}
				}

				GetComponent("sounds").playSound("zap");
				yield WaitForSeconds(1);	
				Destroy(instance);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Immobolized");
				}
			}
		}
		if(curAction=="Freeze"){
			if(isThreeAway(curEnemy,thisUnit)){
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				magic = Resources.Load("effects/Ice", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = thisUnit.body.transform.position;
				instance.transform.position.y+=10;
				shootObject(instance,curEnemy);
				yield WaitForSeconds(0.5);
				magic = Resources.Load("effects/Frozen", GameObject);
				frozen = Instantiate(magic);
				frozen.transform.position = curEnemy.body.transform.position;

				damage = thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Ice");
				GetComponent("sounds").playSound("ice");
				yield WaitForSeconds(1);
				Destroy(frozen);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Sleep");
				}
			}
		}
		if(curAction=="Execute"){
			magicAttack(thisUnit,curEnemy);
			yield WaitForSeconds(0.5);
			var number = Random.Range(1,curEnemy.maxhealth);
			if(number>curEnemy.health){
				wordPopup(curEnemy,"Executed");
				damageEnemy(curEnemy,curEnemy.health,"None");
			}else{
				wordPopup(curEnemy,"Fail");
			}

		}	
	}
	if(thisUnit.type == "Wizard"){
		if(checkSilencer(eslots)){
			return;
		}
		if(curAction=="Gust"){
			if(thisUnit.charge<1){
				wordPopup(thisUnit,"Not Enough Charge");
				return;
			}else{
				GetComponent("Special").SpecialFunction("Gust");
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.charge-=1;
				thisUnit.body.GetComponent("AllyClick").item.GetComponent("Text").text=thisUnit.charge.ToString();
				damage = thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Ice");
				GetComponent("sounds").playSound("gust");
				if(spaceEmpty(curEnemy.hor,curEnemy.vert+1,slots,eslots) && hit && curEnemy.vert<4){
					moveInstant(curEnemy,curEnemy.vert+1,curEnemy.hor);
				}
				magic = Resources.Load("effects/Gust", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				yield WaitForSeconds(1);
				Destroy(instance);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Sleep");
				}
			}
		}
		if(curAction=="Lightning"){
			if(thisUnit.charge<2){
				wordPopup(thisUnit,"Not Enough Charge");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.charge-=2;
				thisUnit.body.GetComponent("AllyClick").item.GetComponent("Text").text=thisUnit.charge.ToString();
				damage = 2*thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Lightning");
				GetComponent("sounds").playSound("explosion");
				magic = Resources.Load("effects/Lightning", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				instance.transform.position.y+=50;
				yield WaitForSeconds(0.5);
				Destroy(instance);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Immobolized");
				}
			}
		}
		if(curAction=="Missiles"){
			if(thisUnit.charge<1){
				wordPopup(thisUnit,"Not Enough Charge");
				return;
			}else{
				if(thisUnit.hor!=curEnemy.hor && thisUnit.vert!=curEnemy.vert){
					return;
				}
				magicAttack(thisUnit,curEnemy);
				
				var missiles = thisUnit.charge;
				yield WaitForSeconds(0.5);
				shootMissile(0,thisUnit,curEnemy,missiles);
				yield WaitForSeconds(1);
				if(hit=="Hit"){
					magicAilments(thisUnit,curEnemy,"Blind");
				}
			}
		}
		if(curAction=="Drain" && isAdjacent(curEnemy,thisUnit)){
			magicAttack(thisUnit,curEnemy);
			yield WaitForSeconds(0.5);
			GetComponent("sounds").playSound("drain");
			thisUnit.charge+=curEnemy.charge;
			thisUnit.body.GetComponent("AllyClick").item.GetComponent("Text").text=thisUnit.charge.ToString();
			curEnemy.charge=0;
			curEnemy.body.GetComponent("EnemyClick").chargeText.GetComponent("Text").text=curEnemy.charge.ToString();
			drain(thisUnit,curEnemy);
		}	
	}
	if(thisUnit.type == "Sorcerer"){
		if(checkSilencer(eslots)){
			return;
		}
		if(curAction=="Blizzard"){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Not Enough Energy");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);

				thisUnit.energy-=30;
				setEnergyBar(thisUnit);

				magic = Resources.Load("effects/Blizzard", GameObject);
				instance = Instantiate(magic);
				var location = GetComponent("Main").groups[thisUnit.group].location;
				instance.transform.position = location.transform.position;
				instance.transform.position.x+=25;
				instance.transform.position.z+=25;

				yield WaitForSeconds(3);
				for(i = 0;i<eslots.length;i++){
					damage = thisUnit.attack-getdefense(eslots[i],"resistance");
					damageEnemy(eslots[i],damage,"Ice");
				}
			}
		}
		if(curAction=="Bolt"){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Not Enough Energy");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				damage = 2*thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Lightning");
				GetComponent("sounds").playSound("explosion");
				magic = Resources.Load("effects/Lightning", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				instance.transform.position.y+=50;
				yield WaitForSeconds(0.5);
				Destroy(instance);
			}
		}
		if(curAction=="Earth"){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Not Enough Energy");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				damage = 2*thisUnit.attack-getdefense(curEnemy,"defense");
				
				magic = Resources.Load("effects/Earth", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				instance.transform.position.z-=100;
				instance.transform.position.y+=50;
				GetComponent("sounds").playSound("gust");
				yield WaitForSeconds(0.5);
				earth(instance,curEnemy,damage);
				
			}
		}
		if(curAction=="FireBlast"){
			if(thisUnit.energy<30){
				wordPopup(thisUnit,"Not Enough Energy");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.energy-=30;
				setEnergyBar(thisUnit);
				
				magic = Resources.Load("effects/FireBlast", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				yield WaitForSeconds(2);
				damage = 2*thisUnit.attack-getdefense(curEnemy,"resistance");
				damageEnemy(curEnemy,damage,"Fire");
				for(i =0;i<eslots.length;i++){
					smalldamage = thisUnit.attack-getdefense(eslots[i],"resistance");
					if(eslots[i].hor==curEnemy.hor){
						if(eslots[i].vert+1==curEnemy.vert||eslots[i].vert-1==curEnemy.vert){
							damageEnemy(eslots[i],smalldamage,"Fire");
						}
					}
					if(eslots[i].vert==curEnemy.vert){
						if(eslots[i].hor+1==curEnemy.hor||eslots[i].hor-1==curEnemy.hor){
							damageEnemy(eslots[i],smalldamage,"Fire");
						}
					}
				}
			}
		}
		if(curAction=="Death"){
			if(thisUnit.energy<50){
				wordPopup(thisUnit,"Not Enough Energy");
				return;
			}else{
				magicAttack(thisUnit,curEnemy);
				yield WaitForSeconds(0.5);
				thisUnit.energy-=50;
				setEnergyBar(thisUnit);
				
				magic = Resources.Load("effects/Death", GameObject);
				instance = Instantiate(magic);
				instance.transform.position = curEnemy.body.transform.position;
				yield WaitForSeconds(2);
				damageEnemy(curEnemy,curEnemy.health,"None");
				yield WaitForSeconds(2);
				Destroy(instance);
			}
		}	
	}
	if(thisUnit.type == "Guard"){
		if(curAction=="Bash" && isAdjacent(curEnemy,thisUnit)){
			swordattack(thisUnit,curEnemy);
		}
		menu.GetComponent("Menu").hideAll();
	}
	if(thisUnit.type == "Monk"){
		if(curAction=="Attack" && isAdjacent(curEnemy,thisUnit)){
			swordattack(thisUnit,curEnemy);
		}
		menu.GetComponent("Menu").hideAll();
	}
 }

 function hitResult(unit, evasion,accuracy){
	
	if(unit.isAlly){
		var slots = pass.GetComponent("pass").slots;
		for(var i = 0;i<slots.length;i++){
			if(slots[i].actionsActive["Inspire"]){
				if(isAdjacent(slots[i],unit)){
					wordPopup(slots[i],"Inspires");
					return "Hit";
				}
			}
		}
	}

	var randnum = Random.Range(0,4);
	accuracy+=randnum;
	if(accuracy>=evasion){
		return "Hit";
	}else if(accuracy==evasion-1){
		return "Near-Miss";
	}else{
		return "Miss";
	}
 }
 function preventDoubleAction(){
	usedAction=true;
	yield WaitForSeconds(2);
	usedAction=false;
 }

 function shootarrow(ally, enemy){
	ally.body.GetComponent("AllyClick").attack=1;
	lookAt(enemy,ally);
	yield WaitForSeconds(2);
	ally.body.GetComponent("AllyClick").attack=0;
	var intercept = interceptArrow();
	if(intercept!=-1){
		intercept.body.GetComponent("EnemyClick").animator.SetInteger("special",1);
		yield WaitForSeconds(0.5);
		GetComponent("sounds").playSound("protect");
		yield WaitForSeconds(1);
		intercept.body.GetComponent("EnemyClick").animator.SetInteger("special",0);
		wordPopup(intercept,"Caught Arrow");
		ally.didAction=true;
		return;
	}
	var arrow = ally.body.GetComponent("AllyClick").arrow;
	GetComponent("sounds").playSound("arrow");
	arrow.SetActive(true);
	//move active
		var startPosition = arrow.transform.position;
		var endPosition = new Vector3(enemy.body.transform.position.x,arrow.transform.position.y-10,enemy.body.transform.position.z);
		//rotation
		 unitPosition = arrow.transform.position;
		 spacePosition=enemy.body.transform.position;
		 var _direction = (spacePosition - unitPosition).normalized;
		var _lookRotation = Quaternion.LookRotation(_direction);
		 arrow.transform.rotation=_lookRotation;
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.1;
			 arrow.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 arrow.SetActive(false);
		 arrow.transform.position=startPosition;
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
 function earth(instance,target,damage){
		var startPosition = instance.transform.position;
		var endPosition = new Vector3(target.body.transform.position.x,target.body.transform.position.y,target.body.transform.position.z);
		
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.02;
			 instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
		 GetComponent("sounds").playSound("heavyhit");
		 yield WaitForSeconds(1);
		 damageEnemy(target,damage,"None");
		 Destroy(instance);
 }

 function swordattack(ally, enemy){
	lookAt(enemy,ally);
	ally.body.GetComponent("AllyClick").attack=1;
	yield WaitForSeconds(0.5);
	GetComponent("sounds").playSound("hit");
	ally.body.GetComponent("AllyClick").attack=0;
	damage = ally.attack-getdefense(enemy,"defense");
	if(ally.type=="Thief"){
		if(ally.actionsActive["BackStab"]){
			enemyAngle= enemy.body.transform.rotation.eulerAngles.y;
			allyAngle= ally.body.transform.rotation.eulerAngles.y;
			if(enemyAngle-allyAngle<30 && enemyAngle-allyAngle>-30){
				wordPopup(enemy,"BackStab");
				damage+=damage;
			}
		}
	}
	damageEnemy(enemy,damage,"None");
	ally.didAction=true;
 }

 function magicAttack(ally, enemy){
	lookAt(enemy,ally);
	ally.body.GetComponent("AllyClick").attack=1;
	yield WaitForSeconds(0.5);
	ally.body.GetComponent("AllyClick").attack=0;
	ally.didAction=true;
 }

 //Knight
 function Wail(ally,enemy){
	ally.energy-=15;
	setEnergyBar(ally);
	swordattack(ally,enemy);
	yield WaitForSeconds(1);
	if(ally.energy>=15 && enemy.health>0){
		goagain(ally,enemy);
	}
 }
 function goagain(ally,enemy){
	Wail(ally,enemy);
 }

 function setEnergyBar(ally){
	if(ally.type!="Knight" && ally.type!="Sorcerer" && ally.type!="Guard"){
		return;
	}
	if(ally.group<0){
		return;
	}
	var energybar = ally.body.GetComponent("AllyClick").energybar;
	var energy = ally.energy + 0.0f;

	var dem = 100 + 0.0f;
	if(ally.type=="Guard"){
		dem=ally.maxhealth + 0.0f;
	}
	var percentage= energy/dem;
	var newlength = 0.15 * percentage;
	energybar.transform.localScale = Vector3(newlength,0.2,0.02);
 }

 //Wizard
 function shootMissile(iteration,ally,enemy,number){
	ally.charge-=1;
	ally.body.GetComponent("AllyClick").item.GetComponent("Text").text=ally.charge.ToString();
	magic = Resources.Load("effects/FireBall", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = ally.body.transform.position;
	instance.transform.position.y+=20;
	shootObject(instance,enemy);
	yield WaitForSeconds(0.5);
	magic = Resources.Load("effects/Fire", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = enemy.body.transform.position;
	instance.transform.position.y+=5;
	damage = ally.attack-getdefense(enemy,"resistance");
	damageEnemy(enemy,damage,"Fire");
	GetComponent("sounds").playSound("fire");
	yield WaitForSeconds(1);	
	Destroy(instance);
	iteration+=1;
	if(number>iteration && enemy.health>0){
		shootAgain(iteration,ally,enemy,number);
	}
 }
 function shootAgain(iteration,ally,enemy,number){
 	shootMissile(iteration,ally,enemy,number);
 }
 function drain(ally,enemy){
			ally.body.GetComponent("AllyClick").animator.SetInteger("Special",1);
			magic = Resources.Load("effects/Charge", GameObject);
			instance = Instantiate(magic);
			instance.transform.position = enemy.body.transform.position;
			var startPosition = instance.transform.position;
			var endPosition = new Vector3(ally.body.transform.position.x,ally.body.transform.position.y,ally.body.transform.position.z);
			t = 0.0;
			 while (t < 1.0)
			 {
				 t += 0.01;
				 instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
				 yield;
			 }
			 ally.body.GetComponent("AllyClick").animator.SetInteger("Special",0);
 }
 function magicAilments(ally,enemy,type){
	if(ally.actionsActive["Ailments"]){
		var allyAcc = ally.accuracy;
		 var enemyEv = enemy.evasion;
		 var randnum = Random.Range(1,4);
		 if((allyAcc+randnum)>=(enemyEv+3)){
			GetComponent("sounds").playSound("poison");
			if(type=="Sleep"){
				enemy.sleep=2;
				showAilment("Sleep", enemy);
				wordPopup(enemy,"Sleep");
			}
			if(type=="Blind"){
				enemy.blind=3;
				showAilment("Blind", enemy);
				wordPopup(enemy,"Blinded");
			}
			if(type=="Immobolized"){
				enemy.immobolized=3;
				showAilment("Immobolized", enemy);
				wordPopup(enemy,"Immobolized");
			}
		 }
	}
 }

 //soldier
 function heal(ally,amount){
	ally.health+=amount;
	if(ally.health>ally.maxhealth){
		ally.health=ally.maxhealth;
	}

	var healthbar = ally.body.GetComponent("AllyClick").healthbar;
	var health = ally.health + 0.0f;
	var maxhealth = ally.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);
	var damage = amount.ToString();

	magic = Resources.Load("effects/Heal", GameObject);
	instance2 = Instantiate(magic);
	instance2.transform.position = ally.body.transform.position;
	instance2.transform.position.y+=5;
	GetComponent("sounds").playSound("heal");
	yield WaitForSeconds(1);
	ally.body.GetComponent("AllyClick").animator.SetInteger("special",0);
	popupText = Resources.Load("Prefabs/HealText", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.position = ally.body.transform.position;
	instance.transform.position.y+=10;
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;
	yield WaitForSeconds(1);
	Destroy(instance);
	Destroy(instance2);
}

//Monk
 function transfer(thisUnit,ally,amount){
	ally.health+=amount;
	if(ally.health>ally.maxhealth){
		ally.health=ally.maxhealth;
	}

	var healthbar = ally.body.GetComponent("AllyClick").healthbar;
	var health = ally.health + 0.0f;
	var maxhealth = ally.maxhealth + 0.0f;
	var percentage= health/maxhealth;
	var newlength = 0.15 * percentage;
	healthbar.transform.localScale = Vector3(newlength,0.2,0.02);

	damageAlly(thisUnit.index,amount,null,0);

	var damage = amount.ToString();

	thisUnit.body.GetComponent("AllyClick").animator.SetInteger("Special",1);
	magic = Resources.Load("effects/Charge", GameObject);
	instance = Instantiate(magic);
	instance.transform.position = thisUnit.body.transform.position;
	var startPosition = instance.transform.position;
	var endPosition = new Vector3(ally.body.transform.position.x,ally.body.transform.position.y,ally.body.transform.position.z);
	t = 0.0;
		while (t < 1.0)
		{
			t += 0.01;
			instance.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			yield;
		}
		thisUnit.body.GetComponent("AllyClick").animator.SetInteger("Special",0);


	popupText = Resources.Load("Prefabs/HealText", GameObject);
	var instance2 = Instantiate(popupText);
	instance2.transform.position = ally.body.transform.position;
	instance2.transform.position.y+=10;
	var childtext = instance2.transform.GetChild(0);
	childtext.GetComponent("Text").text=damage;
	yield WaitForSeconds(1);
	Destroy(instance);
	Destroy(instance2);
}


//Thief
function steal(ally,enemy){

	if(enemy.hasItem==false){
		wordPopup(enemy,"Nothing To Steal");
		return;
	}
	var health = enemy.health;
	var maxhealth = enemy.maxhealth;
	var healthCheck = Random.Range(1,maxhealth);

	if(healthCheck<health){
		wordPopup(enemy,"Failed To Steal");
		return;
	}
	enemy.hasItem=false;

	var randnum = Random.Range(1,17);
	var item;
	var amount = 0;
	switch(randnum){
		case 1:
			item = "Flowers";
			amount=2;
			break;
		case 2:
			item = "Mushrooms";
			amount=2;
			break;
		case 3:
			item = "Honey";
			amount=2;
			break;
		case 4:
			item = "Roots";
			amount=2;
			break;
		case 5:
			item = "Powder";
			amount=2;
			break;
		case 6:
			item = "Sap";
			amount=2;
			break;
		case 7:
			item = "Extract";
			amount=2;
			break;
		case 8:
			item = "Berries";
			amount=2;
			break;
		case 9:
			item = "Herbs";
			amount=2;
			break;
		case 10:
			item = "Essence";
			amount=2;
			break;
		case 11:
			item = "Revive Potion";
			amount=1;
			break;
		case 12:
			item = "Recover Potion";
			amount=1;
			break;
		case 13:
			item = "Defense Potion";
			amount=1;
			break;
		case 14:
			item = "Resistance Potion";
			amount=1;
			break;
		case 15:
			item = "Attack Potion";
			amount=1;
			break;
		case 16:
			item = "Health Potion";
			amount=1;
			break;
	}


	GetComponent("Main").increaseItems(item,amount);
	wordPopup(ally,"Stole " + item);
}

//Guard
function DestroyShields(){
	var objects = GameObject.FindGameObjectsWithTag("Shield");

	for(var i = 0;i<objects.length;i++){
		Destroy(objects[i]);
	}
}
//Templar
function showElementalArrow(enemy,element){
	var magic;
	var instance;
	if(element == "Fire"){
		magic = Resources.Load("effects/Fire", GameObject);
		instance = Instantiate(magic);
		instance.transform.position = enemy.body.transform.position;
	}
	if(element == "Ice"){
		magic = Resources.Load("effects/Frozen", GameObject);
		instance = Instantiate(magic);
		instance.transform.position = enemy.body.transform.position;
		GetComponent("sounds").playSound("ice");
	}
	if(element == "Lightning"){
		magic = Resources.Load("effects/Zap", GameObject);
		instance = Instantiate(magic);
		instance.transform.position = enemy.body.transform.position;
		instance.transform.position.y+=5;
		GetComponent("sounds").playSound("zap");
	}
	yield WaitForSeconds(2);
	Destroy(instance);
}

 function getdefense(enemy,type){
	var defense;
	if(type=="defense"){
		defense = enemy.defense;
	}else{
		defense = enemy.resistance;
	}
	if(enemy.enfeebled>0){
		defense=0;
	}
 	 return defense;
 }

 function spaceEmpty(hor, vert,slots,eslots){
	var Empty=true;
 	 for(var i =0;i<slots.length;i++){
	 	 if(slots[i].hor==hor && slots[i].vert==vert){
			Empty=false;
		 }
	 }
	 for(var j =0;j<eslots.length;j++){
	 	 if(eslots[j].hor==hor && eslots[j].vert==vert){
			Empty=false;
		 }
	 }
	 return Empty;
 }

 function moveInstant(enemy,vert,hor){
	enemy.vert = vert;
	enemy.hor = hor;
	var space = pass.GetComponent("pass").spaces[vert][hor];
	
	//move active
		var startPosition = enemy.body.transform.position;
		var endPosition = new Vector3(space.transform.position.x,enemy.body.transform.position.y,space.transform.position.z);
		var t = 0.0;
		 while (t < 1.0)
		 {
			 t += 0.05;
			 enemy.body.transform.position = Vector3.Lerp(startPosition,endPosition,t);
			 yield;
		 }
 }

 function lookAt(enemy,ally){
	returnUnits(GetComponent("Main").slots);
	var body = enemy.body;
	var abody = ally.body;

	enemybody = body.transform.position;
	allybody= abody.transform.position;
	var _direction = (enemybody - allybody).normalized;
	var _lookRotation = Quaternion.LookRotation(_direction);
	abody.transform.rotation=_lookRotation;
	abody.transform.rotation.x=0;
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

 function interceptArrow(){
	var eslots = pass.GetComponent("pass").eslots;
	for(var i =0;i<eslots.length;i++){
		if(eslots[i].type=="Magnet"){
			return eslots[i];
		}
	}
	return -1;
 }
 function checkSilencer(eslots){
 	 for(var i = 0;i<eslots.length;i++){
	 	 if(eslots[i].type =="Silencer"){
			wordPopup(eslots[i],"Prevents Magic");
		 	return true;
		 }
	 }
	 return false;
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