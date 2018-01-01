var level=1;
var main: GameObject;

function Start(){
	
}

function Awake () {
        DontDestroyOnLoad (transform.gameObject);
		main = GameObject.Find("Main");
    }
