
import *  as actionType  from './listContainerType';


//请求火车车次列表
function requestBusInfo(request,params){
	const { REQUEST_BUS_INFO_LOADIND, REQUEST_BUS_INFO_SUCCESS, REQUEST_BUS_INFO_ERROR }  = actionType;
	return{
		type : [REQUEST_BUS_INFO_LOADIND, REQUEST_BUS_INFO_SUCCESS, REQUEST_BUS_INFO_ERROR],
		request : request,
		params: params,
	}
}

export { requestBusInfo};