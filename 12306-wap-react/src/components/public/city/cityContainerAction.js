
import *  as actionType  from './cityContainerType';


//请求火车票城市
function requestTrainCity(request){
	const { REQUEST_LOADING, REQUEST_TRAIN_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING ,REQUEST_TRAIN_CITY ,REQUEST_ERROR],
		request : request,
	}
}



//请求火车票热门城市
function requestHotCity(request){
	const { REQUEST_LOADING, REQUEST_HOT_CITY, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_LOADING , REQUEST_HOT_CITY ,REQUEST_ERROR],
		request:request,
	}
}




export { requestTrainCity, requestHotCity };