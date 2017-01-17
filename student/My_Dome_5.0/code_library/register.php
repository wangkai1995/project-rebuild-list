<?php

header('Content-Type:text/html;charset=utf-8');

//防止恶意调用
define('IN_FLAG',true);

//调用核心函数库
require 'code_library.php';




//判断是否验证用户名
if(isset($_GET['user_ve'])){

    $user_name = _username($_GET['user_name']);

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
}








//判断是否有提交
if(isset($_POST['rand']) && isset($_GET['rand']))
{

    //验证非法提交
    if($_POST['rand'] !== $_GET['rand'] )
    {echo null; exit();}
		
	//验证验证码
    session_start();
    if( $_SESSION['Verification_code'] !== $_POST['verification'])
    { echo null;exit();}
	 

	//取得注册类型
 	$user_type=$_POST['usertype'];
 	//验证用户名 正确则取得注册姓名 
	$user_name = _username($_POST['username']);
    //验证密码 和密码确认   加密返回
	$user_password = _user_password($_POST['password'],$_POST['confirm_pd']);
    //获取唯一表示符
    $user_flag = sha1(md5($_POST['rand']));
    //获取选择的头像
    $user_portrait = $_POST['head_portrait'];
    //获取用户的邮件
    $user_email = _user_email($_POST['useremail']);
    //获取用户的留言
    $user_detail = $_POST['product_detail'];
    

	//连接数据库
    $Mysql = _mysql_connect();
    //选择数据库
    _mysql_select_bd($Mysql);
    //设置字符集格式
    $Mysql = _mysql_query('SET NAMES UTF8');



    //例子
    //$query = "SELECT * FROM ceshi WHERE name='abca';"; 
    //$name = _mysql_fetch_array($query, '查询用户名失败');
     
    //Mysql 写入语句
  
    $query ="INSERT INTO usermessage (user_type,
    		                          user_name,
    		                          user_password,
    		                          user_portrait,
    		                          user_email,
    		                          user_flag,
    		                          user_jurisdiction,
    		                          user_detail,
    		                          user_setdate,
    		                          user_lastdate)
   		           VALUES('$user_type',
   		           		  '$user_name',
   		           		  '$user_password',
    		              '$user_portrait',
    		              '$user_email',
    		              '$user_flag',
    		                0,
    		              '$user_detail',
    		              NOW(),
    		              NOW());";
   
       //把用户提交的信息保存到数据内
      _mysql_query($query);
       //关闭mysql
      mysql_close();
    //操作成功清空session跳转到主页
    session_destroy();

    //注册成功
    echo sha1('ok');
    
}

?>