var main: GameObject;
var index: int = 0;
var actionPanel: GameObject;
var actionButton: GameObject;
var animator: Animator;
var Run: float;
var vert:int;
var hor:int;
var itself:GameObject;

function Start(){
	main = GameObject.Find("Main");
	animator = GetComponent.<Animator>();
	actionPanel = GameObject.Find("Actions");
	actionButton = GameObject.Find("PanelButtons");
}


function OnMouseDown(){
	if(main.GetComponent("Main").inCombat){
		var active = main.GetComponent("Main").units[index];
		main.GetComponent("Main").selectedUnit = itself;
		var curGrid = main.GetComponent("Main").curGrid;

		transform.gameObject.tag = "Active";

		//highlight spaces
		//[y(0 at left)][x(0 at bottom)]
		for(var i = 0;i<5;i++){
			for(var j = 0;j<5;j++){
				curGrid[i][j].GetComponent("SpaceClick").readyMove=false;
			}
		}


		if(vert<4){
			curGrid[hor][vert+1].GetComponent("SpaceClick").readyMove=true;
		}
		if(vert>0){
			curGrid[hor][vert-1].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor>0){
			curGrid[hor-1][vert].GetComponent("SpaceClick").readyMove=true;
		}
		if(hor<4){
			curGrid[hor+1][vert].GetComponent("SpaceClick").readyMove=true;
		}
	
		//set values
		main.GetComponent.<Main>().descriptionPanel.SetActive(true);
		main.GetComponent.<Main>().actionPanel.SetActive(true);
		main.GetComponent.<Main>().AttackValue.GetComponent.<UnityEngine.UI.Text>().text = active.attack + "";

		//create buttons
		var button = Instantiate(actionButton);
		button.transform.SetParent(actionPanel.transform,false);
		button.GetComponentInChildren(UI.Text).text = "Attack";
		button.GetComponent.<ActionButton>().idName = "Attack";
	}else{
		main.GetComponent("Main").clickGroup(index);
	}
	
}

function FixedUpdate(){
	animator.SetFloat("Run",Run);
}
