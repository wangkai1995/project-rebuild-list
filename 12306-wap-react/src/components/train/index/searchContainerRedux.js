
import *  as actionType  from './searchContainerType';
import * as DateFilter from '../../../filter/Date';

const initialState = {
	isVisible: false,
	detpDate :  DateFilter.getFormat (new Date( DateFilter.getFormat(new Date().setDate( new Date().getDate()+1) ,'yyyy-MM-dd') ), 'yyyy-MM-dd'),
	showDate :  DateFilter.getFormat(new Date().setDate( new Date().getDate()+1) ,'MM月dd日') ,
	showWeek :  DateFilter.getWeek(new Date().setDate( new Date().getDate()+1) ) ,
	fromCityName: '',
	fromCityCode: '',
	toCityName:'',
	toCityCode:'',
	findGD:false,
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd')  ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
}


function search( state = initialState , action){
	
	switch(action.type){

		case actionType.SEARCH_DATE_CHANGE : {
			return{
				...state,
				detpDate : DateFilter.getFormat(action.payload,'yyyy-MM-dd'),
				showDate :  DateFilter.getFormat(action.payload,'MM月dd日'),
				showWeek: DateFilter.getWeek( action.payload ),
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
