import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';
import seat from './seat/seatRedux';



export default combineReducers({
	index,
	list,
	seat,
});