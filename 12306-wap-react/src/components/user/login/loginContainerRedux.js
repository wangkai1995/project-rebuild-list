
import *  as actionType  from './loginContainerType';



const initialState = {
  loading:false,
  error: false,
  loginInfo:false,
  loginType:1,   //1:账号密码登录 2:动态密码登录 
  validPhone:false,
  isVisible: false,
}



function login( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //登陆成功
        case actionType.REQUEST_LOGIN_SUCCESS : {
             return{
                ...state,
                loading:false,
                loginInfo: action.payload,
            };
        }

        //登陆失败
        case actionType.REQUEST_LOGIN_ERROR : {
            return{
                ...state,
                loading:false,
                isVisible:true,
                error : '账号或密码错误',
            }
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

        //登陆模式切换
        case actionType.CHANGE_LOGIN_TYPE : {
            return{
                ...state,
                loginType:action.payload,
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



export default login;
