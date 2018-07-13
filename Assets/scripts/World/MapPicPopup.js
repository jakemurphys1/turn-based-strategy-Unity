var pic1: GameObject;
var pic2: GameObject;
var pic3: GameObject;
var pic4: GameObject;
var pic5: GameObject;
var pics=[];
var main:GameObject;

function Start(){
	pics=[pic1,pic2,pic3,pic4,pic5];
}

function updatePics(curType){
	var group;
	var activeUnits=[null,null,null,null,null];
	if(curType=="AllyActive"){
		print(main.GetComponent("Main").activeGroup);
		group=main.GetComponent("Main").activeGroup;
		var units = main.GetComponent("Main").units;
		for(var i = 0;i<units.length;i++){
			if(units[i].group == group){
				activeUnits[units[i].hor]=units[i];
			}
		}
		print("got here");
	}
	for(i =0;i<5;i++){
		if(activeUnits[i]!=null){
			pics[i].SetActive(true);
			pics[i].GetComponent("Image").sprite=Resources.Load("alliesPics/"+activeUnits[i].type,typeof(Sprite));
		}else{
			pics[i].SetActive(false);
		}
	}
}
