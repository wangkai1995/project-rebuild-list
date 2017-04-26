
import *  as actionType  from './passengersContainerType';




//请求乘客数据
function requestPassengers(request,params){
    const { REQUEST_LOADING, REQUEST_PASSENGERS_SUCCESS, REQUEST_PASSENGERS_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_PASSENGERS_SUCCESS, REQUEST_PASSENGERS_ERROR],
        request : request,
        params: params,
    }
}




export {  requestPassengers };


