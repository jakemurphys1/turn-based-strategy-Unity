var main: GameObject;
var switch1:GameObject;
var switch2:GameObject;
var switch3:GameObject;
var switch4:GameObject;
var switch5:GameObject;
var switch6:GameObject;
var switchAll:GameObject;

function Exit () {
	//if(main.GetComponent("combat").usedAction){
	//	return;
	//}
	gameObject.SetActive(false);
}
function switchGroup(){
		//if(main.GetComponent("combat").usedAction){
		//	return;
		//}
		//main.GetComponent("combat").preventDoubleAction();
		var TopSlotUnits=new Array();
		var location1;
		var group1;
		if(switch1.transform.childCount>0){
			TopSlotUnits[0] = main.GetComponent("Main").units[switch1.transform.GetChild(0).GetComponent("barrackpic").index];
			location1 = main.GetComponent("Main").groups[TopSlotUnits[0].group].location;
			group1=main.GetComponent("Main").groups[TopSlotUnits[0].group];
		}else{
			TopSlotUnits[0] = null;
		}
		if(switch2.transform.childCount>0){
			TopSlotUnits[1]=main.GetComponent("Main").units[switch2.transform.GetChild(0).GetComponent("barrackpic").index];
			location1 = main.GetComponent("Main").groups[TopSlotUnits[1].group].location;
			group1=main.GetComponent("Main").groups[TopSlotUnits[1].group];
		}else{
			TopSlotUnits[1] = null;
		}
		if(switch3.transform.childCount>0){
			TopSlotUnits[2]=main.GetComponent("Main").units[switch3.transform.GetChild(0).GetComponent("barrackpic").index];
			location1 = main.GetComponent("Main").groups[TopSlotUnits[2].group].location;
			group1= main.GetComponent("Main").groups[TopSlotUnits[2].group];
		}else{
			TopSlotUnits[2] = null;
		}

		var BottomSlotUnits=new Array();
		var location2;
		var group2;
		if(switch4.transform.childCount>0){
			BottomSlotUnits.push(main.GetComponent("Main").units[switch4.transform.GetChild(0).GetComponent("barrackpic").index]);
			location2 = main.GetComponent("Main").groups[BottomSlotUnits[0].group].location;
			group2=main.GetComponent("Main").groups[BottomSlotUnits[0].group];
		}else{
			BottomSlotUnits.push(null);
		}
		if(switch5.transform.childCount>0){
			BottomSlotUnits.push(main.GetComponent("Main").units[switch5.transform.GetChild(0).GetComponent("barrackpic").index]);
			llocation2 = main.GetComponent("Main").groups[BottomSlotUnits[1].group].location;
			group2=main.GetComponent("Main").groups[BottomSlotUnits[1].group];
		}else{
			BottomSlotUnits.push(null);
		}
		if(switch6.transform.childCount>0){
			BottomSlotUnits.push(main.GetComponent("Main").units[switch6.transform.GetChild(0).GetComponent("barrackpic").index]);
			location2 = main.GetComponent("Main").groups[BottomSlotUnits[2].group].location;
			group2=main.GetComponent("Main").groups[BottomSlotUnits[2].group];
		}else{
			BottomSlotUnits.push(null);
		}

		tempGroup = new Array();
		if(TopSlotUnits[0]!=null){
			tempGroup.push(TopSlotUnits[0].group);
		}else{
			tempGroup.push(null);
		}
		if(TopSlotUnits[1]!=null){
			tempGroup.push(TopSlotUnits[1].group);
		}else{
			tempGroup.push(null);
		}
		if(TopSlotUnits[2]!=null){
			tempGroup.push(TopSlotUnits[2].group);
		}else{
			tempGroup.push(null);
		}

		for(var i = 0;i<3;i++){
			if(TopSlotUnits[i]!=null){
					TopSlotUnits[i].group=group2.index;
			}
			if(BottomSlotUnits[i]!=null){
					BottomSlotUnits[i].group=group1.index;
			}
		}
		main.GetComponent("Main").hideCircles();
		
		//move bodies
		for(i=0;i<3;i++){
			main.GetComponent("Main").moveBodies(TopSlotUnits[i],location2.GetComponent("locations").allspaces[0][1+i]);
			main.GetComponent("Main").moveBodies(BottomSlotUnits[i],location1.GetComponent("locations").allspaces[0][1+i]);
		}
		main.GetComponent("Main").UpdateIconsMain();
		gameObject.SetActive(false);
}

