


wk(function(){
	
	var time; 
    

    // 导行滑动部分
	wk('#head_title #kong dd').hover(function(event){
		
		clearTimeout(time);
		var transfer = wk(this).nodeOf(0).returnElement().offsetLeft;
		
		wk('#select').animation({
			      x:transfer-5,
			      step:30
		         },10);
		
		wk('#select .select_titles').animation({
			     x:-transfer+8,
			     step:30
		    },10);
		

	},function(){
				
		time = setTimeout(function(){
			wk('#select').animation({
			      x:0,
			      step:30
		         },10);
			
			wk('#select .select_titles').animation({
			     x:0,
			     step:30
		        },10);
			
		   },100);
			  
	});


	//验证用户是否登录cookie
	if(getCookie('Rosim_flag') && getCookie('Rosim_user')){
        

		var text1 = '<ul>';
		var text2 = '<li><a class="NO_select"  href="../Personal_center.html">'+getCookie('Rosim_user')+' Personal_center</a></li>';
    	var text3 = '<li><a class="NO_select"  href="../index.html" title="English_language"><img src="../image/us.jpg" alt="luangimg"/>English</a></li>';
    	var text4 = '<li><a class="NO_select"  href="#"" title="中文语言""><img src="../image/china.jpg" alt="luangimg"/>中文</a></li>';
    	var text5 = '<li><a class="NO_select"  id="user_Exit" >Exit</a></li>';
    	var text6 = '</ul>';         

    	wk('#language').html(text1+text2+text3+text4+text5+text6);

     
    	var Exit = wk('#user_Exit').css('cursor','pointer').returnElement(0);

    	addEvent(Exit,'click',function(){

    		var cookie_error = 0;  //防止删除cookie失败卡死

    		while(getCookie('Rosim_flag')){

    			cookie_error ++;
    			if(cookie_error > 100){
    				break;
    			}
 
    			deleteCookie('Rosim_flag');
    			deleteCookie('Rosim_user');
    		}

    		alert('Exit the success');
    		history.back()
    	});

        

    } else{   //用户未登录
       alert('Please login first');
       hlocation.href='../index.html';
    }
	
})



