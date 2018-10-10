var mainMusic:AudioClip;
var victory:AudioClip;
var jobboard:AudioClip;

function playMusic(name){
	var audio: AudioSource = GetComponent.<AudioSource>();
	if(name=="mainMusic"){
		audio.clip = mainMusic;
	}else if(name=="victory"){
		audio.clip = victory;
	}else if(name=="jobboard"){
		audio.clip = jobboard;
	}
	audio.Play();

}