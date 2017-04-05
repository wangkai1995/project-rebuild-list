
import *  as actionType  from './throughContainerType';



//请求经停详情
function requestThroughInfo(request,params){
    const { REQUEST_THROUGH_INFO_LOADIND, REQUEST_THROUGH_INFO_SUCCESS, REQUEST_THROUGH_INFO_ERROR }  = actionType;
    return{
        type : [REQUEST_THROUGH_INFO_LOADIND, REQUEST_THROUGH_INFO_SUCCESS, REQUEST_THROUGH_INFO_ERROR],
        request : request,
        params: params,
    }
}





export { requestThroughInfo };