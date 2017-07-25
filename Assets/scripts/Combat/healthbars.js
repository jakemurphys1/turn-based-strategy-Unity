var position;
var rotation;
  function Start()
  {
       rotation = transform.rotation;
	   positon = transform.position;
  }
  function Update()
  {
        transform.rotation = rotation;
		//transform.position = position;
  }