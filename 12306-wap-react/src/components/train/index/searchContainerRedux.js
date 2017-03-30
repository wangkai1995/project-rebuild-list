
import *  as actionType  from './searchContainerType';

const initialState = {
	isVisible: false,
	Date : new Date( new Date().setDate( new Date().getDate()+1) ).format('yyyy-MM-dd'),
	showDate : new Date( new Date().setDate( new Date().getDate()+1) ).format('MM月dd日'),
	showWeek: new Date( new Date().setDate( new Date().getDate()+1) ).forWeek(),
	fromCityName: '',
	fromCityCode: '',
	toCityName:'',
	toCityCode:'',
	findGD:false,
	//当天的前一天
	minDate: new Date( new Date().format('yyyy-MM-dd') ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
}



function search( state = initialState , action){
	
	switch(action.type){

		case actionType.SEARCH_DATE_CHANGE : {
			return{
				...state,
				Date : action.payload.format('yyyy-MM-dd'),
				showDate :  action.payload.format('MM月dd日'),
				showWeek:  action.payload.forWeek(),
			};
		}

		case actionType.FIND_CHANGE : {
			return{
				...state,
				findGD:action.payload,
			};
		}

		case actionType.SHOW_DATE_MODAL : {
			return{
				...state,
				isVisible: true,
			};
		}

		case actionType.HIDE_DATE_MODAL : {
			return{
				...state,
				isVisible:false,
			};
		}

		case actionType.REQUEST_DATE_RANGE_SUCCESS : {
			return{
				...state,
				dateRange : parseInt(action.payload),
				maxDate :new Date( new Date().setDate( new Date().getDate()+parseInt(action.payload)) ),
			}
		}

		case actionType.REQUEST_ERROR : {
			return{
				...state,
			}
		}

		default:
			return state;
	}
}



export default search;
