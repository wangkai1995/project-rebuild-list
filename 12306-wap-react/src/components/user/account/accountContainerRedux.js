
import *  as actionType  from './accountContainerType';

const initialState = {
  loading:false,
  error:false,
  userInfo:false,
}


function account( state = initialState , action){
    
    switch(action.type){

        case actionType.REQUEST_ACCOUNT_USER_INFO_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        case actionType.REQUEST_ACCOUNT_USER_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                userInfo : action.payload,
            }
        }

        case actionType.REQUEST_ACCOUNT_USER_INFO_ERROR : {
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



export default account;

