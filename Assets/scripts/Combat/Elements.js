var element: String;
var main: GameObject;
var option:GameObject;

function Clickit(){
	main.GetComponent("Main").units[main.GetComponent("Main").activeIndex].element = element;
	option.GetComponent("MenuButton").imageBox.GetComponent("Image").sprite = Resources.Load("Icons/Templar/" + element, typeof(Sprite));
	main.GetComponent("Main").showPotentialDamage();
}
