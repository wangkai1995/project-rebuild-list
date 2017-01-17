//这段代码用来出来display_none在IE浏览器不兼容的问题
$(function(){
	
	 $park = $("#Parking"); 
	 $park.hide();	
})





//启动 mian部分
$(function(){
	
	$_div = $("#text_all");
	$_span = $("#porduct_button  span");
	
	var index = 0;
	var div_length = $('#text_all div').length;
    var adtime = null;  //这个用来设置是否取消定时轮播
    
	 //按钮
   $_span.hover(function(){
	 $(this).css({"opacity":"1"});
	 //停止图片的轮播
	 if (adtime) 
     {clearInterval(adtime);}
   },function(){
     $(this).css({"opacity":"0.5"});
	  	
   })
   
   
   
  //左边点击事件
  $_span.eq(0).click(function(){
  	     index--;
  	  if(index < 0 )
	  { index = div_length; }
	  showDiv(index);
  })
  
  //右边点击事件
   $_span.eq(1).click(function(){
   	      index++;
  	  if(index == div_length )
	  { index = 0;}
	  showDiv(index);
  })
  
   
   
   // DIV轮播
   $_div.hover(function(){
	    if (adtime) 
		{clearInterval(adtime);}
	},function(){
		adtime = setInterval(function(){
			showDiv(index);
			index++;
			if(index == div_length )
			{index = 0;}
		},3500)
   }).trigger("mouseleave");
   
})





//显示的函数
function showDiv(index){
	$_div = $("#text_all");
	
	$_div.find('div').eq(index).stop(true,true).fadeIn()
	     .siblings().fadeOut();
}