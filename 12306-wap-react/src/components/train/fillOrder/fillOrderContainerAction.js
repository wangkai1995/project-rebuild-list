
import *  as actionType  from './fillOrderContainerType';



//请求保险信息
function requestInsuranceInfo(request){
    const { REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_INSURANCE_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_INSURANCE_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR],
        request : request,
    }
}


//请求抢票费用
function requestRobHandleFee(request){
    const { REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_ROB_HANDLE_FEE_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_ROB_HANDLE_FEE_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR],
        request : request,
    }
}


//请求用户信息
function requestUserInfo(request,params){
    const { REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_USER_INFO_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_USER_INFO_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR],
        request : request,
        params: params,
    }
}


//请求12306登录
function request12306Login(request,params){
    const { REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_LOGIN12306_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_LOGIN12306_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR],
        request : request,
        params: params,
    }
}


//提交订单
function requestSubmit(request,params){
    const { REQUEST_TRAIN_FILLORDER_SUBMIT_LOADIND, REQUEST_TRAIN_FILLORDER_SUBMIT_SUCCESS, REQUEST_TRAIN_FILLORDER_SUBMIT_ERROR}  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_SUBMIT_LOADIND, REQUEST_TRAIN_FILLORDER_SUBMIT_SUCCESS, REQUEST_TRAIN_FILLORDER_SUBMIT_ERROR],
        request : request,
        params: params,
    }
}


//取消订单
function requestCancelOrder(request,params){
    const { REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_CANCEL_ORDER_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_FILLORDER_LOADIND, REQUEST_TRAIN_FILLORDER_CANCEL_ORDER_SUCCESS, REQUEST_TRAIN_FILLORDER_ERROR],
        request : request,
        params: params,
    }
}

//填充车次信息
function initTrainInfo(data){
    return{
        type:actionType.INIT_TRAIN_INFO,
        payload: data,
    }
}


//填充乘客信息
function initTrainPassenger(data){
    return{
        type:actionType.INIF_TRAIN_PASSENGER,
        payload: data,
    }
}



//重置错误信息
function resetError(){
    return{
        type:actionType.RESET_TRAIN_FILLORDER_ERROR,
    }
}




export { requestInsuranceInfo ,requestRobHandleFee ,requestUserInfo, requestCancelOrder,  request12306Login,  requestSubmit,  initTrainInfo ,initTrainPassenger ,resetError };


