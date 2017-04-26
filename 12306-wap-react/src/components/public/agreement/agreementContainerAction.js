
import *  as actionType  from './agreementContainerType';




//请求文章
function requestArticle(request,params){
    const { REQUEST_LOADING, REQUEST_ARTICLE_SUCCESS, REQUEST_ARTICLE_ERROR }  = actionType;
    return{
        type : [REQUEST_LOADING, REQUEST_ARTICLE_SUCCESS, REQUEST_ARTICLE_ERROR],
        request : request,
        params: params,
    }
}




export {  requestArticle };