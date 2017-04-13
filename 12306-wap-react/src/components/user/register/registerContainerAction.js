
import *  as actionType  from './registerContainerType';



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


//请求注册
function requestRegister(request,params){
    const { REQUEST_LOADING, REQUEST_REGISTER_SUCCESS, REQUEST_REGISTER_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_REGISTER_SUCCESS, REQUEST_REGISTER_ERROR],
        request : request,
        params: params,
    }
}


//选择协议
function checkAgreement(checked){
    return{
        type:actionType.AGREEMENT_FLAG,
        payload: checked,
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


export { resetError ,setError ,requestVlidatePhone ,requestVlidateCode ,requestRegister ,checkAgreement };

