
import *  as actionType  from './searchContainerType';

//汽车票热门景区
function busRecommendAction(request){
	const { REQUEST_BUS_RECOMMEND_LOADING,REQUEST_BUS_RECOMMEND_SUCCESS, REQUEST_BUS_RECOMMEND_ERROR }  = actionType;
	return{
		type : [REQUEST_BUS_RECOMMEND_LOADING,REQUEST_BUS_RECOMMEND_SUCCESS, REQUEST_BUS_RECOMMEND_ERROR],
		request : request,
	};
}

//日期改变
function changeDateAction(date){
	return{
		type: actionType.SEARCH_DATE_CHANGE,
		payload: date,
	};
}


//显示日期选择控件
function showDateAction(){
	return{
		type: actionType.SHOW_DATE_MODAL,
	};
}


//关闭日期选择控件
function hideDateAction(){
	return{
		type: actionType.HIDE_DATE_MODAL,
	};
}

//初始化请求参数
function initParams(params){
	return{
		type:actionType.REQUEST_INIT_PARAMS,
		payload: params,
	}
}




export {changeDateAction ,showDateAction ,hideDateAction,busRecommendAction,initParams};
