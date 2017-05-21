import *  as actionType  from './ticketPayContainerType';


const initialState = {
    loading : false,
    error : false,
    payInfo: false,
    weChatInfo: false,
    alipayInfo: false,
    payCountDown: false,
};



function pay( state = initialState , action){
    switch(action.type){


        //支付倒计时加载中
        case actionType.REQUEST_PAY_COUNT_DOWN_LOADING : {
            return{
                ...state,
            };
        }

        //支付倒计时加载错误
        case actionType.REQUEST_PAY_COUNT_DOWN_ERROR : {
            return{
                ...state,
                loading: false,
                error: action.error,
            };
        }

        //初始化获取支付信息
        case actionType.INIT_PAY_INFO: {
            return{
                ...state,
                payInfo: action.payload,
            };
        }
        
        //汽车票支付倒计时成功
        case actionType.REQUEST_BUS_PAY_COUNT_DOWN_SUCCESS : {
            return{
                ...state,
                loading:false,
                payCountDown: action.payload,
            };
        }
        
        //火车票支付倒计时成功
        case actionType.REQUEST_TRAIN_PAY_COUNT_DOWN_SUCCESS : {
            return{
                ...state,
                loading:false,
                payCountDown: action.payload,
            };
        }
    
        default :
            return state;

    }
}


export default pay;

