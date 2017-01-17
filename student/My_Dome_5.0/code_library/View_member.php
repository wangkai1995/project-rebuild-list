<?php

header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);


//调用核心函数库
require 'code_library.php';



//判断是否有提交
if(isset($_POST['rand']) && isset($_GET['rand']) ){

	   //连接数据库
	   $Mysql = _mysql_connect();
	   _mysql_select_bd($Mysql);
	   $Mysql = _mysql_query('SET NAMES UTF8');

	   //效验用户
	   $VE_query =  "SELECT * FROM usermessage WHERE user_flag='{$_POST['flag']}';" ;  
	   $VE_user = _mysql_fetch_array($VE_query,'User name does not exist');

       //判断是否是管理员
	   if($VE_user['user_type'] == 'Administrator' && $VE_user['user_jurisdiction'] >6)


         


	    	//是否是用户查询
	    	if(isset($_POST['select']))
	    	{
	    		$query_flag = $_POST['select'];
	    		
	    	}
	    	
	    	
	    	if(isset($query_flag)){
	    	
	           if($query_flag == 'tourist'){
	    			$apply_querys = "SELECT user_type,user_portrait,user_name,user_setdate,user_lastdate,user_email,user_ip  FROM usermessage WHERE user_type='$query_flag' OR user_jurisdiction =0 ;";
	    			$apply_result = _mysql_query($apply_querys);
	    				
	    		}else{
	    			$apply_querys = "SELECT user_type,user_portrait,user_name,user_setdate,user_lastdate,user_email,user_ip  FROM usermessage WHERE user_type='$query_flag' AND user_jurisdiction >0 ;";
	    			$apply_result = _mysql_query($apply_querys);
	    		}
         
	    	}else{
	    		//默认查询游客
	    		$apply_querys = "SELECT user_type FROM usermessage WHERE user_type='tourist'  OR user_jurisdiction =0 ;";
	    		$apply_result = _mysql_query($apply_querys);
	    	}
	    		
	    			        	
	    	//查询数量
	    	$numbei = mysql_num_rows($apply_result);
	    	
	    	//页面最大显示
	    	$pagesize = 12;	 //
	    	$page_all = ceil($numbei/$pagesize);  //全部页面


         $user = array();  //用户信息的集合

          $user['user_name'] = $VE_user['user_name'];
          $user['user_type'] = $VE_user['user_type'];
          $user['count'] = $VE_user['user_count'];
          $user['user_portrait'] = $VE_user['user_portrait'];
          $user['number'] = $numbei;
	
	    	   //翻页
	    	   if( isset($_POST['page']) )
	    	   {  
	    	   	   if( $_POST['page'] < 0 || !is_numeric($_POST['page']) || $_POST['page'] >$page_all)
	    	   	  
	    	   	    { $_page = 0;}
	    	           else
	    	        { $_page = $_POST['page'];}
	    	   }
	    	   else 
	    	   {$_page = 0;}
		           
	    	   //是否有用户查询
	    	   if(isset($query_flag)){
	    	   	  
	    	   	    if($query_flag == 'tourist'){
	    	   		   $apply_querys = "SELECT user_type,user_portrait,user_name,user_setdate,user_lastdate,user_email,user_ip  FROM usermessage WHERE user_type='$query_flag' OR user_jurisdiction =0  LIMIT  ".($_page*$pagesize)." ,$pagesize;";
	    	   		   $apply_result = _mysql_query($apply_querys);
	    	   		
	    	    	 }else{
	    	   	         $apply_querys = "SELECT user_type,user_portrait,user_name,user_setdate,user_lastdate,user_email,user_ip  FROM usermessage WHERE user_type='$query_flag' AND user_jurisdiction >0 LIMIT  ".($_page*$pagesize)." ,$pagesize;";
	    	             $apply_result = _mysql_query($apply_querys);
	    	   	    }
	    	   }else{
	    	   	  //查询数据
		         $apply_querys = "SELECT user_type,user_portrait,user_name,user_setdate,user_lastdate,user_email,user_ip  FROM usermessage WHERE user_type='tourist' OR user_jurisdiction =0  LIMIT  ".($_page*$pagesize)." ,$pagesize;";
		         $apply_result = _mysql_query($apply_querys);
	    	   }



          $data = array();//查询数据的集合

           $i = 0;
           while(!!$_user = mysql_fetch_array($apply_result,MYSQL_ASSOC)){
             
              $data[$i]['user_name'] =  $_user['user_name'];
              $data[$i]['user_type'] =  $_user['user_type'];
              $data[$i]['user_email'] = $_user['user_email'];
              $data[$i]['user_lastdate'] = $_user['user_lastdate'];
              $data[$i]['user_ip'] = $_user['user_ip'];
              $data[$i]['user_portrait'] = $_user['user_portrait'];
              
              $i++;

           }



           $page = array();
           $page['all'] =  $page_all;
           $page['page'] = (int)$_page;
           $page['number'] = $i;

           if(isset($query_flag)){
             $page['type'] = $query_flag;
           }else{
              $page['type']  = 'tourist';
           }

           $all =  array( );

           $all['user'] = $user;
           $all['apply'] = $data;
           $all['page'] = $page;

           echo json_encode($all);


	    }
	    


?>
