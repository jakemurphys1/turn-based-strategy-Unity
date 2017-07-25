var index: int;
var on: boolean = false;
var menu: GameObject;
var onButton: Sprite;
var offButton: Sprite;
var textBox:GameObject;

function clickit(){
	menu.GetComponent("Menu").optionIndex = index;
	if(on){
		gameObject.GetComponent("Image").sprite  = offButton;

		on = false;
	}else{
		gameObject.GetComponent("Image").sprite  = onButton;
		
		on = true;
	}
	
}
