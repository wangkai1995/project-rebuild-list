
import *  as actionType  from './agreementListContainerType';



const initialState = {
  loading:false,
  error: false,
  article :false,
}



function agreementList( state = initialState , action){
    
    switch(action.type){
        //请求loading
        case actionType.REQUEST_LOADING : {
            return{
                ...state,
                loading:true,
            };
        }

        //请求文章成功
        case actionType.REQUEST_ARTICLE_SUCCESS : {
             return{
                ...state,
                loading:false,
                article: action.payload,
            };
        }

        //请求文章成功
        case actionType.REQUEST_ARTICLE_ERROR : {
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



export default agreementList;
