
import *  as actionType  from './changePassengersContainerType';



const initialState = {
  loading:false,
  error: false,
  isVisible: false,
  passengersInfo: false,
  addFlag:false,
  updateFlag:false,
}



function changePassengers( state = initialState , action){

        console.log(action,state);


    switch(action.type){
        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //请求失败
        case actionType.REQUEST_ERROR : {
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

        //重置乘客
        case actionType.RESET_PASSENGERS:{
             return{
                ...state,
                passengersInfo:false,
                loading:false,
            }
        }

        //请求乘客信息成功
        case actionType.REQUEST_PASSENGERS_INFO_SUCCESS : {
             return{
                ...state,
                loading:false,
                passengersInfo: action.payload,
            };
        }

        //添加成功
        case actionType.REQUEST_ADD_PASSENGERS_SUCCESS : {
             return{
                ...state,
                loading:false,
                addFlag: true,
            };
        }

        //更新成功
        case actionType.REQUEST_UPDATE_PASSENGERS_SUCCESS : {
             return{
                ...state,
                loading:false,
                updateFlag: true,
            };
        }


        
        default:
            return state;
    }
}



export default changePassengers;

