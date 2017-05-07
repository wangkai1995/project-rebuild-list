import *  as actionType  from './setRobTicketContainerType';
import * as DateFilter from '../../../filter/Date';

const initialState = {
	loading : false,
	error : false,
	packInfo: false,
	//当天的前一天
	minDate: new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ),
	maxDate: new Date( new Date().setDate( new Date().getDate()+30) ),
	dateRange:0,
};



function setRobTicket( state = initialState , action){
	switch(action.type){
		

		//加速包加载中
		case actionType.REQUEST_PACK_LOADING : {
			return{
				...state,
				loading: true,
			};
		}

		//加速包加载成功
		case actionType.REQUEST_PACK_SUCCESS : {
			return{
				...state,
				loading: false,
				packInfo: action.payload,
			};
		}

		//加速包加载失败
		case actionType.REQUEST_PACK_ERROR : {
			return{
				...state,
				loading: false,
				error: action.payload,
			};
		}

		//车次加载中
		case actionType.REQUEST_DATERANGE_LOADING : {
			return{
				...state,
				loading: true,
			};
		}
		
		//加载预售期
		case actionType.REQUEST_DATERANGE_SUCCESS:{
			return{
				...state,
				loading: false,
				dateRange : parseInt(action.payload),
				maxDate :new Date( new Date().setDate( new Date().getDate()+parseInt(action.payload)) ),
			}
		}

		//预售期加载错误
		case actionType.REQUEST_DATERANGE_ERROR:{
			console.log(error+'加速包加载错误');
			return{
				...state,
				loading: false,
				error: false,
			}
		}


		default :
			return state;

	}
}


export default setRobTicket;

