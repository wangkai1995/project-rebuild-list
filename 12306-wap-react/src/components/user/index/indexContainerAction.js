
import *  as actionType  from './indexContainerType';


//请求用户信息
function requestUserInfo(request,params){
    const { REQUEST_USER_INFO_LOADING, REQUEST_USER_INFO_SUCCESS, REQUEST_USER_INFO_ERROR }  = actionType;
    return{
        type : [REQUEST_USER_INFO_LOADING, REQUEST_USER_INFO_SUCCESS, REQUEST_USER_INFO_ERROR],
        request : request,
        params: params,
    }
}




export { requestUserInfo };