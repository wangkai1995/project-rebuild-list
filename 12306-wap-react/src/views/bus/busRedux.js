import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';
import fillOrder from './fillOrder/fillOrderRedux';



export default combineReducers({
	index,
	list,
	fillOrder,
});



