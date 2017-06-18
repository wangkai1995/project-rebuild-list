
import *  as actionType  from './robTrainInfoContainerType';



const initialState = {
  loading:false,
  error: false,
  trainInfo :false,
}



function robTrainInfo( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_ROB_TRAIN_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //请求车次成功
        case actionType.REQUEST_ROB_TRAIN_SUCCESS : {
             return{
                ...state,
                loading:false,
                trainInfo: action.payload,
            };
        }

        //请求车次错误
        case actionType.REQUEST_ROB_TRAIN_ERROR : {
            return{
                ...state,
                loading:false,
                error : action.payload,
                trainInfo:false,
            }
        }

        //重置错误
        case actionType.RESET_ERROR : {
            return{
                ...state,
                error:false,
            }
        }


        default:
            return state;
    }
}



export default robTrainInfo;
