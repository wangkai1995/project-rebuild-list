
import *  as actionType  from './fillOrderContainerType';



//请求保险信息
function requestInsuranceInfo(request){
    const { REQUEST_LOADIND, REQUEST_INSURANCE_SUCCESS, REQUEST_INSURANCE_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADIND, REQUEST_INSURANCE_SUCCESS, REQUEST_INSURANCE_ERROR],
        request : request,
    }
}


//请求用户信息
function requestUserInfo(request,params){
    const { REQUEST_LOADIND, REQUEST_USER_INFO_SUCCESS, REQUEST_USER_INFO_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADIND, REQUEST_USER_INFO_SUCCESS, REQUEST_USER_INFO_ERROR],
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




export { requestInsuranceInfo ,requestUserInfo, initTrainInfo ,initTrainPassenger };
