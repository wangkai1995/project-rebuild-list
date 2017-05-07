
import *  as actionType  from './setRobTicketContainerType';



//请求预售范围
function requestDateRange(request){
	const { REQUEST_DATERANGE_LOADING, REQUEST_DATERANGE_SUCCESS, REQUEST_DATERANGE_ERROR }  = actionType;
	return{
		type : [REQUEST_DATERANGE_LOADING, REQUEST_DATERANGE_SUCCESS, REQUEST_DATERANGE_ERROR],
		request : request,
	}
}


//请求加速包
function requestPack(request){
	const { REQUEST_PACK_LOADING, REQUEST_PACK_SUCCESS, REQUEST_PACK_ERROR }  = actionType;
	return{
		type : [REQUEST_PACK_LOADING, REQUEST_PACK_SUCCESS, REQUEST_PACK_ERROR],
		request : request,
	}
}





export { requestDateRange ,requestPack };