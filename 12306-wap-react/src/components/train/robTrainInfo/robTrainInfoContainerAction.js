
import *  as actionType  from './robTrainInfoContainerType';




//请求车次
function requestTrainInfo(request,params){
    const { REQUEST_ROB_TRAIN_LOADING, REQUEST_ROB_TRAIN_SUCCESS, REQUEST_ROB_TRAIN_ERROR }  = actionType;
    return{
        type : [REQUEST_ROB_TRAIN_LOADING, REQUEST_ROB_TRAIN_SUCCESS, REQUEST_ROB_TRAIN_ERROR],
        request : request,
        params: params,
    }
}




export {  requestTrainInfo };