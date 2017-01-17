<?php

header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);


//调用核心函数库
require 'code_library.php';





//判断是否有提交
if(isset($_POST['rand']) && isset($_GET['rand']) ){


    
     //审核提交
     if( isset($_POST['action'] ) && $_POST['action'] != 'null'){



      	//得到数组变量 和数组长度       里面存放着用户名
      	$selet = $_POST['select'];
        $selet = explode(',',$selet);  //转化成数组
      	$len = count($selet);

      	//连接数据库
      	$Mysql = _mysql_connect();
      	_mysql_select_bd($Mysql);
      	$Mysql = _mysql_query('SET NAMES UTF8');
      	
      	
      	for($i = 0;$i<$len;$i++)
      	{
      		$user_up_query = "SELECT user_type FROM usermessage WHERE user_name ='$selet[$i]';";

      		$user_up_type = _mysql_fetch_array($user_up_query);

      				
      		//判断用户的类型
      		switch ($user_up_type['user_type'])
      		{   
      			//会员 权限等级是1
      			case 'members':
      				$up = "UPDATE usermessage SET user_jurisdiction =1 WHERE user_name='$selet[$i]'; ";
      				 _mysql_query($up);	
      				 break;	
      			//客户  权限等级是3
      			case 'client':
      				$up = "UPDATE usermessage SET user_jurisdiction =3 WHERE user_name='$selet[$i]'; ";
      				_mysql_query($up);
      				break;
      			//管理员 权限等级是7
      			case 'Administrator':
      				$up = "UPDATE usermessage SET user_jurisdiction =7 WHERE user_name='$selet[$i]'; ";
      				_mysql_query($up);
      				break;
      		}
      	}
      	 
      	//关闭mysql数据库
      	mysql_close();
        echo sha1('true');
        exit();

    }


 
       //检测是否是查询
     if( isset($_POST['query'] ) && $_POST['query'] != 'null'){


  	   //连接数据库
  	   $Mysql = _mysql_connect();
  	   _mysql_select_bd($Mysql);
  	   $Mysql = _mysql_query('SET NAMES UTF8');

  	   //这里是防止伪造cookie
  	   $VE_query =  "SELECT * FROM usermessage WHERE user_flag='{$_POST['flag']}';" ;  //查询表中的用用户名
  	   $VE_user = _mysql_fetch_array($VE_query);
       



         //查询当前用户类型 是否是管理员
  	   if($VE_user['user_type'] == 'Administrator' && $VE_user['user_jurisdiction'] >6){


  	    	//查询游客以上申请
  	    	$apply_querys = "SELECT user_type  FROM usermessage WHERE user_type != 'tourist' AND  user_jurisdiction = 0 ;";
  	    	$apply_result = _mysql_query($apply_querys);
  	    	//得到申请数量
  	    	$numbei = mysql_num_rows($apply_result);

          $user = array();  //用户信息的集合

          $user['user_name'] = $VE_user['user_name'];
          $user['user_type'] = $VE_user['user_type'];
          $user['count'] = $VE_user['user_count'];
          $user['number'] = $numbei;
          $user['user_portrait'] = $VE_user['user_portrait'];



  	    	
  	    	$pagesize = 15;	 //页面最大个数
  	    	$page_all = ceil($numbei/$pagesize);  //分页的总数
  	
  	    	   //检测是否收到用户提交的页面信息
  	    	   if( isset($_POST['page']) )
  	    	   { 
  	    	   	   if( $_POST['page'] < 0 || !is_numeric($_POST['page']) || $_POST['page'] >$page_all)
  	    	   	    //传递的格式不正确则默认显示0
  	    	   	    { $_page = 0;}
  	    	           else
  	    	        { $_page =(int)$_POST['page'];}
  	    	   }
  	    	   else 
  	    	   {$_page = 0;}


         
  		           
  		     $apply_querys = "SELECT user_type,user_name,user_setdate,user_lastdate,user_detail,user_ip  FROM usermessage WHERE user_type != 'tourist' AND  user_jurisdiction = 0 LIMIT ".($_page*$pagesize)." ,$pagesize;";
  		     $apply_result = _mysql_query($apply_querys);
           
           $data = array();//查询数据的集合

           $i = 0;
           while(!!$_user = mysql_fetch_array($apply_result,MYSQL_ASSOC)){
             
              $data[$i]['user_name'] =  $_user['user_name'];
              $data[$i]['user_type'] =  $_user['user_type'];
              $data[$i]['user_setdate'] = $_user['user_setdate'];
              $data[$i]['user_lastdate'] = $_user['user_lastdate'];
              $data[$i]['user_detail'] = $_user['user_detail'];
              $data[$i]['user_ip'] = $_user['user_ip'];
              
              $i++;

           }


           $page = array();
           $page['all'] =  $page_all;
           $page['page'] = $_page;
           $page['number'] = $i;

           $all =  array( );

           $all['user'] = $user;
           $all['apply'] = $data;
           $all['page'] = $page;

           echo json_encode($all);
  	   
  	    }
      }

      
}



    
    
?>
