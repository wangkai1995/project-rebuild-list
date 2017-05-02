import httpServer  from '../../server/http/index';



export default {

	//火车票购票时间范围
	trainDateRange:function(){
		return httpServer.request({
			url:'/v1/train/config/dateRange',
			method:'GET',
		})
	},
	
	//火车票城市
	trainCity: function(){
		return httpServer.request({
			url:'/v1/train/stations',
			method:'GET',
		})
	},

	//火车票热门城市
	trainHotCity:function(){
		return httpServer.request({
			url:'/v1/plane/hot-city',
			method: 'GET',
		})
	},

	//请求车次列表
	trainInfoList:function(data){
		return httpServer.request({
			url:'/v1/train/trainInfos',
			method: 'GET',
			params: data,
		})
	},


	//请求车次详情
	trainInfo:function(data){
		return httpServer.request({
			url:'/v1/train/trainInfo',
			method: 'GET',
			params: data,
		})
	},
	

	//请求经停车站
	trainThrough:function(data){
		return httpServer.request({
			url:'/v1/train/queryStations',
			method: 'GET',
			params: data,
		})
	},

	//请求火车保险
	trainInsurance:function(){
		return httpServer.request({
			url:'/v1/insurance/1',
			method: 'GET',
		})
	},

	//请求下单
	trainBuyTicket:function(data){
		return httpServer.request({
			url:'/v1/train/order?access_token='+data.token,
			method: 'POST',
			data: data.data,
		})
	}


}

