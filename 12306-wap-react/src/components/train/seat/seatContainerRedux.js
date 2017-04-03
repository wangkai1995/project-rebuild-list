import *  as actionType  from './seatContainerType';
import * as DateFilter from '../../../filter/Date';


const initialState = {
	loading : false,
	error : false,
	trainInfo: {},
	fromCode:'',
	toCode:'',
	detpDate:'',
	trainCode:'',
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
};



function seat( state = initialState , action){
	switch(action.type){

		//初始化请求数据
		case actionType.REQUEST_INIT_PARAMS:{
			return{
				...state,
				fromCode: action.payload.fromCityCode,
				toCode: action.payload.toCityCode,
				detpDate: action.payload.detpDate,
				trainCode: action.payload.trainCode,
			}
		}

		//车次加载中
		case actionType.REQUEST_TRAIN_INFO_LOADIND : {
			return{
				...state,
				loading: true,
			};
		}

		//车次加载错误
		case actionType.REQUEST_TRAIN_INFO_ERROR : {
			return{
				...state,
				loading: false,
				error: action.error,
			};
		}
		
		//加载火车车次成功
		case actionType.REQUEST_TRAIN_INFO_SUCCESS : {
			return{
				...state,
				loading:false,
				trainInfo: action.payload,
			};
		}

		//加载预售期
		case actionType.REQUEST_DATERANGE_SUCCESS:{
			var date = new Date().getDate();
			return{
				...state,
				dateRange : parseInt(action.payload),
				maxDate :new Date( new Date().setDate( date + parseInt(action.payload)) ),
			}
		}

		//预售期加载错误
		case actionType.REQUEST_DATERANGE_ERROR:{
			console.log(action.payload)
			return{
				...state,
			}
		}

	
		default :
			return state;

	}
}


export default seat;


