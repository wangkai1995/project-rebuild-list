
import *  as actionType  from './listContainerType';


//请求火车车次列表
function requestTrainInfo(request,params){
	const { REQUEST_TRAIN_INFO_LOADIND, REQUEST_TRAIN_INFO_SUCCESS, REQUEST_TRAIN_INFO_ERROR }  = actionType;
	return{
		type : [REQUEST_TRAIN_INFO_LOADIND, REQUEST_TRAIN_INFO_SUCCESS, REQUEST_TRAIN_INFO_ERROR],
		request : request,
		params: params,
	}
}

//请求预售范围
function requestDateRange(request){
	const { REQUEST_DATERANGE_LOADING, REQUEST_DATERANGE_SUCCESS, REQUEST_DATERANGE_ERROR }  = actionType;
	return{
		type : [REQUEST_DATERANGE_LOADING, REQUEST_DATERANGE_SUCCESS, REQUEST_DATERANGE_ERROR],
		request : request,
	}
}

//初始化请求参数
function initParams(params){
	return{
		type:actionType.REQUEST_INIT_PARAMS,
		payload: params,
	}
}


//设置过滤条件
function setFilterSeach(filterSeach){
	return{
		type:actionType.FILTER_INIT_SEACH,
		payload: filterSeach,
	}
}








export { requestTrainInfo , initParams , setFilterSeach ,requestDateRange };