
window.onload = function(){
       
       //判断是否登录
    if(getCookie('Rosim_flag') && getCookie('Rosim_user')){
      

      var username_flag = false;      //用户名验证标志

      var userpassword_flag = false;  //密码验证标志

      var user_old_password_flag = false;  //旧密码验证标志

      var userconfirm_pd_flag = false;  //密码确认验证标志

      var useremail_flag = false;       //邮箱验证标志



      //获得表单
      var fm = document.getElementById('Personal_Modify');
      //加载信息
      var load = wk('#loading');
      load.show();
      //随机码
      var code = Math.random();
      

      Ajax({
        type:'post',
        url:'code_library/Personal_center.php?rand='+code,
        data:{
          rand:code,
          Query:true,
          flag:getCookie('Rosim_flag'),
        },

        success:function(text){

          if(text !== 'null'){
               
               var fm = wk('#Personal_Modify').returnElement(0);
               var data =json_parse(text);
              
              //是否是管理员
              if(typeof data['flag'] !== 'undefined' && data['flag'] === true){

                var text1 ="<dd class='head'><a href='Personal_apply.html'>"+data['number']+" a New Membership application</a></dd>";
                var text2 ="<dd><a href='View_member.html'>View all other member information</a></dd>";

                wk('#administrator').html(text1+text2);
              }

              //用户个人资料
              wk('#user_type').val('The current account type:'+data['user_type']);
              fm.username.value = data['user_name'];
              fm.useremail.value = data['user_email'];
              

              //头像
              wk('#portrait').setAttr('src','head_portrait/'+data['user_portrait']);

              load.hide();
          
           }

        },

      });   //END AJAX查询


    //验证用户名
    addEvent(fm.username,'focus',function(){
      //开始验证
      //信息提示框
      var message = wk('#user_centre .messageName');
      //信息提示文字
      var text = wk('.messageName span'); 


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
                    url:'code_library/Personal_Modify.php?rand='+Math.random(),
                    data:{
                      user_ve:'name',
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

    
    //旧密码验证
    addEvent(fm.now_password,'blur',function(){
      var message = wk('.messageNow');
      var text = wk('.messageNow span');

        if(fm.username.value.length <6 ){
               //AJAX验证旧密码是正确
                  Ajax({
                    type:'get',
                    url:'code_library/Personal_Modify.php?rand='+Math.random(),
                    data:{
                      user_ve : 'password',
                      user_password : fm.now_password.value,
                      user_flag : getCookie('Rosim_flag'),
                    },

                    success : function(messages){
                      if(messages === 'true'){
                         message.css('background','url(image/form/ok.jpg) no-repeat');
                                      text.val(' ');
                                      user_old_password_flag = true;  //用户名验证成功

                      }else{
                        message.css('background','url(image/form/error.jpg) no-repeat')
                                          .css('color','red');
                              text.val('The old password mistake');
                              user_old_password_flag = false;
                      }
                    },
                  });  //END AJax
        }else{
          message.css('background','url(image/form/error.jpg) no-repeat')
                                          .css('color','red');
                              text.val('The old password mistake');
                              user_old_password_flag = false;
        }


    });

    
    //密码验证
    addEvent(fm.new_password,'focus',function(){

       var level = 0; //安全等级

       var message = wk('.messagePassword');
       var error = wk('.messagePassword_error');
       var ok = wk('.messagePassword_ok');

       var span_1 = wk('.messagePassword .password_1');
       var span_2 = wk('.messagePassword .password_2');
       var span_3 = wk('.messagePassword .password_3');

       var span_a = wk('.messagePassword .password_a');
       var span_b = wk('.messagePassword .password_b');
       var span_c = wk('.messagePassword .password_c');

       var span_text = wk('.messagePassword .password_flag');


       addEvent(fm.new_password,'keyup',function(){

           if(fm.new_password.value.length < 5){
              ok.hide();
              error.show();
              message.hide();
           }else{
              ok.hide();
              error.hide();
              message.show();

              //小写
              if(fm.new_password.value.match(/^.*[a-z]+/)){
                level++;
                span_a.css('color','#00FF00');
              }else{
                span_a.css('color','#F30');
              }

              //大写
              if(fm.new_password.value.match(/^.*[A-Z]+/)){
              level++;   
                span_b.css('color','#00FF00');
              }else{
                span_b.css('color','#F30');
              }

              //长度
              if(fm.new_password.value.length >12){
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
      addEvent(fm.new_password,'blur',function(){
           
           if(fm.new_password.value.length > 5){
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


    
    ///密码确认验证
    addEvent(fm.confirm_password,'blur',function(){

      var message = wk('.messagePassword_VE');
      var span = wk('.messagePassword_VE span');

      if(fm.confirm_password.value === fm.new_password.value){
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
       var emall_add = wk('.Emall_add');
       var emall_add_span = wk('.Emall_add span');
       var emall_add_p = wk('.Emall_add p');

       //提示信息
       var message = wk('.messageEmall');
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

    
    //提交
    addEvent(fm.sunmit,'click',function(){

      var userName = 'null',
          userType = 'null' ,
          userPassword = 'null',
          userEmail = 'null';


          userType = fm.usertype.value;

          if(username_flag){
            userName = fm.username.value;
          }

          if(userpassword_flag && user_old_password_flag && userconfirm_pd_flag ){
            userPassword = fm.confirm_password.value;
          }

          if(useremail_flag){
            userEmail = fm.useremail.value;
          }

          code = Math.random();

          Ajax({
            type:'post',
            url:'code_library/Personal_Modify.php?rand='+code,
            data:{
               rand : code,
               action : 'true',
               flag : getCookie('Rosim_flag'),
               usertype : userType,
               username : userName,
               useremail : userEmail,
               new_password : userPassword,
             },
              flag : false,     //不采用异步使用同步方式

             success :function(text){
             // alert(text);

               if(text.length !== 40){
                alert('Registration failed');
              }else{
                alert('Registered successfully');
                location.reload();
              }

             },

          });

    });






       
    }else{
       alert('Please login first');
       location.href='login.html';
    }

}