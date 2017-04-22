
import *  as actionType  from './changePassengersContainerType';



const initialState = {
  loading:false,
  error: false,
  isVisible: false,
  passengers: false,
}



function passengers( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //验证手机号码可用
        case actionType.REQUEST_PASSWNGERS_SUCCESS : {
             return{
                ...state,
                loading:false,
                passengers: action.payload,
            };
        }

        //验证手机号码不可用
        case actionType.REQUEST_PASSWNGERS_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
            }
        }

        //重置错误
        case actionType.RESET_ERROR : {
            return{
                ...state,
                isVisible:false,
                error:false,
            }
        }
        

        default:
            return state;
    }
}



export default passengers;

