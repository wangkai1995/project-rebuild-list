
import *  as actionType  from './fillOrderContainerType';



//请求保险信息
function requestInsuranceInfo(request){
    const { REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_INSURANCE_SUCCESS, REQUEST_BUS_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_INSURANCE_SUCCESS, REQUEST_BUS_FILLORDER_ERROR],
        request : request,
    }
}


//请求用户信息
function requestUserInfo(request,params){
    const { REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_USER_INFO_SUCCESS, REQUEST_BUS_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_USER_INFO_SUCCESS, REQUEST_BUS_FILLORDER_ERROR],
        request : request,
        params: params,
    }
}

//请求服务费
function requestServiceCharge(request,params){
    const { REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_SERVICE_CHARGE_SUCCESS, REQUEST_BUS_FILLORDER_ERROR }  = actionType;
    return{
        type : [REQUEST_BUS_FILLORDER_LOADIND, REQUEST_BUS_FILLORDER_SERVICE_CHARGE_SUCCESS, REQUEST_BUS_FILLORDER_ERROR],
        request : request,
        params: params,
    }
}





export { requestInsuranceInfo ,requestUserInfo,requestServiceCharge};


