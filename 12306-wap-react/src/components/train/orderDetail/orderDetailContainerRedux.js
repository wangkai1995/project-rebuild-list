import *  as actionType  from './orderDetailContainerType';


const initialState = {
    loading : false,
    error : false,
    orderDetail: false,
};



function trainOrderDetail( state = initialState , action){
    switch(action.type){


        //订单详情加载中
        case actionType.REQUEST_TRAIN_ORDER_LOADIND : {
            return{
                ...state,
                loading: true,
            };
        }

        //订单详情加载错误
        case actionType.REQUEST_TRAIN_ORDER_ERROR : {
            return{
                ...state,
                loading: false,
                error: action.error,
            };
        }
        
        //订单详情成功
        case actionType.REQUEST_TRAIN_ORDER_SUCCESS : {
            return{
                ...state,
                loading:false,
                orderDetail: action.payload,
            };
        }

    
        default :
            return state;

    }
}


export default trainOrderDetail;

