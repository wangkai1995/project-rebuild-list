

//取得头像的值和局部刷新验证码
function registered(){
   //得到头像图片
   var image= document.getElementById("portrait");
   image.onclick = function(){
   	 window.open('code_library/portrait.php','portrait', 'width=520,height=500,top=0,left=0,scrollbars=1');
   }
   var code = document.getElementById("code");
   code.onclick = function(){
   	this.src='code_library/verification_code.php?tm ='+ Math.random();   //JS点击图片重新加载一次验证码函数
   }	
}





//JS验证用户输入信息
function verification(){
	//获得表单
	var fm = document.getElementById('register_form');
	//获得提交按键 
    
    var username_flag = false;      //用户名验证标志

    var userpassword_flag = false;  //密码验证标志

    var userconfirm_pd_flag = false;  //密码确认验证标志

    var useremail_flag = false;       //邮箱验证标志




    //验证用户名
    addEvent(fm.username,'focus',function(){
			//开始验证
			//信息提示框
			var message = wk('#User_Register  .messageName');
			//信息提示文字
			var text = wk('#User_Register  .messageName span'); 


			//键盘事件
            addEvent(fm.username,'keydup',function(){

                   if(fm.username.value.length <2 || fm.username.value.length >15){

            	        message.css('background','url(image/form/error.jpg) no-repeat')
            	                                 .css('color','red');
            	        text.val('Length cannot be less than 2 or greater than 15'); 
            	        username_flag = false;  

                    }else if(! /^[A-Za-z0-9_]+$/g.test(fm.username.value) ){

		            	message.css('background','url(image/form/error.jpg) no-repeat')
		            	                        .css('color','red');
		                text.val('Cannot contain special characters');
		                username_flag = false;

		            }else{
                        message.css('background','url(image/form/ok.jpg) no-repeat');
                        text.val(' ');
		            }

                
            });
            
            //失去焦点
            addEvent(fm.username,'blur',function(){

            	   if(! /^[A-Za-z0-9_]+$/g.test(fm.username.value) ){

		            	message.css('background','url(image/form/error.jpg) no-repeat')
		            	                        .css('color','red');
		                text.val('Cannot contain special characters');

		            }else{
		            	//AJAX验证用户名是否存在
		            	Ajax({
		            		type:'get',
		            		url:'code_library/register.php?rand='+Math.random(),
		            		data:{
		            			user_ve:'verification',
		            			user_name:fm.username.value,
		            		},

		            		success : function(messages){
		            			if(messages === 'true'){
		            				 message.css('background','url(image/form/ok.jpg) no-repeat');
                                      text.val(' ');
                                      username_flag = true;  //用户名验证成功

		            			}else{
		            				message.css('background','url(image/form/error.jpg) no-repeat')
		            	                        .css('color','red');
		            	            text.val('User name already exists');
		            	            username_flag = false;
		            			}
		            		},
		            	});  //END AJax

		            }

		    });

	  });   //END 用户名验证

    

    //密码验证
    addEvent(fm.password,'focus',function(){

       var level = 0; //安全等级

       var message = wk('#User_Register  .messagePassword');
       var error = wk('#User_Register  .messagePassword_error');
       var ok = wk('#User_Register  .messagePassword_ok');

       var span_1 = wk('.messagePassword .password_1');
       var span_2 = wk('.messagePassword .password_2');
       var span_3 = wk('.messagePassword .password_3');

       var span_a = wk('.messagePassword .password_a');
       var span_b = wk('.messagePassword .password_b');
       var span_c = wk('.messagePassword .password_c');

       var span_text = wk('.messagePassword .password_flag');


       addEvent(fm.password,'keyup',function(){

           if(fm.password.value.length < 5){
           	  ok.hide();
           	  error.show();
           	  message.hide();
           }else{
              ok.hide();
           	  error.hide();
           	  message.show();

              //小写
           	  if(fm.password.value.match(/^.*[a-z]+/)){
           	  	level++;
           	  	span_a.css('color','#00FF00');
           	  }else{
           	  	span_a.css('color','#F30');
           	  }

              //大写
           	  if(fm.password.value.match(/^.*[A-Z]+/)){
           	  level++;   
           	  	span_b.css('color','#00FF00');
           	  }else{
           	  	span_b.css('color','#F30');
           	  }

              //长度
           	  if(fm.password.value.length >12){
           	  	level++;
           	  	span_c.css('color','#00FF00');
           	  }else{
           	  	span_c.css('color','#F30');
           	  }
              


           	  switch(level){
           	  	case 1:
                  span_1.css('color','#00FF00');
                  span_2.css('color','#F30');
                  span_3.css('color','#F30');
                  span_text.val('low');
                  span_text.css('color','#F30');
                  break;

                case 2:
                  span_1.css('color','#00FF00');
                  span_2.css('color','#00FF00');
                  span_3.css('color','#F30');
                  span_text.val('medium');
                  span_text.css('color','#F30');
                  break;


                case 3:
                  span_1.css('color','#00FF00');
                  span_2.css('color','#00FF00');
                  span_3.css('color','#00FF00');
                  span_text.val('height');
                  span_text.css('color','#00FF00');
                  break;


                default:
                  span_1.css('color','#F30');
                  span_2.css('color','#F30');
                  span_3.css('color','#F30');
                  span_text.val('low');
                  span_text.css('color','#F30');
                  break;

                   
           	  }

           	  level = 0;  //用完清除 不累加



           } //密码强度验证 END

 
       });//键盘检测结束

        //失去焦点
	    addEvent(fm.password,'blur',function(){
           
           if(fm.password.value.length > 5){
           	    message.hide();
                error.hide();
                ok.show();
                userpassword_flag = true;
           }else{
              	message.hide();
	           	ok.hide();
	           	error.show();
                userpassword_flag = false;
           }

	    });

    }); //END 密码验证

   
    //密码确认验证
    addEvent(fm.confirm_pd,'blur',function(){

    	var message = wk('#User_Register .messagePassword_VE');
    	var span = wk('.messagePassword_VE span');

    	if(fm.confirm_pd.value === fm.password.value){
    		message.css('background','url(image/form/ok.jpg) no-repeat');
    		span.val(' ');
    		userconfirm_pd_flag = true;
    	}else{
    		message.css('background','url(image/form/error.jpg) no-repeat');
    		span.val("two passwords don't match");
    		userconfirm_pd_flag = false;
    	}

    });
           
    


    //邮箱验证
    addEvent(fm.useremail,'focus',function(){
       
       //邮件补全
       var emall_add = wk('#User_Register .Emall_add');
       var emall_add_span = wk('.Emall_add span');
       var emall_add_p = wk('.Emall_add p');

       //提示信息
       var message = wk('#User_Register .messageEmall');
       var message_span = wk('.messageEmall span');

       //邮件补全
       addEvent(fm.useremail,'keyup',function(event){
         
         if(fm.useremail.value.indexOf('@') >-1){
           emall_add.hide();
         }else{
           emall_add.show();
           emall_add_span.val( fm.useremail.value );
         }
       });

      
      //获取值
      emall_add_p.click(function(){

           fm.useremail.value = this.innerText;
           emall_add.hide();
           if(! /^[\w\.\-]+@[\w\-\.]+(\.\w+)+$/.test(fm.useremail.value)){

            message.css('background','url(image/form/error.jpg) no-repeat')
                                               .css('color','red');
            message_span.val('E-mail format is not correct');
            useremail_flag = false;

          }else{
            message.css('background','url(image/form/ok.jpg) no-repeat')
            message_span.val(' ');
            useremail_flag = true;
          }

      });


      //失去光标验证
      addEvent(fm.useremail,'blur',function(){
          //emall_add.hide();

          if(fm.useremail.value.length <6 || fm.useremail.value.length >30){

             message.css('background','url(image/form/error.jpg) no-repeat')
                                               .css('color','red');
             message_span.val('Less than 6 greater than 30');
             useremail_flag = false;

          }else if(! /^[\w\.\-]+@[\w\-\.]+(\.\w+)+$/.test(fm.useremail.value)){

            message.css('background','url(image/form/error.jpg) no-repeat')
                                               .css('color','red');
            message_span.val('E-mail format is not correct');
            useremail_flag = false;

          }else{
            message.css('background','url(image/form/ok.jpg) no-repeat')
            message_span.val(' ');
            useremail_flag = true;
          }

      });

    });


  
    //备注信息字数限制
    addEvent(fm.product_detail,'keydown',function(event){
          var e = event||window.event;
           
          var code ; 
          
        
          var span = wk('#messageNumber');
          
          var len = fm.product_detail.value.length;
          var num = 200-len;

          if( num <= 0){
              span.val(num.toString());
              //如果字数超过只允许清除建输入
              if(sys.ie){
                code = keyCode;
              }else{
                code = arguments.callee.arguments[0].which;
              }
              if(code !== 8){
                preDef(e);
              }

          }else{
            span.val(num.toString());
          }
        
    });


    //用户点击提交
    addEvent(fm.register,'click',function(){
      

      //用户名信息提示框
      var message_name = wk('#User_Register  .messageName');
      var name_text = wk('#User_Register  .messageName span');
      //密码提示信息
      var message_password = wk('#User_Register  .messagePassword_error');
      //密码确认提示信息
      var message_VE = wk('#User_Register .messagePassword_VE');
      var VE_text = wk('.messagePassword_VE span');
      //邮箱提示框
      var message_email = wk('#User_Register .messageEmall');
      var email_text = wk('.messageEmall span');
      //注册提示
      var load = wk('.loading');

      
      //检查用户名
      if(! username_flag){
        message_name.css('background','url(image/form/error.jpg) no-repeat')
                                               .css('color','red');
        name_text.val('user name error');  

      }else if(! userpassword_flag){   //检查密码
        message_password.show();

      }else if(! userconfirm_pd_flag){  //密码核对
        message_VE.css('background','url(image/form/error.jpg) no-repeat');
        VE_text.val("two passwords don't match");

      }else if(! useremail_flag){  //邮箱核对
          message_email.css('background','url(image/form/error.jpg) no-repeat')
                                               .css('color','red');
          email_text.val('user email error'); 

      }else{   //Ajax注册

          //先生产一个随机码
           var code = Math.random();
          load.show();
          
          Ajax({
            type:'post',
            url:'code_library/register.php?rand='+code,
            data:{
            usertype : fm.usertype.value,                  //用户类型
            username : fm.username.value,                  //用户名
            password : fm.password.value,                  //密码
            confirm_pd: fm.confirm_pd.value,               //密码确认 
            head_portrait: fm.head_portrait.value,         //用户头像
            useremail: fm.useremail.value,                 //邮箱
            product_detail:  fm.product_detail.value,      //用户留言
            verification : fm.verification.value,           //验证码
            rand : code,                                    //随机码效验
            },

            flag : false,     //不采用异步使用同步方式

            success:function(text){
              load.hide();
            
              if(text.length !== 40){
                alert('Registration failed');
              }else{
                alert('Registered successfully');
                 location.reload();
              }

              
            }

          });
  
      }



    });
         
	
}







window.onload = function(){

    registered();
    verification();
}
