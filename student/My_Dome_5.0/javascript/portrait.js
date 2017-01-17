//初始化加载的函数
function init_load(fuct)
{
	var loads= window.onload;
	if(typeof window.onload !="function")
	{ window.onload = fuct;}
	else
	{ 
	  window.onabort = function(){
	  	loads();
		fuct();}
	 }
}


//测试取值
function select_onclick()
{
	//获得父窗口的照片ID
	var image = opener.document.getElementById("portrait");
	//获得父窗口的文本的值
	var text = opener.document.getElementById("portrait_value")
;	//获得div id
	var divs = document.getElementById("portrait");
	//获得所有照片
	var links  = divs.getElementsByTagName("img");
     
	for(var i=0; i<links.length; i++)
	{ 
	  links[i].onclick = function(){
	  	image.src = (this.src);   //传地址
		text.value= (this.alt);}   //照片编号在alt里面这个alt 传递给text
	}
}


init_load(select_onclick);
