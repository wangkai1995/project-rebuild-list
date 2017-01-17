


//验证用户名
// user_name = 用户输入的用户名
// minlen = 最小值
// max = 最大值
// 验证不通过返回true 通过返回false
function _user_name(user_name,minlen,maxlen)
{
	if(user_name.length < minlen || user_name.length > maxlen)
	    {
		  alert('User name cannot be less than'+minlen+'Or greater than'+maxlen+'');
		  return true;
		}
		
	if(/[`~!@#$%^&*()_+<>?:"{},，.\/;'[\]]/i.test(user_name))
	  {
		alert('user name format is not correct');
		return true;
	  }	  
	  return false;  
}


//验证密码和确认密码
// password = 用户输入的密码
// confirm_pd = 用户输入的确认密码
// minlen = 最小值
// max = 最大值
// 验证不通过返回true 通过返回false
function _user_password(password,confirm_pd,minlen,maxlen)
{
	if(password.length < minlen || password.length > maxlen)
	    {
		  alert('Password cannot be less than'+minlen+'Or greater than'+maxlen+'');
		  return true;
		}
		
	if(password != confirm_pd)
	{
		alert('Two password input is not the same！')
		return true;
	}	
	return false;	
}



//验证邮箱
// answer_pd = 用户输入的密码回答
// minlen = 最小值
// max = 最大值
// 验证不通过返回true 通过返回false
function _user_password_email(email,minlen,maxlen)
{
	if(email.length < minlen || email.length > maxlen)
	    {
		  alert('Email cannot be less than'+minlen+'Or greater than'+maxlen+'');
		  return true;
		}
		
	if(! /^[\w\.\-\]+@[\w\-\.]+(\.\w+)+$/.test(email))
	  {
		alert('You enter the email address format error');
		return true;
	  }	  
	  
	  return false;	
}



//验证登录密码
// password = 用户输入的密码
// minlen = 最小值
// max = 最大值
// 验证不通过返回true 通过返回false
function _login_password(password,minlen,maxlen)
{
	if(password.length < minlen || password.length > maxlen)
	    {
		  alert('Password cannot be less than'+minlen+'Or greater than'+maxlen+'');
		  return true;
		}
		
	return false;	
}



