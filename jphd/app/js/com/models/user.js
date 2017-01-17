'use strict';


module.exports=['httpFactory','$cookies',function(httpFactory,$cookies){
	return {
		//是否登录
		user_hasLoggedIn:function(params){
			return httpFactory.request('user_hasLoggedIn',params);
		},
		//用户资料
		user_info:function(params){
			return httpFactory.request('user_info',params);
		},
		//获取验证码
		user_mvcode:function(params){
			return httpFactory.request('mvcode_login', params);
		},
		//普通登录
		user_login:function(params){
			return httpFactory.request('user_login',params);
		}
	}
}]