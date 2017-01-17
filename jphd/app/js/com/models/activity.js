'user strict';

module.exports=['httpFactory' ,function(httpFactory){
	return{
		//即将揭晓列表
		activity_inLotteryList: function(params){
			return httpFactory.request('activity_inLotteryList',params);
		},
	}
}]