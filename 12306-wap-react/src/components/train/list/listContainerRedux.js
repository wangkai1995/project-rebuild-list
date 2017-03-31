import *  as actionType  from './listContainerType';


import * as DateFilter from '../../../filter/Date';

const initialState = {
	loading : false,
	error : false,
	trainInfo: {},
	filterSeach: null,
	trainLisr: [],
	fromCode:'',
	toCode:'',
	detpDate:'',
	findGD:'',
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
};



function list( state = initialState , action){
	switch(action.type){
		
		//初始化请求数据
		case actionType.REQUEST_INIT_PARAMS:{
			return{
				...state,
				fromCode: action.payload.fromCityCode,
				toCode: action.payload.toCityCode,
				detpDate: action.payload.detpDate,
				findGD: action.payload.findGD,
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

		//初始化过滤条件
		case actionType.FILTER_INIT_SEACH : {
			return{
				...state,
				filterSeach: action.payload,
			}
		}

		//加载请求
		case actionType.REQUEST_DATERANGE_LOADING:{
			return{
				...state,
			}
		}
		
		//加载预售期
		case actionType.REQUEST_DATERANGE_SUCCESS:{
			return{
				...state,
				dateRange : parseInt(action.payload),
				maxDate :new Date( new Date().setDate( new Date().getDate()+parseInt(action.payload)) ),
			}
		}

		//预售期加载错误
		case actionType.REQUEST_DATERANGE_ERROR:{
			return{
				...state,
			}
		}


			
		default :
			return state;

	}
}


export default list;
