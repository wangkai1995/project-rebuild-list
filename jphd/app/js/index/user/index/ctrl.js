'user strict';

module.exports=['$scope', '$state', '$cookies', 'shadeServices', 'oHasLoggin', 'oUserInfo', function($scope ,$state ,$cookies ,shadeServices ,oHasLoggin ,oUserInfo){
	var vm = this;
		vm.popModel = shadeServices;
		vm.userInfo = oUserInfo? oUserInfo.result : false;

		console.log(vm.userInfo);

	//判断是否在其他设备登录
	vm.initHasloggin = function(){
		if(oHasLoggin.error){
			if(oHasLoggin.error.code === -20109){
				$cookies.remove('token');
				vm.popModel.confirm({
					content:'您的账号在其他设备登录',
					button:[
						{
							text:'确定',
							callback:function(){
								vm.popModel.hide();
							}
						}
					]
				});
			}
		}
	}

	//去登录
	vm.goLogin = function(){
		$state.go('user.login');
	}


	vm.initHasloggin();
}]