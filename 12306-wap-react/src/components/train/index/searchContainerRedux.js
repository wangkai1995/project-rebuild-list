import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const SEARCH_DATE_CHANGE = 'SEARCH_DATE_CHANGE';
const SHOW_DATE_MODAL = 'SHOW_DATE_MODAL';
const HIDE_DATE_MODAL= 'HIDE_DATE_MODAL';
const FIND_CHANGE = 'FIND_CHANGE';

const initialState = {
	isVisible: false,
	Date : moment().format('MM月DD日'),
	showDate : moment().format('MM月DD日'),
	showWeek: moment().format('dddd'),
	fromCityName: '深圳',
	fromCityCode: 'SZQ',
	toCityName:'北京',
	toCityCode:'BJP',
	findGD:false
}


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
				Date : action.payload.format('MM月DD日'),
				showDate :  action.payload.format('MM月DD日'),
				showWeek:  action.payload.format('dddd'),
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