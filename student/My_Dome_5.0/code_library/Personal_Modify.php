<?php
 

header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);


//调用核心函数库
require 'code_library.php';

 

     //判断是否验证用户名
	if(isset($_GET['user_ve'])){


		if($_GET['user_ve'] == 'name'){

	    $user_name = _username($_GET['user_name']);
	   // $user_flag = ($_GET['uuser_password']

	    //连接数据库
	    $Mysql = _mysql_connect();
	    //选择数据库
	    _mysql_select_bd($Mysql);
	    //设置字符集格式
	    $Mysql = _mysql_query('SET NAMES UTF8');
	    //检测是否用户名是否存在
	    if( _mysql_query_user('usermessage', 'user_name', $user_name))
	    { 
	        echo 'false';
	    }else{

	       echo 'true'; 
	    }
	    
	   exit();


      //判断是否查询旧密码
	}else if( $_GET['user_ve'] == 'password'){

	    $user_password = sha1(md5($_GET['user_password'])) ;
	    $user_flag = $_GET['user_flag'];

	    //连接数据库
	    $Mysql = _mysql_connect();
	    //选择数据库
	    _mysql_select_bd($Mysql);
	    //设置字符集格式
	    $Mysql = _mysql_query('SET NAMES UTF8');
	    $query = "SELECT user_password FROM usermessage	WHERE user_flag = '$user_flag' LIMIT 1";

	    $data = _mysql_fetch_array($query);

	    if($data['user_password'] == $user_password){
            echo 'true';
	    }else{
	    	echo 'false' ;
	    }

	  
	   exit();
	}

}

	//判断是否有提交
	if(isset($_POST['rand']) && isset($_GET['rand'])){

		//验证非法提交
	    if($_POST['rand'] !== $_GET['rand'] )
	    {echo null; exit();}
	     

	    //验证是否是用户查询 
	    if(isset($_POST['Query']) && $_POST['Query'] === ture){
 
			//连接数据库并设置字符串
			$Mysql = _mysql_connect();
			_mysql_select_bd($Mysql);
			$Mysql = _mysql_query('SET NAMES UTF8');
			
			
			$query = "SELECT *       
		              FROM usermessage
			          WHERE user_flag = '{$_POST['flag']}' LIMIT 1;";
			
			 //得到用户资料
			 $user = _mysql_fetch_array($query);
			 //查询当前用户类型 是否是管理员
			 if($user['user_type'] == 'Administrator' && $user['user_jurisdiction'] >6)
			 {
			 	//查询游客以上申请
			 	$apply_querys = "SELECT user_type  FROM usermessage WHERE user_type != 'tourist' AND  user_jurisdiction = 0 ;";
			 	$apply_result = _mysql_query($apply_querys);
			 	//得到申请数量
			 	$number = mysql_num_rows($apply_result);

			 	//管理员标志 设置
			 	$Administrator_flag = true;
			 }
			 // 关闭数据库	
			 mysql_close();	

		    //数据打包
		    $data = array();
		    
		    $data['user_name'] = $user['user_name'];
		    $data['user_type'] = $user['user_type'];
		    $data['user_portrait'] = $user['user_portrait'];
		    $data['user_email'] = $user['user_email'];
		    
		     if(isset($Administrator_flag)){
		     	$data['flag'] = true;
		     }
		     if(isset($number)){
		     	$data['number'] = $number;
		     }


		     echo json_encode($data);
		     exit();
	     } //END 查询



			
		
		
		//判断是否有提交
		if(isset($_POST['action'])){

			if($_POST['action'] != 'true')
			{echo '非法提交'; exit();}
            

			 //连接数据库并设置字符串
			$Mysql = _mysql_connect();
			_mysql_select_bd($Mysql);
			$Mysql = _mysql_query('SET NAMES UTF8');
           
            /*
			$query = "SELECT user_type,
			                 user_name,
			                 user_email,
			                 user_portrait,
			                FROM usermessage
			WHERE user_flag = '{$_POST['flag']}' LIMIT 1;";
            

			//得到用户资料
			$user = _mysql_fetch_array($query);

			*/

			
		    //是否用户修改用户名
			if( $_POST['username']!= 'null' ){
	            $user_data_name=_username($_POST['username']);
	            
	            $up =  "UPDATE usermessage SET user_name ='$user_data_name' WHERE user_flag = '{$_POST['flag']}'; ";
	            _mysql_query($up);
			}
	        
			//是否用户修改帐号类型
			if( $_POST['usertype']!= 'null' ){
				$user_data_type = $_POST['usertype'];
				
				$up =  "UPDATE usermessage SET user_type = '$user_data_type' WHERE user_flag = '{$_POST['flag']}'; ";
				_mysql_query($up);
			}
			
			
			//是否用户修改密码
			if( $_POST['new_password']!= 'null' ){
				
					
				$user_data_Newpass= sha1(md5($_POST['new_password'])); //新密码
				
				$up =  "UPDATE usermessage SET user_password = '$user_data_Newpass' WHERE  user_flag = '{$_POST['flag']}'; ";
				_mysql_query($up);
				

			} 
			
			
			//是否修改Email
			if( $_POST['useremail']!= 'null' ){
				
				$user_data_email = _user_email($_POST['useremail']);
				
				$up =  "UPDATE usermessage SET user_email= '$user_data_email' WHERE  user_flag = '{$_POST['flag']}'; ";
				_mysql_query($up);
			
			}

			echo sha1('true');
 
		}	//END 提交
	 }

?>