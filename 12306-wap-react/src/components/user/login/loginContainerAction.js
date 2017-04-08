
import *  as actionType  from './loginContainerType';


//请求登陆
function requestLogin(request,params){
    const { REQUEST_LOGIN_LOADING, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR }  = actionType;
    return{
        type : [REQUEST_LOGIN_LOADING, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR],
        request : request,
        params: params,
    }
}




export { requestLogin };

