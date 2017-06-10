
import *  as actionType  from './changeAccountContainerType';

const initialState = {
  loading:false,
  error:false,
  changeFlat: false,
  userInfo:false,
}


function account( state = initialState , action){
    
    switch(action.type){

        case actionType.REQUEST_USER_INFO_LOADING : {
            return{
                ...state,
                loading:true,
                changeFlat : false,
            };
        }

        case actionType.REQUEST_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                userInfo : action.payload,
            }
        }

        case actionType.REQUEST_USER_INFO_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
            }
        }

        case actionType.REQUEST_CHANGE_ACCOUNT_USER_INFO_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        case actionType.REQUEST_CHANGE_ACCOUNT_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                changeFlat : true,
            }
        }

        case actionType.REQUEST_CHANGE_ACCOUNT_USER_INFO_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
            }
        }

        case actionType.RESET_ERROR:{
            return{
                ...state,
                error : false,
            }
        }

        default:
            return state;
    }
}



export default account;

