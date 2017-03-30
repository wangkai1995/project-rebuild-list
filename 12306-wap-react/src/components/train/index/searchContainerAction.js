
import *  as actionType  from './searchContainerType';


//获取发售日期范围
function dateRangeAction(request){
	const { REQUEST_LOADING, REQUEST_DATE_RANGE_SUCCESS, REQUEST_ERROR }  = actionType;
	return{
		type : [REQUEST_ERROR, REQUEST_DATE_RANGE_SUCCESS, REQUEST_ERROR],
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


//选中是否查询高铁
function findGDAction(bool){
	return{
		type: actionType.FIND_CHANGE,
		payload:bool,
	}
}



export { changeDateAction ,showDateAction ,hideDateAction ,findGDAction ,dateRangeAction };
