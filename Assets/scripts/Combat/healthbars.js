var position;
var rotation;
  function Start()
  {
       rotation = transform.rotation;
  }
  function Update()
  {
	if(transform){
		transform.rotation = rotation;
	}
		//transform.position = position;
  }