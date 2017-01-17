<?php
header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);

//用于退出的特殊授权
define('EXIT_FLAG', true);


//调用核心函数库
require 'code_library.php';
 




//判断是否提交数据
if(isset($_POST['rand']) && isset($_GET['rand']))
{
	//验证非法提交
	if($_POST['rand'] != $_GET['rand'] )
	{echo null;}
	 
	//验证验证码
	session_start();
	if( $_SESSION['Verification_code'] != $_POST['verification'])
	{ echo null;}
 
	//获取登录信息
	$user_name = _username($_POST['user']);
	$user_password = _login_password($_POST['password']);
	
	//连接数据库
	$Mysql = _mysql_connect();
	_mysql_select_bd($Mysql);
	$Mysql = _mysql_query('SET NAMES UTF8');
	
	//登录验证 
	//成功则返回用户名和唯一标识给cookie打包
	$user = _mysql_user_login('usermessage', 'user_name', 'user_password', $user_name, $user_password);
	
	//设置cookie
	session_destroy();

	$data =  array( );
    

	$data['flag'] = $user['user_flag'];
	$data['name'] = $user['user_name'];
   

    echo json_encode($data);
   
}


?>
