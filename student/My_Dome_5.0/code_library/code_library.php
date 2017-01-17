<?php  


header('Content-Type:text/html;charset=utf-8');


//防止恶意调用
if(!defined('IN_FLAG'))
{
	exit('没有授权的调用');
} 

//数据库常量
 define('Mysql_root','localhost:3306');     //用来登录的信息
 define('Mysql_user','root');
 define('Mysql_password','5565946');
 define('Mysql_database','user');       //选择用户管理数据库
 
 
//@_count:  验证码个数 默认为4
//@_width:  验证码背景长度 默认为75
//@_height： 验证码背景高度 默认为30
//输出验证码函数
function Verification_code($_count=4,$_width=75,$_height=30)
{
	//打开会话
	session_start();
		
	for($i=0;$i<$_count;$i++)
	{                                 
		$_code .= dechex(mt_rand(0, 15)); //dechex 转变成16进制
	}
	
	$_SESSION['Verification_code'] = $_code;
	
	//建立一个图框背景
	$_image = imagecreatetruecolor($_width, $_height); 
	//建立一个背景颜色 白色
	$_color = imagecolorallocate($_image, 255, 255, 255);
	//将白色填充进去
	imagefill($_image, 0, 0, $_color);
	
	
	for ($i=0;$i<($_count*2);$i++)
	{
		//随机的位置，随机的颜色画线条
		imageline($_image, mt_rand(0, $_width), mt_rand(0, $_height), mt_rand(0, $_width),mt_rand(0, $_height), 
	               imagecolorallocate($_image, mt_rand(100, 255), mt_rand(100, 255), mt_rand(0, 255)));
		
		//随机位置生产雪花
		imagestring($_image, 5,mt_rand(0, $_width), mt_rand(0, $_height), '**',
		            imagecolorallocate($_image, mt_rand(200, 255), mt_rand(200, 255), mt_rand(200, 255)));
		
	}
	
	
	for($i=0;$i<$_count;$i++)
	{
		//随机码装入图像
		imagestring($_image, 5, mt_rand( 0+(($_width/$_count)*$i), ($_width/$_count)*$i+1 ), mt_rand(0, ($_height-($_height/2))) , $_code[$i],
		            imagecolorallocate($_image, mt_rand(0,100 ), mt_rand(0, 150), mt_rand(0, 200)));
	}
	
	//输出并释放资源
	ob_clean(); //清除一下缓存
	header('content-Type:image/png');
	imagepng($_image);
	imagedestroy($_image);	
}





//$string = 错误信息
//打印错误信息
//直接结束程序
function Error($string){
	echo $string;
	exit();
}





//$max_len =   最大长度 默认20
//$min_len =   最小长度 默认4
//$string = $_POST['username']用户输入用户名
//验证用户输入的用户名
function _username($string, $min_len = 2, $max_len =20)
{
	//去除首位的空格
	$string = trim($string);
	//首先验证长度
	$length = mb_strlen($string,'utf8');
	if( $length<$min_len || $length>$max_len)
	{Error('用户名长度不正确');}
	
	//在严重特殊字符
	if(preg_match('/[<>\,\.\/\。\,\、\|\ \  ]/', $string))
	{Error('用户名存在特殊字符');}
	 
	//敏感用户名
	$name =array();
	$name[0]='习近平';
	$name[1]='李国强';
	$name[2]='胡景涛';
	$name[3]='温家宝';
	$name[4]='毛泽东';
	
	//验证敏感用户名不得注册
	if( in_array($string, $name) )
	{Error('敏感用户名不得注册');}
	
	//都通过之后返回用户名
	return $string;
}


//@@ 加密返回密码
//$max_len =   最大长度 默认20
//$min_len =   最小长度 默认4
//@$confirm_pd = 用户输入的密码确认
//@$password = 用户输入的密码
//验证用户密码并且加密处理
function _user_password($password ,$confirm_pd, $min_len = 4, $max_len =20)
{
	//首先验证长度
	$length = strlen($password);
	if( $length<$min_len || $length>$max_len)
	{Error('密码长度不正确');}
	
	//在比对确认密码部分
	$pd_length = strlen($confirm_pd);
	if( ($length != $pd_length) || ($password != $confirm_pd))
	{Error('两次密码输入不一致');}
	
	
	//加密处理
	//先用MD5加密 在用sha1 加密  密码的长度为40位
	return sha1(md5($password));
}



//$max_len =   最大长度 默认20
//$min_len =   最小长度 默认6
//$string = 用户输入邮箱
//验证用户的邮箱
function _user_email($string,$min_len = 6, $max_len = 30)
{
	//首先验证长度
	$length = mb_strlen($string,'utf8');
	if( $length<$min_len || $length>$max_len)
	{Error('邮箱长度不正确');}
	
	//验证邮箱格式
	if( !preg_match('/^[\w\.\-\]+@[\w\-\.]+(\.\w+)+$/', $string))
	{Error('邮箱格式不正确');}
	
	return $string;
}



//@@ 加密返回密码
//$max_len =   最大长度 默认20
//$min_len =   最小长度 默认4
//@$password = 用户输入的密码
//验证登录密码
function _login_password($password,$min_len=4,$max_len=20)
{
	//首先验证长度
	$length = strlen($password);
	if( $length<$min_len || $length>$max_len)
	{Error('密码长度不正确');}
	//加密处理
	//先用MD5加密 在用sha1 加密  密码的长度为40位
	return sha1(md5($password));
}


//@@返回保留事件
//$time用户选择的保留时间
//验证用户信息保留时间
function _login_time($time)
{
	
	if( $time !=0 && $time != 1 && $time !=2)
	{Error('错误的保留时间');}
	
	return $time;
}



/*
 * ************************************************
 * 
 *   操作数据库的部分
 * ************************************************
 * 
 * 
 */

//@$Mysql 是数据库资源变量 
//操作成功返回$Mysql变量
//数据库操作部分
function _mysql_connect()
{
	if(! $Mysql = @mysql_connect(Mysql_root,Mysql_user,Mysql_password))
	{Error('null');}
	
	return $Mysql;
}


//$Mysql 是数据库资源变量
//选择数据库
function _mysql_select_bd($Mysql)
{
	if(!@mysql_select_db(Mysql_database,$Mysql))
	{Error('null');}
}


//$return  返回查询结果
//$query 查询语句
//数据库检查是否开启自动转义 如果没开启则手动转义    最后写入查询
function _mysql_translate_query($query)
{
	if(get_magic_quotes_gpc())
	{
		if(! $return = @mysql_query($query))
		{Error('null');}
	}
	else
	{
		if(! $return = @mysql_query(mysql_real_escape_string($query)) )
		{Error('null');}
	}
	
	return $return;
}


//$username 要查询的用户名
//$user   要查询的用户名的所在表的列名
//$table  数据库表名
//@@@  如果有查询到存在用户名 返回用户名  不存在返回false
//查询数据库中是否存在相同用户名
function _mysql_query_user($table,$user,$username)
{
	 $query = "SELECT * FROM $table WHERE $user='$username';";  //查询表中的用用户名
	 	 
	 $user_s = @mysql_query($query);
	 $return = @mysql_fetch_array($user_s,MYSQL_ASSOC);
	 
	 if($return)
	 { return $return;}
	 else 
	 { return false;}
	 
}


//@@@@ 返回查询结果
//$query 查询语句 字符串形式
//查询数据库操作
function _mysql_query($query)
{
   $return= mysql_query($query)or die('录入错误'.mysql_error());
	
	if( ! $return )
	{Error('null');}
	else
	{ return $return; }
}


//@@@@@@ 返回数据结果 数组形式 下标为列名
//$error 错误的提示信息
//$query 查询语句
//返回查询数据库的结果 以数组形式 下标为列名
function _mysql_fetch_array($query)
{
	$return = mysql_fetch_array(mysql_query($query),MYSQL_ASSOC);
	
	if($return)
	{return $return;}
	else 
	{Error('null');}
}



//返回 打包给生产cookie的信息
//$password 密码
//$username 用户名
//$TB_password 表内用户密码列
//$TB_user 表内用户名列
//$table 表名
//用户登录 并且记录用户登入ip 以及登录次数+1
function _mysql_user_login($table,$TB_user,$TB_password,$username,$password)
{
	 $query = "SELECT * FROM $table WHERE $TB_user='$username' AND $TB_password = '$password' LIMIT 1;";  //查询表中的用用户名
    
	 if(!!$return =_mysql_fetch_array($query) )
	 { 
	 	//更改用户的id另外登录次数++
	 	$UPtime = "UPDATE $table  SET 
	 	                          user_ip = '{$_SERVER['REMOTE_ADDR']}',
	 	                          user_count = user_count+1 
	 	          WHERE $TB_user='$username';";
	 	
	 	 _mysql_query($UPtime);
	 	 
	 	//把需要的信息打包
	 	$user = array();
	 	$user['user_name'] = $return['user_name'];
	 	$user['user_flag'] = $return['user_flag'];
	 	
	 	return $user;
	 }
}






?>