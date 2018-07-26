var health:GameObject;
var attack:GameObject;
var type:GameObject;
var defense:GameObject;
var resistance:GameObject;
var accuracy:GameObject;
var evasion:GameObject;
var details:GameObject;
var curActive;

function UpdateStats(unit){
	curActive=unit;
	health.GetComponent.<UnityEngine.UI.Text>().text=(unit.health.ToString() + "/" + unit.maxhealth.ToString());
	attack.GetComponent.<UnityEngine.UI.Text>().text=(unit.attack.ToString());
	type.GetComponent.<UnityEngine.UI.Text>().text=(unit.type.ToString());
	defense.GetComponent.<UnityEngine.UI.Text>().text=(unit.defense.ToString());
	resistance.GetComponent.<UnityEngine.UI.Text>().text=(unit.resistance.ToString());
	accuracy.GetComponent.<UnityEngine.UI.Text>().text=(translateEvasion(unit.accuracy));
	evasion.GetComponent.<UnityEngine.UI.Text>().text=(translateEvasion(unit.evasion));
}
function translateEvasion(num){
		switch(num){
			case 0:
				return "Awful";
				break;
			case 1:
				return "Normal";
				break;
			case 2: 
				return "Good";
				break;
			case 3:
				return "Great";
				break;
			case 4:
				return "Excellent";
				break;
			case 5:
				return "Perfect";
				break;
		}
}

function showdetails(){
	details.SetActive(true);
	details.GetComponent("Details").updateInfo(curActive);
}
