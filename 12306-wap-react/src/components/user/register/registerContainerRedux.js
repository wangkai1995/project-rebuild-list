
import *  as actionType  from './registerContainerType';



const initialState = {
  loading:false,
  error: false,
  agreement: true,
  validPhone:false,
  isVisible: false,
  registerFlag: false,
}



function forgotPassword( state = initialState , action){
    
    switch(action.type){

        //选择协议
        case actionType.AGREEMENT_FLAG : {
            return{
                ...state,
                agreement:action.payload,
            }
        }


        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }


        //请求注册成功
        case actionType.REQUEST_REGISTER_SUCCESS : {
            return{
                ...state,
                loading: false,
                registerFlag:true,
            };
        }


        //请求注册失败
        case actionType.REQUEST_REGISTER_ERROR : {
            return{
                ...state,
                loading: false,
                isVisible: true,
                error:action.payload,
            };
        }


        //验证手机号码可用
        case actionType.REQUEST_VALIDPHONE_SUCCESS : {
             return{
                ...state,
                loading:false,
                validPhone: action.payload !== 1,
                isVisible: action.payload === 1,
                error : action.payload === 1? '该手机号码已经注册':false,
            };
        }

        //验证手机号码不可用
        case actionType.REQUEST_VALIDPHONE_ERROR : {
            return{
                ...state,
                loading:false,
                isVisible:true,
                error : '该手机号码已经注册',
            }
        }

        //发送验证码成功
        case actionType.REQUEST_VALIDCODE_SUCCESS:{
            return{
                ...state,
                loading:false,
            }
        }

         //发送验证码成功
        case actionType.REQUEST_VALIDCODE_ERROR:{
            return{
                ...state,
                loading:false,
                isVisible:true,
                error : '发送验证码失败错误信息:'+action.payload,
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
