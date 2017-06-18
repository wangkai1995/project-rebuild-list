
import *  as actionType  from './cityContainerType';


//请求火车票城市
function requestTrainCity(request){
	const { REQUEST_LOADING, REQUEST_TRAIN_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING ,REQUEST_TRAIN_CITY ,REQUEST_ERROR],
		request : request,
		cache:{
			key:'trainCity_Cache',
			time:3,
		}
	}
}



//请求火车票热门城市
function requestHotCity(request){
	const { REQUEST_LOADING, REQUEST_HOT_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING , REQUEST_HOT_CITY ,REQUEST_ERROR],
		request:request,
		cache:{
			key:'trainHotCity_Cache',
			time:3,
		}
	}
}



//请求汽车票热门城市
function requestBusHotCity(request){
	const { REQUEST_LOADING, REQUEST_BUS_HOT_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING , REQUEST_BUS_HOT_CITY ,REQUEST_ERROR],
		request:request,
		cache:{
			key:'busHotCity_Cache',
			time:3,
		}
	}
}


//请求汽车票出发城市
function requestBusFromCity(request){
	const { REQUEST_LOADING, REQUEST_BUS_FROM_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING , REQUEST_BUS_FROM_CITY ,REQUEST_ERROR],
		request:request,
		cache:{
			key:'busFromCity_Cache',
			time:3,
		}
	}
}


//请求汽车票到达城市
function requestBusToCity(request){
	const { REQUEST_LOADING, REQUEST_BUS_TO_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING , REQUEST_BUS_TO_CITY ,REQUEST_ERROR],
		request:request,
	}
}




export { requestTrainCity, requestHotCity ,requestBusHotCity ,requestBusFromCity ,requestBusToCity };


