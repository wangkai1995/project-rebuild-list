
import *  as actionType  from './seatContainerType';


//初始化参数
//初始化请求参数
function initParams(params){
	return{
		type:actionType.REQUEST_INIT_PARAMS,
		payload: params,
	}
}



//请求火车详情
function requestTrainInfo(request,params){
	const { REQUEST_TRAIN_INFO_LOADIND, REQUEST_TRAIN_INFO_SUCCESS, REQUEST_TRAIN_INFO_ERROR }  = actionType;
	return{
		type : [REQUEST_TRAIN_INFO_LOADIND, REQUEST_TRAIN_INFO_SUCCESS, REQUEST_TRAIN_INFO_ERROR],
		request : request,
		params: params,
	}
}





export { initParams ,requestTrainInfo };