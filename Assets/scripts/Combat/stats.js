var healthbox: GameObject;
var maxhealthbox: GameObject;
var attackbox: GameObject;
var defensebox: GameObject;
var resistancebox: GameObject;
var accuracybox: GameObject;

function updateText(health,maxhealth,attack,defense,resistance,accuracy){
	healthbox.GetComponent("Text").text = health.ToString();
	maxhealthbox.GetComponent("Text").text = maxhealth.ToString();
	attackbox.GetComponent("Text").text = attack.ToString();
	defensebox.GetComponent("Text").text = defense.ToString();
	resistancebox.GetComponent("Text").text = resistance.ToString();
	accuracybox.GetComponent("Text").text = accuracy.ToString();
}
