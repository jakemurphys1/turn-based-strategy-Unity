var health:GameObject;
var attack:GameObject;
var type:GameObject;
var defense:GameObject;
var resistance:GameObject;
var accuracy:GameObject;
var evasion:GameObject;

function UpdateStats(unit){
	health.GetComponent.<UnityEngine.UI.Text>().text=(unit.health.ToString() + "/" + unit.maxhealth.ToString());
	attack.GetComponent.<UnityEngine.UI.Text>().text=(unit.attack.ToString());
	type.GetComponent.<UnityEngine.UI.Text>().text=(unit.type.ToString());
	defense.GetComponent.<UnityEngine.UI.Text>().text=(unit.defense.ToString());
	resistance.GetComponent.<UnityEngine.UI.Text>().text=(unit.resistance.ToString());
	accuracy.GetComponent.<UnityEngine.UI.Text>().text=(unit.accuracy.ToString());
	evasion.GetComponent.<UnityEngine.UI.Text>().text=(unit.evasion.ToString());
}
