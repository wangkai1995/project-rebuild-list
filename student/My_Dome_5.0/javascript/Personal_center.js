
window.onload = function(){
       
       //判断是否登录
    if(getCookie('Rosim_flag') && getCookie('Rosim_user')){
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
          flag:getCookie('Rosim_flag'),
        },

        success:function(text){

          if(text !== 'null'){

               var data =json_parse(text);
              
              //是否是管理员
              if(typeof data['flag'] !== 'undefined' && data['flag'] === true){

                var text1 ="<dd class='head'><a href='Personal_apply.html'>"+data['number']+" a New Membership application</a></dd>";
                var text2 ="<dd><a href='View_member.html'>View all other member information</a></dd>";

                wk('#administrator').html(text1+text2);
              }

              //用户个人资料
              var text_a = '<dd>User Name:'+data['user_name']+'</dd>';
              var text_b = '<dd>account type:'+data['user_type']+'</dd>';
              var text_c = '<dd>Email:'+data['user_email']+'</dd>';
              var text_d = '<dd>Sign up for an account of time:'+data['user_setdate']+'</dd>';
              var text_e = '<dd>The last login time:'+data['user_lastdate']+'</dd>';
              var text_f = '<dd>login ip:'+data['user_ip']+'</dd>';
              var text_g = '<dd>A total of logins:'+data['user_count']+'</dd>';

              wk('#user_message').html(text_a+text_b+text_c+text_d+text_e+text_f+text_g);
              //头像
              wk('#portrait').setAttr('src','head_portrait/'+data['user_portrait']);

              load.hide();
          
           }

        },


      });   //END AJAX

       




    }else{
       alert('Please login first');
       location.href='login.html';
    }

}