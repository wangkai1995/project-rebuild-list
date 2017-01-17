'use strict';

module.exports = ['$scope', '$state', '$stateParams', 'viewDataServices', 'shadeServices', 'oTabList', 'oDataList', 'oLottery', 'oNotice', 'oActivityNotice', function($scope, $state, $stateParams, viewDataServices , shadeServices,oTabList ,oDataList ,oLottery ,oNotice ,oActivityNotice) {
	
	var vm = this;
	// console.log(oTabList);
	// console.log(oDataList);
	// console.log(oLottery);
	console.log(oActivityNotice,'活动邀请通知还没处理');
	
	vm.notice = oNotice;
	vm.activityNotice = oActivityNotice;
	vm.tabList = oTabList;
	vm.DataList = oDataList;
	vm.LotteryList = oLottery;
	vm.activeList = oTabList[0];
	vm.isMore = true;
	vm.popModel = shadeServices;


	//初始化Swipe 这个需要操作 dom和ng-repeact一起使用需要延时先生成dom
	setTimeout(function(){
		//分类tab
		vm.swipeTab = Swipe({
		    queryClass: 'cloudbuy-tab-list',
		    rollBack: 50,
		    inlineMode: true,
		    rollBackDelay:500
		 });
		//即将揭晓
		vm.swipeLottery = Swipe({
		    queryClass: 'lottery-list',
		    rollBack: 50,
		    inlineMode: true,
		    rollBackDelay:500
		 });
	},200);
	

	//tab改变
	vm.tabChange = function(item){
		vm.activeList = item;
		var params = {
    			categoryId: vm.activeList.id,
    			page: 1,
    			pageSize: 10,
    		}
		viewDataServices.requestData('cloudBuy_list',params).then(function(data){
			if(data){
		 		vm.DataList = data;
			}
		});
	}

	//跳转读取信息
	vm.goNotice = function(){
		console.log('读取消息');
	}

	//跳转云购商品详细
	vm.goCloundBuyDetail = function(item){
		$state.go('cloudbuy.detaill',{
			activityId: item.activityId
		});
	}

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('cloudBuy_list').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.DataList = data;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//上拉加载
	vm.loadMore = function(){
		viewDataServices.loadMore('cloudBuy_list').then(function(data){
			console.log(data,'cloudBuy_list');
			if(data){
				vm.DataList.objects = vm.DataList.objects.concat(data.objects);
			}else{
				vm.isMore = false;
			}
			
		},function(error){
			console.log(error);
		})
	}


}]

