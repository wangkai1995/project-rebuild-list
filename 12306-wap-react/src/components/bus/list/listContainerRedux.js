import *  as actionType  from './listContainerType';
import * as DateFilter from '../../../filter/Date';

const initialState = {
	loading : false,
	error : false,
	busInfo: {},
	from:'',
	to:'',
	startDate:'',
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
};



function list( state = initialState , action){
	switch(action.type){

		//车次加载中
		case actionType.REQUEST_BUS_INFO_LOADIND : {
			return{
				...state,
				loading:true,
			};
		}

		//车次加载错误
		case actionType.REQUEST_BUS_INFO_ERROR : {
			return{
				...state,
				loading: false,
				error: action.error,
			};
		}
		
		//加载火车车次成功
		case actionType.REQUEST_BUS_INFO_SUCCESS : {
			return{
				...state,
				loading:false,
				busInfo: action.payload,
			};
		}



			
		default :
			return state;

	}
}


export default list;
