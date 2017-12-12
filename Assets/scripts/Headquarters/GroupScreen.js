var main: GameObject;

function Exit () {
	if(main.GetComponent("combat").usedAction){
		return;
	}
	gameObject.SetActive(false);
}

