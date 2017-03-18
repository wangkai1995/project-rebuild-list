import *  as actionType  from './cityContainerType';


const initialState = {
	loading : false,
	error : false,
	scrollTop: 0,
	citys : [],
	hotCitys : [],
}


function city( state = initialState , action){
	switch(action.type){
		
		//加载中
		case actionType.REQUEST_LOADING : {
			return{
				...state,
				loading: true,
			};
		}

		//加载错误
		case actionType.REQUEST_ERROR : {
			return{
				...state,
				loading: false,
				error: action.error,
			};
		}
		
		//加载火车站城市
		case actionType.REQUEST_TRAIN_CITY : {
			return{
				...state,
				loading:false,
				citys: action.payload,
			};
		}
		
		//加载火车票热门城市
		case actionType.REQUEST_HOT_CITY : {
			return{
				...state,
				loading: false,
				hotCitys: action.payload,
			};
		}
		
		//点击瞄点定位
		case actionType.CLICK_ANCHOR : {
			return{
				...state,
				scrollTop: action.payload,
			};
		}

		//选中城市
		case actionType.CHECK_CITY : {
			return{
				...state,
			};
		}

		//输入城市
		case actionType.INPUT_CHANGE : {
			return{
				...state,
			};
		}
		
		
		default :
			return state;

	}
}


export default city;
