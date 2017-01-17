//翻页点击事件的click 在style嵌入 为了解决点击不断调整问题 用嵌套的话容易内存泄漏
function translate_s(than){


     var code = Math.random();


     var code = Math.random();
    //ajax获取用户信息 游客查询
     Ajax({
      type:'post',
      url:'code_library/View_member.php?rand='+code,
      data:{
        rand : code,
        page : wk(than).getAttr('alt'),
        select :wk('#type').val(),
        flag : getCookie('Rosim_flag'),
      },

      success:function(text){
          
          if(text !== 'null'){
            var data = json_parse(text);
           //  console.log(data); 
              //用户信息
            var user_name = wk('#user_name');
            var portrait = wk('#portrait');
            var user_type = wk('#user_type');
            var user_count = wk('#count');

            user_name.val('User Name:'+data['user']['user_name']);
            portrait.setAttr('src','head_portrait/'+data['user']['user_portrait']);
            user_type.val('User Type:'+data['user']['user_type']);
            user_count.val('A recent login: '+data['user']['count']);
              
            
              //查询用户信息
            var div = wk('#Query_uesr').returnElement(0);

            div.innerHTML = ' ';
           
              //获得总数
            apply_all = parseInt(data['user']['number']);
            
            //当前长度
            var len = data['page']['number'];
            //查询类型
            wk('#type').val(data['page']['type']);

            for(var i =0;i<len ;i++){
              var dl = document.createElement("dl");
                
                var text_1 ='<dd><img  src=head_portrait/'+data['apply'][i]['user_portrait']+' alt="portrait"/></dd>';
                var text_2 = '<dd>'+data['apply'][i]['user_name']+'</dd>';
                var text_3 = '<dd>last time to log: '+data['apply'][i]['user_lastdate']+'</dd>';
                var text_4 = '<dd>user Email: <br/>'+data['apply'][i]['user_email']+'</dd>';
                var text_5 = '<dd>ip :'+data['apply'][i]['user_ip']+'</dd>';

                  dl.innerHTML = text_1+text_2+text_3+text_4+text_5;
                  div.appendChild(dl);
                    
            }
            

               var text_all = '<li>The current '+(data['page']['page']+1)+'/'+data['page']['all']+' page |</li>'+'<li>total '+apply_all+' number data |</li>';
               
               //如果当前页 = 0
               if(data['page']['page'] == 0){
                var text_a = '<li>home page |<li>';
                var text_b = '<li>previous page |</li>';
               }else{
                var text_a = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+0+'>home page |</a></li>';
                var text_b = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['page']-1)+'>previous page |</a></li>';
               }
               //如果当前页到了尾
               if(data['page']['page']+1 == data['page']['all']){
                var text_c = '<li>previous page |</li>';
                var text_d = '<li>back page |<li>';
               }else{
                var text_c = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['page']+1)+'>next page |</a></li>';
                var text_d = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['all']-1)+'>back page |</a></li>'
               }

               wk('#page').html(text_all + text_a+text_b+text_c+text_d);

                   
          }   
          
      }


    });  //END AJAX  


};










window.onload = function(){
        

      //获得表单
    var fm = document.getElementById('View_member_form');

    var apply_all; //查询总数

    var code = Math.random();
    //ajax获取用户信息 游客查询
    Ajax({
      type:'post',
      url:'code_library/View_member.php?rand='+code,
      data:{
        rand : code,
        flag : getCookie('Rosim_flag'),
      },

      success:function(text){
          
          if(text !== 'null'){
            var data = json_parse(text);
             //console.log(data); 
              //用户信息
            var user_name = wk('#user_name');
            var portrait = wk('#portrait');
            var user_type = wk('#user_type');
            var user_count = wk('#count');

            user_name.val('User Name:'+data['user']['user_name']);
            portrait.setAttr('src','head_portrait/'+data['user']['user_portrait']);
            user_type.val('User Type:'+data['user']['user_type']);
            user_count.val('A recent login: '+data['user']['count']);
              
            
              //查询用户信息
            var div = wk('#Query_uesr').returnElement(0);
           
              //获得总数
            apply_all = parseInt(data['user']['number']);
            
            //当前长度
            var len = data['page']['number'];
            //查询类型
            wk('#type').val(data['page']['type']);

            for(var i =0;i<len ;i++){
              var dl = document.createElement("dl");
                
                var text_1 ='<dd><img  src=head_portrait/'+data['apply'][i]['user_portrait']+' alt="portrait"/></dd>';
                var text_2 = '<dd>'+data['apply'][i]['user_name']+'</dd>';
                var text_3 = '<dd>last time to log: '+data['apply'][i]['user_lastdate']+'</dd>';
                var text_4 = '<dd>user Email:<br/> '+data['apply'][i]['user_email']+'</dd>';
                var text_5 = '<dd>ip :'+data['apply'][i]['user_ip']+'</dd>';

                  dl.innerHTML = text_1+text_2+text_3+text_4+text_5;
                  div.appendChild(dl);
                    
            }
            

               var text_all = '<li>The current '+(data['page']['page']+1)+'/'+data['page']['all']+' page |</li>'+'<li>total '+apply_all+' number data |</li>';
               
               //如果当前页 = 0
               if(data['page']['page'] == 0){
                var text_a = '<li>home page |<li>';
                var text_b = '<li>previous page |</li>';
               }else{
                var text_a = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+0+'>home page |</a></li>';
                var text_b = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['page']-1)+'>previous page |</a></li>';
               }
               //如果当前页到了尾
               if(data['page']['page']+1 == data['page']['all']){
                var text_c = '<li>previous page |</li>';
                var text_d = '<li>back page |<li>';
               }else{
                var text_c = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['page']+1)+'>next page |</a></li>';
                var text_d = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['all']-1)+'>back page |</a></li>'
               }

               wk('#page').html(text_all + text_a+text_b+text_c+text_d);

                   
          }   
          
      }


    });  //END AJAX  

    
    //用户选择查询
    addEvent(fm.submit,'click',function(){
        code = Math.random();

         Ajax({
            type:'post',
            url:'code_library/View_member.php?rand='+code,
            data:{
              rand : code,
              flag : getCookie('Rosim_flag'),
              select : fm.select.value,
            },

            success:function(text){
                
                if(text !== 'null'){
                  var data = json_parse(text);
                   //console.log(data); 
                    //用户信息
                  var user_name = wk('#user_name');
                  var portrait = wk('#portrait');
                  var user_type = wk('#user_type');
                  var user_count = wk('#count');

                  user_name.val('User Name:'+data['user']['user_name']);
                  portrait.setAttr('src','head_portrait/'+data['user']['user_portrait']);
                  user_type.val('User Type:'+data['user']['user_type']);
                  user_count.val('A recent login: '+data['user']['count']);
                    
                  
                    //查询用户信息
                  var div = wk('#Query_uesr').returnElement(0);

                  div.innerHTML = ' ' ;
                 
                    //获得总数
                  apply_all = parseInt(data['user']['number']);
                  
                  //当前长度
                  var len = data['page']['number'];
                  //查询类型
                  wk('#type').val(data['page']['type']);

                  for(var i =0;i<len ;i++){
                    var dl = document.createElement("dl");
                      
                      var text_1 ='<dd><img  src=head_portrait/'+data['apply'][i]['user_portrait']+' alt="portrait"/></dd>';
                      var text_2 = '<dd>'+data['apply'][i]['user_name']+'</dd>';
                      var text_3 = '<dd>last time to log: '+data['apply'][i]['user_lastdate']+'</dd>';
                      var text_4 = '<dd>user Email: <br/> '+data['apply'][i]['user_email']+'</dd>';
                      var text_5 = '<dd>ip :'+data['apply'][i]['user_ip']+'</dd>';

                        dl.innerHTML = text_1+text_2+text_3+text_4+text_5;
                        div.appendChild(dl);
                          
                  }
                  

                     var text_all = '<li>The current '+(data['page']['page']+1)+'/'+data['page']['all']+' page |</li>'+'<li>total '+apply_all+' number data |</li>';
                     
                     //如果当前页 = 0
                     if(data['page']['page'] == 0){
                      var text_a = '<li>home page |<li>';
                      var text_b = '<li>previous page |</li>';
                     }else{
                      var text_a = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+0+'>home page |</a></li>';
                      var text_b = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['page']-1)+'>previous page |</a></li>';
                     }
                     //如果当前页到了尾
                     if(data['page']['page']+1 == data['page']['all']){
                      var text_c = '<li>previous page |</li>';
                      var text_d = '<li>back page |<li>';
                     }else{
                      var text_c = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['page']+1)+'>next page |</a></li>';
                      var text_d = '<li><a href="#" onclick='+'translate_s(this)'+'  alt='+(data['page']['all']-1)+'>back page |</a></li>'
                     }

                     wk('#page').html(text_all + text_a+text_b+text_c+text_d);

                         
                }   
                
            }


        });  //END AJAX  


    });



}