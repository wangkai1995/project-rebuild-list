'use strict';

module.exports = {
	url: '/participate/:activityId',
	templateUrl: 'index/goods/participate/tpl/index.html',
	resolve:{
		oBuyList:['$stateParams','viewDataServices',function($stateParams, viewDataServices){
			var params = {
				"id": $stateParams.activityId,
				"page": 1,
				"pageSize": 10,
			};
			return viewDataServices.requestData('goods_BuyList',params).then(function(data){
				return data;
			})
		}],
	},
	controller: 'GoodsParticipateCtrl',
	controllerAs:'vm',
}