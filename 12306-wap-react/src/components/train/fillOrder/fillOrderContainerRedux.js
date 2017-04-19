import *  as actionType  from './fillOrderContainerType';


const initialState = {
    loading : false,
    error : false,
    insuranceInfo:false,
    userInfo:false,
    trainInfo:false,
    passengerInfo:false,
};



function seat( state = initialState , action){
    switch(action.type){

        //请求加载中
        case actionType.REQUEST_LOADIND : {
            return{
                ...state,
                loading: true,
            };
        }
        

        //请求保险信息成功
        case actionType.REQUEST_INSURANCE_SUCCESS:{
            return{
                ...state,
                loading:false,
                insuranceInfo:action.payload,
            }
        }


        //请求保险信息失败
        case actionType.REQUEST_INSURANCE_ERROR:{
            return{
                ...state,
                error:action.payload,
            }
        }

        //请求用户信息成功
        case actionType.REQUEST_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                userInfo : action.payload,
            }
        }

        
        //请求用户信息失败
        case actionType.REQUEST_USER_INFO_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
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
