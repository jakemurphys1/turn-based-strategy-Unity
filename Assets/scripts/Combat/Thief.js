
var invisible:GameObject;

function Start () {

}

function turnInvisible () {
	Debug.Log("check");
	invisible.SetActive(true);
}
function turnVisible () {
	invisible.SetActive(false);
}