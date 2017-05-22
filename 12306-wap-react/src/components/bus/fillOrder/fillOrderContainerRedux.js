import *  as actionType  from './fillOrderContainerType';


const initialState = {
    loading : false,
    error : false,
    insuranceInfo:false,
    userInfo:false,
    serviceInfo:false,
};



function seat( state = initialState , action){
    switch(action.type){

        //请求加载中
        case actionType.REQUEST_BUS_FILLORDER_LOADIND : {
            return{
                ...state,
                loading: true,
            };
        }

         //请求失败
        case actionType.REQUEST_BUS_FILLORDER_ERROR:{
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        }
       
        //请求用户信息成功
        case actionType.REQUEST_BUS_FILLORDER_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                userInfo : action.payload,
            }
        }

        //请求服务费
        case actionType.REQUEST_BUS_FILLORDER_SERVICE_CHARGE_SUCCESS : {
            return{
                ...state,
                loading:false,
                serviceInfo : action.payload,
            }
        }

         //请求保险信息成功
        case actionType.REQUEST_BUS_FILLORDER_INSURANCE_SUCCESS:{
            return{
                ...state,
                loading:false,
                insuranceInfo:action.payload,
            }

        }

    
        default :
            return state;

    }
}


export default seat;
