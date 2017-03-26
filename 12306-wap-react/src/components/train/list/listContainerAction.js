
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


//初始化请求参数
function initParams(params){
	return{
		type:actionType.REQUEST_INIT_PARAMS,
		payload: params
	}
}


//过滤火车站车次信息
//特别注意 这里的trainInfo需要包含3个数组
// trainArrStation  + trainDetpStation + trainInfos
// trainInfos是过滤后的车次数据
// trainArrStation  + trainDetpStation 保持不变源数据在//请求火车车次列表接口获取
function filterTrain(trainInfo){
	return{
		type: actionType.FILTER_TRAIN_INFO,
		payload: trainInfo,
	}
}





export { requestTrainInfo , initParams ,filterTrain };