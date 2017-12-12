var mainMusic:AudioClip;
var victory:AudioClip;

function playMusic(name){
	var audio: AudioSource = GetComponent.<AudioSource>();
	if(name=="mainMusic"){
		audio.clip = mainMusic;
	}else if(name=="victory"){
		audio.clip = victory;
	}
	audio.Play();

}