'use strict';

module.exports=['$scope' ,'$state' ,'shadeServices' ,'viewDataServices', 'oBuyList', function($scope ,$state ,shadeServices ,viewDataServices ,oBuyList){
	var vm = this;
		vm.isMore = true;
		vm.buyList = oBuyList.objects;
		
		console.log(vm.buyList);

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('goods_toward').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.buyList = data.objects;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//上拉加载
	vm.loadMore = function(){
		viewDataServices.loadMore('goods_toward').then(function(data){
			console.log(data,'loadMore');
			if(data){
				vm.buyList = vm.buyList.concat(data.objects);
			}else{
				vm.isMore = false;
			}
			
		},function(error){
			console.log(error);
		})
	}

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	
}]