var explosion: AudioClip;
var arrow: AudioClip;
var poison: AudioClip;
var hit: AudioClip;
var heavyhit: AudioClip;
var disrupt:AudioClip;
var rope:AudioClip;
var fire:AudioClip;
var zap:AudioClip;
var ice: AudioClip;
var execute:AudioClip;
var charge:AudioClip;
var gust:AudioClip;
var missiles:AudioClip;
var drain:AudioClip;
var shootFire:AudioClip;
var protect:AudioClip;
var heal:AudioClip;
var vigor:AudioClip;
var spit:AudioClip;
var summon:AudioClip;
var brew: AudioClip;
var water:AudioClip;
var wallCollapse:AudioClip;
var returnEnergy:AudioClip;
var crystalOn:AudioClip;
var crystalOff:AudioClip;
var crit:AudioClip;
var startBattle:AudioClip;
var capture:AudioClip;
var captureFail:AudioClip;

function playSound(name){
	var audio: AudioSource = GetComponent.<AudioSource>();
	if(name=="explosion"){
		audio.clip = explosion;
	}else if(name =="arrow"){
		audio.clip = arrow;
	}else if(name =="poison"){
		audio.clip = poison;
	}else if(name =="hit"){
		audio.clip = hit;
	}else if(name =="ice"){
		audio.clip = ice;
	}else if(name =="disrupt"){
		audio.clip = disrupt;
	}else if(name =="rope"){
		audio.clip = rope;
	}else if(name =="fire"){
		audio.clip = fire;
	}else if(name =="zap"){
		audio.clip = zap;
	}else if(name =="execute"){
		audio.clip = execute;
	}else if(name =="gust"){
		audio.clip = gust;
	}else if(name =="missiles"){
		audio.clip = missiles;
	}else if(name =="drain"){
		audio.clip = drain;
	}else if(name =="charge"){
		audio.clip = charge;
	}else if(name =="shootFire"){
		audio.clip = shootFire;
	}else if(name =="heavyhit"){
		audio.clip = heavyhit;
	}else if(name =="protect"){
		audio.clip = protect;
	}else if(name =="heal"){
		audio.clip = heal;
	}else if(name =="vigor"){
		audio.clip = vigor;
	}else if(name =="spit"){
		audio.clip = spit;
	}else if(name =="summon"){
		audio.clip = summon;
	}else if(name =="brew"){
		audio.clip = brew;
	}else if(name =="water"){
		audio.clip = water;
	}else if(name =="wallCollapse"){
		audio.clip = wallCollapse;
	}else if(name =="returnEnergy"){
		audio.clip = returnEnergy;
	}else if(name =="crystalOn"){
		audio.clip = crystalOn;
	}else if(name =="crystalOff"){
		audio.clip = crystalOff;
	}else if(name =="crit"){
		audio.clip = crit;
	}else if(name =="startBattle"){
		audio.clip = startBattle;
	}else if(name =="capture"){
		audio.clip = capture;
	}else if(name =="captureFail"){
		audio.clip = captureFail;
	}
	audio.Play();
}