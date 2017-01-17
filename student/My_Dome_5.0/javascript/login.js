//id = imgid 
//刷新验证码
function UP_verification_code(id)
{
 var code = document.getElementById(id);
 code.onclick = function(){
 	this.src='code_library/verification_code.php?tm ='+ Math.random();   //JS点击图片重新加载一次验证码函数
 }
}



//验证用户名和密码
function verification()
{
	//获得表单
	var fm = document.getElementById('login_form');
	//获得提交按键 
	
	//按键提交发生
	addEvent(fm.login_button,'click',function(event){
		    
		//检测用户名
		if (_user_name(fm.login_name.value, 2, 20))
		{	
			fm.login_name.value = '';
			return false;	
		}
		
		//检测密码
		if (_login_password(fm.login_password.value, 4, 20)) 
		{	
			fm.login_password.value = '';
			return false;	
		}

		//获得用户选择保留时间

		
		
		//先生产一个随机码
		var code = Math.random();
		
		//Ajax开始登录
		Ajax({
			type:'post',
			url:'code_library/login.php?rand='+code,
			data:{
				user : fm.login_name.value,            //用户名
				password : fm.login_password.value,    //密码
				verification : fm.verification.value,  //验证码
				rand : code,                           //随机码效验
			},

			success:function(text){


			   if(text !== 'null'){

	               var data = json_parse(text);

					//开始设置Cookie
		            if(data['flag'].length === 40){
                        

                        if(sys.ie){   //如果是IE
                                

                            
                                	setCookie('Rosim_flag',data['flag'],setCookieDate(3) );
							        setCookie('Rosim_user',data['name'],setCookieDate(3) );
							        alert('Login successful');
							        history.back();
                            /*
                            }else{

	                        	var lens = fm.times.length;

	                        	for(var k = 0; k<lens ;k++){
	                        		if(fm.times[k].checked||fm.times[k].checked =='true'||fm.times[k].checked =='checked'){
	                        			var value = fm.times[k].value;
	                        		}
	                        	}
								setCookie('Rosim_flag',data['flag'],setCookieDate( parseInt(value)) ) ;
								setCookie('Rosim_user',data['name'],setCookieDate( parseInt(value)) ) ;
								alert('Login successful');
								history.back();
                           }
                           */

                           
                        }else{

                        	setCookie('Rosim_flag',data['flag'],setCookieDate( parseInt(fm.times.value)) ) ;
						    setCookie('Rosim_user',data['name'],setCookieDate( parseInt(fm.times.value)) ) ;
						    alert('Login successful');
						    history.back();

                        }
                        
					}else{
					    alert('Error data');
					}	

				}else{
					alert('userName Or userPassword Error');
				}
				startEvent(document.getElementById('code'),'click');  //启动刷新验证码
                         
			}
		
	    });
   });
}






//启动验证码刷新和登录验证
window.onload = function()
{
	
	jQuery.noConflict();

    if(getCookie('Rosim_flag') && getCookie('Rosim_user')){
    	alert('您已经登录了');
    	history.back()
    }
    
	verification();
    UP_verification_code('code');

}





