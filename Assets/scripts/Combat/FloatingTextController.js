var canvas: GameObject;
var popupText: GameObject;

function Start () {
	 canvas = GameObject.Find("Canvas");
        if (!popupText)
        {
            popupText = Resources.Load("Prefabs/PopupTextParent", GameObject);
        }
}

function CreateFloatingText(text,location){
popupText = Resources.Load("Prefabs/PopupTextParent", GameObject);
	var instance = Instantiate(popupText);
	instance.transform.SetParent(location,false);
	var childtext = instance.transform.GetChild(0);
	childtext.GetComponent("Text").text=text;
	var t = 0.0;
					 while (t < 1.0)
					 {
						 t += 0.013;
						 yield;
					 }
	Destroy(instance);
}
