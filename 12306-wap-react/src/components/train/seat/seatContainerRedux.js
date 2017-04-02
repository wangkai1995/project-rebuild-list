import *  as actionType  from './seatContainerType';


const initialState = {
	loading : false,
	error : false,
	trainInfo: {},
	fromCode:'',
	toCode:'',
	detpDate:'',
	trainCode:'',
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

	
		default :
			return state;

	}
}


export default seat;


