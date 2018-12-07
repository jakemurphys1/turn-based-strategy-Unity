var message:GameObject;

function showTip(text){
	print("got here2");
	gameObject.SetActive(true);
	message.GetComponent("Text").text=text;
}
function closeTip(){
	gameObject.SetActive(false);
}