<?php 

header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);


//调用核心函数库
require 'code_library.php';

 

//判断是否有提交
if(isset($_POST['rand']) && isset($_GET['rand']))
{
	//验证非法提交
    if($_POST['rand'] !== $_GET['rand'] )
    {echo null; exit();}


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
    $data['user_setdate'] = $user['user_setdate'];
    $data['user_lastdate'] = $user['user_lastdate'];
    $data['user_ip'] = $user['user_ip'];
    $data['user_count'] = $user['user_count'];
    
     if(isset($Administrator_flag)){
     	$data['flag'] = true;
     }
     if(isset($number)){
     	$data['number'] = $number;
     }


     echo json_encode($data);






	 
}else{
   echo null;
   exit();
}


?>
