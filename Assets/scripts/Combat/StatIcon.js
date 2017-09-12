var message: GameObject;
var message2: GameObject;
var showMessage:boolean=true;

function ShowDescription(){
	showMessage=true;
	showIt();
}
function HideDescription(){
	showMessage=false;
	message.GetComponent("Text").enabled=false;
	message2.GetComponent("Text").enabled=false;
}

function showIt(){
	yield WaitForSeconds(1);
	if(showMessage){
		message.GetComponent("Text").enabled=true;
		message2.GetComponent("Text").enabled=true;
	}
}
