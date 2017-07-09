var animator:Animator;
var v:float;
var h:float;
var sprint:float;

function Start(){
	animator= GetComponent(Animator);
}

function Update(){
	v = Input.GetAxis("Vertical");
	h = Input.GetAxis("Horizontal");
	Sprinting();
}

function FixedUpdate(){
	animator.SetFloat("Walk",v);
	animator.SetFloat("Turn",h);
	animator.SetFloat("Sprint",sprint);
}

function Sprinting(){
	if(Input.GetButton("Fire1")){
		sprint = 0.2;
	} else{
		sprint=0.0;
	}
}