
//翻页点击事件的click 在style嵌入 为了解决点击不断调整问题 用嵌套的话容易内存泄漏
function translate_s(than){


      var code = Math.random();

	          Ajax({
			    	type:'post',
			    	url:'code_library/Personal_apply.php?rand='+code,
			    	data:{
			    		rand : code,
			    		query : 'true',
			    		page : wk(than).getAttr('alt'),
			    		flag : getCookie('Rosim_flag'),
			    	},

                    success:function(text){

                    	if(text !== 'null'){
	                       var data = json_parse(text);
		                  // console.log(data); 

		                    //申请用户信息
					        var table = wk('#userApply_message').returnElement(0);
					        //清空一下
					        table.innerHTML = '';
					         
					        var len = parseInt(data['page']['number']);
					        var apply_all = parseInt(data['user']['number']);

					        for(var i =0;i<len ;i++){
					          	var tr = document.createElement("tr");
				                
				                var text_1 ='<td><input type="checkbox" name="select[]" value='+data['apply'][i]['user_name']+'></td>';
				                var text_2 = '<td>'+data['apply'][i]['user_name']+'</td>';
				                var text_3 = '<td>'+data['apply'][i]['user_type']+'</td>';
				                var text_4 = '<td>'+data['apply'][i]['user_setdate']+'</td>';
				                var text_5 = '<td>'+data['apply'][i]['user_lastdate']+'</td>'
				                var text_6 = '<td><button  alt='+data['apply'][i]['user_detail']+' title ='+data['apply'][i]['user_ip']+'>View detailed</button></td>';

					          	    tr.innerHTML = text_1+text_2+text_3+text_4+text_5+text_6;
				                    table.appendChild(tr);
				                      Query_messahe();
					         }

					          var text_all = '<li>The current'+(data['page']['page']+1)+'/'+data['page']['all']+' page |</li>'+'<li>total '+apply_all+' number data |</li>';
               
				               //如果当前页 = 0
				               if(data['page']['page'] === 0){
				               	var text_a = '<li>home page |<li>';
				               	var text_b = '<li>previous page |</li>';
				               }else{
				               	var text_a = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+0+'>home page |</a></li>';
				               	var text_b = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['page']-1)+'>previous page |</a></li>';
				               }
				               //如果当前页到了尾
				               if(data['page']['page']+1 === data['page']['all']){
				               	var text_c = '<li>previous page |</li>';
				               	var text_d = '<li>back page |<li>';
				               }else{
				               	var text_c = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['page']+1)+'>next page |</a></li>';
				               	var text_d = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+(data['page']['all']-1)+'>back page |</a></li>'
				               }

				               wk('#page').html(text_all + text_a+text_b+text_c+text_d);

				             }
				          }   

				       }); 

};



//查看用户信息
function Query_messahe(){
	var div = wk('#user_message');
	var text_ip = wk('#user_message .text_ip').returnElement();
	var text_message = wk('#user_message .text_message').returnElement();
	
	wk('button').click(function(event){
		div.show().setCenter();
		if(this.getAttribute !== 'undefined'){
			text_ip.innerText = this.getAttribute('title');
			text_message.innerText = this.getAttribute('alt');
		}else{
			text_ip.innerText = this.title;
			text_message.innerText = this.alt;
		}
		preDef(event);
	});
	
	wk('#user_message img').click(function(){
		div.hide();
	});
	
	wk('#user_message').drag();
};





window.onload = function(){


     //获得表单
    var fm = document.getElementById('new_user_apply_form');

    var apply_all; //申请总数

    var code = Math.random();
    //ajax获取用户信息
    Ajax({
    	type:'post',
    	url:'code_library/Personal_apply.php?rand='+code,
    	data:{
    		rand : code,
    		query : 'true',
    		flag : getCookie('Rosim_flag'),
    	},

    	success:function(text){
          
          if(text !== 'null'){
	          var data = json_parse(text);
	          // console.log(data); 
              //用户信息
	          var user_name = wk('#user_name');
	          var portrait = wk('#portrait');
	          var user_type = wk('#user_type');
	          var apply_number = wk('#number');
	          var user_count = wk('#count');

	          user_name.val('User Name:'+data['user']['user_name']);
	          portrait.setAttr('src','head_portrait/'+data['user']['user_portrait']);
	          user_type.val('User Type:'+data['user']['user_type']);
	          apply_number.val('Message:'+data['user']['number']+' A New Apply');
	          user_count.val('A recent login: '+data['user']['count']);
              
              //申请用户信息
	          var table = wk('#userApply_message').returnElement(0);
	         
              //获得总数
	          apply_all = parseInt(data['user']['number']);
	          
	          //当前长度
	          var len = data['page']['number'];

	          for(var i =0;i<len ;i++){
	          	var tr = document.createElement("tr");
                
                var text_1 ='<td><input type="checkbox" name="select[]" value='+data['apply'][i]['user_name']+' ></td>';
                var text_2 = '<td>'+data['apply'][i]['user_name']+'</td>';
                var text_3 = '<td>'+data['apply'][i]['user_type']+'</td>';
                var text_4 = '<td>'+data['apply'][i]['user_setdate']+'</td>';
                var text_5 = '<td>'+data['apply'][i]['user_lastdate']+'</td>'
                var text_6 = '<td><button  alt='+data['apply'][i]['user_detail']+' title ='+data['apply'][i]['user_ip']+'>View detailed</button></td>';

	          	    tr.innerHTML = text_1+text_2+text_3+text_4+text_5+text_6;
                    table.appendChild(tr);
                      Query_messahe();
	          }

               var text_all = '<li>The current'+(data['page']['page']+1)+'/'+data['page']['all']+' page |</li>'+'<li>total '+apply_all+' number data |</li>';
               
               //如果当前页 = 0
               if(data['page']['page'] == 0){
               	var text_a = '<li>home page |<li>';
               	var text_b = '<li>previous page |</li>';
               }else{
               	var text_a = '<li><a href="#" onclick='+'translate_s(this)'+' alt='+0+'>home page |</a></li>';
               	var text_b = '<li><a href="#" onclick='+'translate_s(this)'+'alt='+(data['page']['page']-1)+'>previous page |</a></li>';
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


    var fm  = document.getElementById("new_user_apply_form");


    //提交审核
    addEvent(fm.submit,'click',function(){
    	var selects = [];

    	var links =    document.getElementsByTagName('input');

        //获取选中了的节点的内容
        for(var i =0, lens = links.length-1 ; i<lens ;i++ ){
        	if(links[i].type === 'checkbox'){
        		if(links[i].checked){
        			selects.push(links[i].value);
        		}
        	}
        }

        console.log(selects);

        Ajax({
    	type:'post',
    	url:'code_library/Personal_apply.php?rand='+code,
    	data:{
    		rand : code,
    		action : 'true',
    		select : selects,
    	},

    	success:function(text){
    		if(text !=='null' && text.length === 40){
    			alert('Review the success');
    			location.reload();

    		}else{
    			alert('Audit failure');
    		}

    	},

       });  //END AJax
   });

}





