import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';



export default combineReducers({
	index,
	list,
});