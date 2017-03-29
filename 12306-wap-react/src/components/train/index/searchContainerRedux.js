
const SEARCH_DATE_CHANGE = 'SEARCH_DATE_CHANGE';
const SHOW_DATE_MODAL = 'SHOW_DATE_MODAL';
const HIDE_DATE_MODAL= 'HIDE_DATE_MODAL';
const FIND_CHANGE = 'FIND_CHANGE';

const initialState = {
	isVisible: false,
	Date : new Date().format('yyyy-MM-dd'),
	showDate : new Date().format('MM月dd日'),
	showWeek: new Date().forWeek(),
	fromCityName: '',
	fromCityCode: '',
	toCityName:'',
	toCityCode:'',
	findGD:false
}

console.log(initialState);


//date用的antd控件默认则是moment对象
function changeDateAction(date){
	return{
		type: SEARCH_DATE_CHANGE,
		payload: date,
	};
}


//显示日期选择控件
function showDateAction(){
	return{
		type: SHOW_DATE_MODAL,
	};
}


//关闭日期选择控件
function hideDateAction(){
	return{
		type:HIDE_DATE_MODAL,
	};
}


//选中是否查询高铁
function findGDAction(bool){
	return{
		type: FIND_CHANGE,
		payload:bool,
	}
}

function search( state = initialState , action){
	
	switch(action.type){

		case SEARCH_DATE_CHANGE : {
			return{
				...state,
				Date : action.payload.format('yyyy-MM-dd'),
				showDate :  action.payload.format('MM月dd日'),
				showWeek:  action.payload.forWeek(),
			};
		}

		case FIND_CHANGE : {
			return{
				...state,
				findGD:action.payload,
			};
		}

		case SHOW_DATE_MODAL : {
			return{
				...state,
				isVisible: true,
			};
		}

		case HIDE_DATE_MODAL : {
			return{
				...state,
				isVisible:false,
			};
		}
			
		default:
			return state;
	}
}


export default search;
export { changeDateAction ,showDateAction ,hideDateAction ,findGDAction };