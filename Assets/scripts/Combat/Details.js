var NameText:GameObject;
var DesText:GameObject;
var StrongText:GameObject;
var WeakText:GameObject;
var main: GameObject;


function updateInfo(){
	var active = main.GetComponent("Main").activeEnemy;
	NameText.GetComponent("Text").text = active.type.ToString();
	DesText.GetComponent("Text").text = active.description.ToString();
	StrongText.GetComponent("Text").text = active.strong.ToString();
	WeakText.GetComponent("Text").text = active.weak.ToString();
}

function close(){
	gameObject.SetActive(false);
}