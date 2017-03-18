import httpServer  from '../../server/http/index';



export default {
	
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
	}



}