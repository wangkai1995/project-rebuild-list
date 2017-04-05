import *  as actionType  from './throughContainerType';


const initialState = {
    loading : false,
    error : false,
    throughData: {},
};



function seat( state = initialState , action){
    switch(action.type){


        //经停加载中
        case actionType.REQUEST_THROUGH_INFO_LOADIND : {
            return{
                ...state,
                loading: true,
            };
        }

        //经停加载错误
        case actionType.REQUEST_THROUGH_INFO_ERROR : {
            return{
                ...state,
                loading: false,
                error: action.error,
            };
        }
        
        //经停火车车次成功
        case actionType.REQUEST_THROUGH_INFO_SUCCESS : {
            return{
                ...state,
                loading:false,
                throughData: action.payload,
            };
        }

    
        default :
            return state;

    }
}


export default seat;

