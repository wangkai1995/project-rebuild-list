
import *  as actionType  from './accountContainerType';


//请求用户信息
function requestUserInfo(request,params){
    const { REQUEST_ACCOUNT_USER_INFO_LOADING, REQUEST_ACCOUNT_USER_INFO_SUCCESS, REQUEST_ACCOUNT_USER_INFO_ERROR }  = actionType;
    return{
        type : [REQUEST_ACCOUNT_USER_INFO_LOADING, REQUEST_ACCOUNT_USER_INFO_SUCCESS, REQUEST_ACCOUNT_USER_INFO_ERROR],
        request : request,
        params: params,
    }
}




export { requestUserInfo };
