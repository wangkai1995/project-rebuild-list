'use strict';

module.exports = {
	url: '/towards/:goodsId',
	templateUrl: 'index/goods/towards/tpl/index.html',
	resolve:{
		oBuyList:['$stateParams','viewDataServices',function($stateParams, viewDataServices){
			var params = {
				"id": $stateParams.goodsId,
				"page": 1,
				"pageSize": 10,
			};
			return viewDataServices.requestData('goods_toward',params).then(function(data){
				return data;
			})
		}],
	},
	controller: 'GoodsTowardsCtrl',
	controllerAs:'vm',
}