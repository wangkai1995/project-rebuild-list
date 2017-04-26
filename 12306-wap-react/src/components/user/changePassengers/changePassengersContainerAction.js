
import *  as actionType  from './changePassengersContainerType';




//请求乘客数据
function requestPassengersInfo(request,params){
    const { REQUEST_LOADING, REQUEST_PASSENGERS_INFO_SUCCESS, REQUEST_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_PASSENGERS_INFO_SUCCESS, REQUEST_ERROR],
        request : request,
        params: params,
    }
}


//请求添加乘客数据
function requestAddPassengers(request,params){
    const { REQUEST_LOADING, REQUEST_ADD_PASSENGERS_SUCCESS, REQUEST_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_ADD_PASSENGERS_SUCCESS, REQUEST_ERROR],
        request : request,
        params: params,
    }
}

//请求更新乘客数据
function requestUpdatePassengers(request,params){
    const { REQUEST_LOADING, REQUEST_UPDATE_PASSENGERS_SUCCESS, REQUEST_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_UPDATE_PASSENGERS_SUCCESS, REQUEST_ERROR],
        request : request,
        params: params,
    }
}


//重置错误信息
function resetError(){
    return{
        type:actionType.RESET_ERROR,
    }
}


//重置乘客信息
function resetPassengerInfo(){
    return{
        type:actionType.RESET_PASSENGERS,
    }
}





export {  requestPassengersInfo ,requestAddPassengers ,requestUpdatePassengers , resetError ,resetPassengerInfo };


