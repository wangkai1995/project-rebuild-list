import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';
import seat from './seat/seatRedux';
import through from './through/throughRedux';



export default combineReducers({
	index,
	list,
	seat,
    through,
});



