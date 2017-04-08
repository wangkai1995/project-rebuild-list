
import *  as actionType  from './loginContainerType';

const initialState = {
  loading:false,
  error:false,
  loginInfo: false,
}


function login( state = initialState , action){
    
    switch(action.type){

        case actionType.REQUEST_LOGIN_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        case actionType.REQUEST_LOGIN_SUCCESS : {
            return{
                ...state,
                loading:false,
                loginInfo : action.payload,
            }
        }

        case actionType.REQUEST_LOGIN_LOADING : {
            console.log(action.payload)
            return{
                ...state,
                loading:false,
                error : action.payload,
            }
        }

        default:
            return state;
    }
}



export default login;
