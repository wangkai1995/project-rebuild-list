
import *  as actionType  from './orderCenterContainerType';



const initialState = {
  loading: false,
  error: false,
  orderInfo: false,
  orderList: [],
  type: 'tab-order-1',
  page: 1,
}



function orderCenter( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_ORDER_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //获取订单列表成功
        case actionType.REQUEST_ORDER_PASSENGERS_SUCCESS : {
             return{
                ...state,
                loading:false,
                orderInfo: action.payload,
                orderList: state.orderList.concat( action.payload.data ),
            };
        }

        //获取订单列表失败
        case actionType.REQUEST_ORDER_PASSENGERS_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
            }
        }

        //tab切换
        case actionType.CHANGE_ORDER_TAB:{
            return{
                ...state,
                type : action.payload,
                page: 1,
                orderList:[],
            }
        }

        //页码增加
        case actionType.CHANGE_PAGE:{
            return{
                ...state,
                page : action.payload,
            }
        }
        

        default:
            return state;
    }
}



export default orderCenter;

