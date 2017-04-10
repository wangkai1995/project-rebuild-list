
import *  as actionType  from './loginContainerType';


//请求登陆
function requestLogin(request,params){
    const { REQUEST_LOADING, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_ERROR],
        request : request,
        params: params,
    }
}



//请求验证手机
function requestVlidatePhone(request,params){
    const { REQUEST_LOADING, REQUEST_VALIDPHONE_SUCCESS, REQUEST_VALIDPHONE_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_VALIDPHONE_SUCCESS, REQUEST_VALIDPHONE_ERROR],
        request : request,
        params: params,
    }
}


//请求验证码
function requestVlidateCode(request,params){
    const { REQUEST_LOADING, REQUEST_VALIDCODE_SUCCESS, REQUEST_VALIDCODE_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_VALIDCODE_SUCCESS, REQUEST_VALIDCODE_ERROR],
        request : request,
        params: params,
    }
}



//修改登陆模式
function changeLoginType(type){
    return{
        type:actionType.CHANGE_LOGIN_TYPE,
        payload: type,
    }
}



//重置错误信息
function resetError(){
    return{
        type:actionType.RESET_ERROR,
    }
}


//设置错误信息
function setError(error){
    return{
        type:actionType.SET_ERROR,
        payload: error,
    }
}


export { requestLogin ,changeLoginType ,resetError ,setError ,requestVlidatePhone ,requestVlidateCode };

