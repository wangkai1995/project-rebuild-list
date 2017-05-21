
import *  as actionType  from './ticketPayContainerType';



//填充车次信息
function initPayInfo(data){
    return{
        type:actionType.INIT_PAY_INFO,
        payload: data,
    }
}


//请求汽车票支付剩余时间
function requestBusPayCountDown(request,params){
    const { REQUEST_PAY_COUNT_DOWN_LOADING, REQUEST_BUS_PAY_COUNT_DOWN_SUCCESS, REQUEST_PAY_COUNT_DOWN_ERROR }  = actionType;
    return{
        type : [REQUEST_PAY_COUNT_DOWN_LOADING, REQUEST_BUS_PAY_COUNT_DOWN_SUCCESS, REQUEST_PAY_COUNT_DOWN_ERROR],
        request : request,
        params: params,
    }
}


//请求火车票支付剩余时间
function requestTrainPayCountDown(request,params){
    const { REQUEST_PAY_COUNT_DOWN_LOADING, REQUEST_TRAIN_PAY_COUNT_DOWN_SUCCESS, REQUEST_PAY_COUNT_DOWN_ERROR }  = actionType;
    return{
        type : [REQUEST_PAY_COUNT_DOWN_LOADING, REQUEST_TRAIN_PAY_COUNT_DOWN_SUCCESS, REQUEST_PAY_COUNT_DOWN_ERROR],
        request : request,
        params: params,
    }
}





export { initPayInfo, requestBusPayCountDown ,requestTrainPayCountDown };