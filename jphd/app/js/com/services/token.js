'use strict';



module.exports=['$cookies',function($cookies){
	var self = this;

	//获取登录推广码 从分享处获取
	self.getLoginPromoCode = function(){
		var promoCode = sessionStorage.getItem('promoCode');
		return promoCode? promoCode : ''; 
	}

	//保存登录信息
	self.loginSucces = function(data){
		var time = new Date();
		time = time.getTime() + 100000 * 60 * 60 * 1000;
		$cookies.putObject('token', data, {
            'expires': new Date(time),
        });
	}
	

}]