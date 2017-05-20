import *  as actionType  from './fillOrderContainerType';


const initialState = {
    loading : false,
    error : false,
    errorCode: false,
    errorOrder: false,
    insuranceInfo:false,
    userInfo:false,
    trainInfo:false,
    passengerInfo:false,
    robHandleFee:false,
    Login12306: false,
    cancelFlag: false,
    orderNo:false,
};



function seat( state = initialState , action){
    
    switch(action.type){

        //请求加载中
        case actionType.REQUEST_TRAIN_FILLORDER_LOADIND : {
            return{
                ...state,
                loading: true,
                orderNo:false,
            };
        }

        //提交订单加载中
        case actionType.REQUEST_TRAIN_FILLORDER_SUBMIT_LOADIND:{
             return{
                ...state,
                Login12306:false,
                loading: true,
            };
        }


        //请求失败
        case actionType.REQUEST_TRAIN_FILLORDER_ERROR:{
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        }


        //请求订单失败
        case actionType.REQUEST_TRAIN_FILLORDER_SUBMIT_ERROR:{
            return{
                ...state,
                loading: false,
                Login12306: false,
                cancelFlag : false,
                error: action.payload,
                errorCode: action.code,
                errorOrder: action.errorOrder,
            }
        }


        //重置错误
        case actionType.RESET_TRAIN_FILLORDER_ERROR : {
            return{
                ...state,
                isVisible:false,
                error:false,
                errorCode:false,
                errorOrder:false,
            }
        }
        

        //请求保险信息成功
        case actionType.REQUEST_TRAIN_FILLORDER_INSURANCE_SUCCESS:{
            return{
                ...state,
                loading:false,
                insuranceInfo:action.payload,
            }
        }


        
        //请求用户信息成功
        case actionType.REQUEST_TRAIN_FILLORDER_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                userInfo : action.payload,
            }
        }


        //请求登录12306成功
        case actionType.REQUEST_TRAIN_FILLORDER_LOGIN12306_SUCCESS : {
            return{
                ...state,
                loading:false,
                Login12306 : true,
            }
        }
        
        
        //请求抢票费用
        case actionType.REQUEST_TRAIN_FILLORDER_ROB_HANDLE_FEE_SUCCESS:{
            return{
                ...state,
                loading:false,
                robHandleFee : parseFloat(action.payload),
            }
        }


        //请求提交订单成功
        case actionType.REQUEST_TRAIN_FILLORDER_SUBMIT_SUCCESS : {
            return{
                ...state,
                loading:false,
                Login12306: false,
                cancelFlag : false,
                orderNo : action.payload,
            }
        }
        

        //请求取消订单成功
        case actionType.REQUEST_TRAIN_FILLORDER_CANCEL_ORDER_SUCCESS :{
            return{
                ...state,
                loading:false,
                cancelFlag : true,
            }
        }

        //填充车次信息
        case actionType.INIT_TRAIN_INFO : {
            return{
                ...state,
                trainInfo : action.payload,
            }
        }


        //填充乘客信息
        case actionType.INIF_TRAIN_PASSENGER : {
            return{
                ...state,
                passengerInfo : action.payload,
            }
        }

    
        default :
            return state;

    }
}


export default seat;
