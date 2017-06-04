
import *  as actionType  from './changeAccountContainerType';


//请求修改用户信息
function requestChangeUserInfo(request,params){
    const { REQUEST_CHANGE_ACCOUNT_USER_INFO_LOADING, REQUEST_CHANGE_ACCOUNT_USER_INFO_SUCCESS, REQUEST_CHANGE_ACCOUNT_USER_INFO_ERROR }  = actionType;
    return{
        type : [REQUEST_CHANGE_ACCOUNT_USER_INFO_LOADING, REQUEST_CHANGE_ACCOUNT_USER_INFO_SUCCESS, REQUEST_CHANGE_ACCOUNT_USER_INFO_ERROR],
        request : request,
        params: params,
    }
}




export { requestChangeUserInfo };
