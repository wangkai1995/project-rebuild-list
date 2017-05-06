
import *  as actionType  from './orderDetailContainerType';



//请求订单详情
function requestTrainOrder(request,params){
    const { REQUEST_TRAIN_ORDER_LOADIND, REQUEST_TRAIN_ORDER_SUCCESS, REQUEST_TRAIN_ORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_TRAIN_ORDER_LOADIND, REQUEST_TRAIN_ORDER_SUCCESS, REQUEST_TRAIN_ORDER_ERROR],
        request : request,
        params: params,
    }
}





export { requestTrainOrder };

