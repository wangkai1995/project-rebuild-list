
import *  as actionType  from './orderCenterContainerType';


//请求订单数据
function requestOrderCenter(request,params){
    const { REQUEST_ORDER_LOADING, REQUEST_ORDER_PASSENGERS_SUCCESS, REQUEST_ORDER_PASSENGERS_ERROR }  = actionType;
    return{
        type : [REQUEST_ORDER_LOADING, REQUEST_ORDER_PASSENGERS_SUCCESS, REQUEST_ORDER_PASSENGERS_ERROR],
        request : request,
        params: params,
    }
}

//tab切换
function changeTab(data){
    return{
        type: actionType.CHANGE_ORDER_TAB,
        payload: data,
    }
}

//页码增加
function changePage(page){
    return{
        type: actionType.CHANGE_PAGE,
        payload: page,
    }
}


//删除订单
function deleteOrder(index){
    return{
        type: actionType.REQUEST_DELETE_ORDER,
        payload: index,
    }
}


export {  requestOrderCenter ,changeTab ,changePage ,deleteOrder };

