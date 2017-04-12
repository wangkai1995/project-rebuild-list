
import *  as actionType  from './registerContainerType';



const initialState = {
  loading:false,
  error: false,
  validPhone:false,
  isVisible: false,
}



function forgotPassword( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //验证手机号码可用
        case actionType.REQUEST_VALIDPHONE_SUCCESS : {
             return{
                ...state,
                loading:false,
                validPhone: action.payload === 1,
                isVisible: action.payload !== 1,
                error : action.payload !== 1? '该手机号码没有注册':false,
            };
        }

        //验证手机号码不可用
        case actionType.REQUEST_VALIDPHONE_ERROR : {
            return{
                ...state,
                loading:false,
                isVisible:true,
                error : '该手机号码没有注册',
            }
        }

        //设置错误信息
        case actionType.SET_ERROR : {
            return{
                ...state,
                isVisible:true,
                error:action.payload, 
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



export default forgotPassword;
