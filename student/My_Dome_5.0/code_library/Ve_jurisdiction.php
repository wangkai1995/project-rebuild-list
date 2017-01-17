<?php

//防止恶意调用
define('IN_FLAG',true);
//调用核心函数库
require 'code_library.php';



//判断是否有提交
if(isset($_POST['rand']) && isset($_GET['rand']) ){

	  //检测是否是查询
     if( isset($_POST['query'] ) && $_POST['query'] != 'null'){
		//连接数据库
	  	   $Mysql = _mysql_connect();
	  	   _mysql_select_bd($Mysql);
	  	   $Mysql = _mysql_query('SET NAMES UTF8');

	  	   //这里是防止伪造cookie
	  	   $VE_query =  "SELECT user_type,user_jurisdiction FROM usermessage WHERE user_flag='{$_POST['flag']}';" ;  //查询表中的用用户名
	  	   $VE_user = _mysql_fetch_array($VE_query);

		 //查询当前用户类型 是否是管理员
		 if($VE_user['user_type'] !== 'tourist' && $VE_user['user_jurisdiction'] >0){
		 	echo sha1('true');
		 }else{
		 	echo 'false';
		 }
	 }
}	 

?> 