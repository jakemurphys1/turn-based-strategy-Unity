var level=1;
var stage=1;
var stageReached:int;
var main: GameObject;

function Start(){
}

function Awake () {
        DontDestroyOnLoad (transform.gameObject);
		main = GameObject.Find("Main");
		PlayerPrefs.SetInt("SiegeStage", 1);
		setStageInfo();
    }

	function setStageInfo(){
		if(PlayerPrefs.GetInt("SiegeStage")){
			stageReached = PlayerPrefs.GetInt("SiegeStage");
		}else{
			stageReached=1;
		}
	}

public function Save(stageName,stageNum){
	PlayerPrefs.SetInt(stageName, stageNum);
	setStageInfo();
}
public function Load(){
	var data = PlayerPrefs.GetInt("SiegeStage");
}