import httpServer  from '../../server/http/index';



export default {

	//汽车票城市
	busCity: function(){
		return httpServer.request({
			url:'/v1/bus/stations',
			method:'GET',
		})
	},

	//汽车票热门城市
	busHotCity:function(){
		return httpServer.request({
			url:'/v1/bus/hot-city',
			method: 'GET',
		})
	},

	//汽车票热门景区推荐
	busRecommend:function(){
		return httpServer.request({
			url:'/v1/recommend/place',
			method: 'GET',
		})
	},

	busInfoList:function(data){
		return httpServer.request({
			url:'/v1/bus/search',
			method: 'GET',
			params: data,
		})
	},

	//请求汽车保险
	busInsurance:function(){
		return httpServer.request({
			url:'/v1/insurance/3',
			method: 'GET',
		})
	},

	//请求车次详情
	busInfo:function(data){
		return httpServer.request({
			url:'/v1/bus/get-one',
			method: 'GET',
			params: data,
		})
	},

	busServiceCharge:function(data){
		return httpServer.request({
			url:'/v1/bus/service-charge/'+data.busFromStation,
			method: 'GET',
		})
	},


}

