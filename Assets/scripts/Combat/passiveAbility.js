var description: String="hi";
var message: GameObject;
var message2: GameObject;

function UpdateDescription(){
	message.GetComponent("Text").text = description;
	message2.GetComponent("Text").text = description;
}