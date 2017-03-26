import *  as actionType  from './listContainerType';



const initialState = {
	loading : false,
	error : false,
	trainInfo:{},
	trainLisr:[],
	fromCode:'',
	toCode:'',
	detpDate:'',
	findGD:'',
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

		//加载中
		case actionType.REQUEST_TRAIN_INFO_LOADIND : {
			return{
				...state,
				loading: true,
			};
		}

		//加载错误
		case actionType.REQUEST_TRAIN_INFO_ERROR : {
			return{
				...state,
				loading: false,
				error: action.error,
			};
		}
		
		//加载火车站城市
		case actionType.REQUEST_TRAIN_INFO_SUCCESS : {
			return{
				...state,
				loading:false,
				trainInfo: action.payload,
			};
		}

		//过滤火车站城市
		case actionType.FILTER_TRAIN_INFO : {
			return{
				...state,
				trainInfo: action.payload,
			}
		}

			
		default :
			return state;

	}
}


export default list;
