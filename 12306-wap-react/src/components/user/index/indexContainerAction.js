
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

//重置用户信息
function resetUserInfo(){
    return {
        type : actionType.RESET_USER_INFO,

    }
}




export { requestUserInfo ,resetUserInfo };


