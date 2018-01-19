// This is a JavaScript file

function resizeFrame(){

  
	var tmp_height	= document.documentElement.clientHeight -201;
	
	//フレームのエレメント取得
	var fm_elm		= document.getElementById("fm");
	fm_elm.style.height = tmp_height +"px";

}

resizeFrame();