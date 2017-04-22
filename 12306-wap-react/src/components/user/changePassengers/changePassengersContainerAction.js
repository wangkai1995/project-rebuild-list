
import *  as actionType  from './changePassengersContainerType';




//请求乘客数据
function requestPassengers(request,params){
    const { REQUEST_LOADING, REQUEST_PASSWNGERS_SUCCESS, REQUEST_PASSWNGERS_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_PASSWNGERS_SUCCESS, REQUEST_PASSWNGERS_ERROR],
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





export {  requestPassengers , resetError };


