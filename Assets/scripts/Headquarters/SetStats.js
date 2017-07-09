var health:GameObject;
var attack:GameObject;
var type:GameObject;

function UpdateStats(curhealth:int,curmaxhealth:int,curattack:int,curtype:String){
	health.GetComponent.<UnityEngine.UI.Text>().text=(curhealth.ToString() + "/" + curmaxhealth.ToString());
	attack.GetComponent.<UnityEngine.UI.Text>().text=(curattack.ToString());
	type.GetComponent.<UnityEngine.UI.Text>().text=(curtype.ToString());
}
