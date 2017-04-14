
import *  as actionType  from './indexContainerType';

const initialState = {
  loading:false,
  error:false,
  userInfo:false,
}


function index( state = initialState , action){
    
    switch(action.type){

        case actionType.REQUEST_USER_INFO_LOADING : {
            return{
                ...state,
                loading:true,
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

        case actionType.RESET_USER_INFO :{
            return{
                ...state,
                userInfo:false
            }
        }

        default:
            return state;
    }
}



export default index;
