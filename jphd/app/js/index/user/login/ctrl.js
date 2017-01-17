'user strict';

module.exports=['$scope', '$cookies', '$interval', '$timeout', 'tonkenServices', 'userModel', 'shadeServices', function($scope ,$cookies ,$interval ,$timeout ,tonkenServices ,userModel ,shadeServices ){
	var vm = this;
		vm.popModel = shadeServices;
		vm.radioChecked = true;
		vm.countDown = false;
		vm.verification = '发送验证码';
		vm.user = {
			mobile: '',
			password: '',
			platform: 3,
			promoCode: tonkenServices.getLoginPromoCode()
		};

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	//发送验证码
	vm.getVerification = function(){
		if(!vm.countDown){
			vm.countDown = 60;
			vm.verification = vm.countDown+'秒后重新发送';
			var timer = $interval(function(){
				vm.countDown--;
				if(vm.countDown < 0){
					$interval.cancel(timer);
					vm.countDown = false;
					vm.verification = '发送验证码';
				}else{
					vm.verification = vm.countDown+'秒后重新发送';
				}
				 $timeout(function() {
		            $interval.cancel(timer);
		        }, 61000);
			},1000,200);

			var params = {
				'mobile' : vm.user.mobile,
			};
			userModel.user_mvcode(params).then(function(data){
				if(!data.error){
					vm.popModel.confirm({
						content: '验证码已发送',
						button:[
							{
								text:'确定',
								callback:function(){
									vm.popModel.hide();
								}
							}
						]
					});
				}else{
					$interval.cancel(timer);
					vm.popModel.confirm({
						content:data.error.message,
						button:[
							{
								text:'确定',
								callback:function(){
									vm.countDown = false;
									vm.verification = '发送验证码';
									vm.popModel.hide();
								}
							}
						]
					});
				}
			});
		}
	}
	

	//登录
	vm.submitLogin = function(){
		var params = {
			"mobile": vm.user.mobile,
			"password": vm.user.password,
			"platform": vm.user.platform,
			"promoCode": vm.user.promoCode,
		};
		userModel.user_login(params).then(function(data){
			if(!data.error){
				tonkenServices.loginSucces(data.result);
				window.history.back();
			}else{
				vm.popModel.error(data.error.code);
			}
		});
	}

	//协议点击
	vm.radioClick = function(){
		vm.radioChecked = !vm.radioChecked;
	}

}]