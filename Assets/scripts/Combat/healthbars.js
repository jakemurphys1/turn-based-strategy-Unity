var position;
var rotation;
  function Start()
  {
       rotation = transform.rotation;
  }
  function Update()
  {
        transform.rotation = rotation;
		//transform.position = position;
  }