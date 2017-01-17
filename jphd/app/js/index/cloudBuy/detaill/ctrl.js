'use strict';

module.exports=['$scope', '$cookies' ,'$stateParams' ,'shadeServices' ,'viewDataServices' ,'goodsModel' ,'oHasLoggin','oDetail',function($scope ,$cookies ,$stateParams ,shadeServices ,viewDataServices ,goodsModel ,oHasLoggin ,oDetail){
	console.log(oHasLoggin);
	console.log(oDetail);

	var vm = this;
		vm.popModel = shadeServices;
		vm.detail = oDetail;
		vm.activityId = $stateParams.activityId;


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

	//判断是否获奖
	vm.InitactivityResult = function(){
		if(vm.detail.status === 3){
			activityResult();
		}
	}

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('cloudBuy_detail').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.DataList = data;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//获取获奖结果
	function activityResult() {
        var params = {
			"id": vm.activityId,
		};
		goodsModel.goods_result(params).then(function(data){
			if(!data.error){
				vm.tmp = data.result;
				vm.winTime =  new Date(data.result.winTime).Format("yyyy-MM-dd HH:mm:ss");
				console.log(vm.tmp)
			}
		})
    }



	vm.initHasloggin();
	vm.InitactivityResult();

}]