
import *  as actionType  from './searchContainerType';
import * as DateFilter from '../../../filter/Date';

const initialState = {
	loading: false,
	isVisible: false,
	detpDate :  DateFilter.getFormat (new Date( DateFilter.getFormat(new Date().setDate( new Date().getDate()+1) ,'yyyy-MM-dd') ), 'yyyy-MM-dd'),
	showDate :  DateFilter.getFormat(new Date().setDate( new Date().getDate()+1) ,'MM月dd日') ,
	showWeek :  DateFilter.getWeek(new Date().setDate( new Date().getDate()+1) ) ,
	fromCityName: '',
	fromCityCode: '',
	toCityName:'',
	toCityCode:'',
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd')  ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
	recommendList:{},
}



function search( state = initialState , action){
	switch(action.type){
		//初始化请求数据
		case actionType.REQUEST_INIT_PARAMS:{
			return{
				...state,
				// from: action.payload.fromCity,
				// to: action.payload.toCity,
				// startDate: action.payload.detpDate,
			}
		}

		case actionType.SEARCH_DATE_CHANGE : {
			return{
				...state,
				detpDate : DateFilter.getFormat(action.payload,'yyyy-MM-dd'),
				showDate :  DateFilter.getFormat(action.payload,'MM月dd日'),
				showWeek: DateFilter.getWeek( action.payload ),
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

		case actionType.REQUEST_BUS_RECOMMEND_LOADING : {
			return{
				...state,
				loading:true,
			}
		}

		case actionType.REQUEST_BUS_RECOMMEND_ERROR : {
			return{
				...state,
				loading:false,
				error: action.error,
			}
		}

		case actionType.REQUEST_BUS_RECOMMEND_SUCCESS : {
			return{
				...state,
				loading:false,
				recommendList: action.payload,
			}
		}

		default:
			return state;
	}
}



export default search;
