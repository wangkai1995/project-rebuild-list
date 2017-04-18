import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';
import seat from './seat/seatRedux';
import through from './through/throughRedux';
import fillOrder from './fillOrder/fillOrderRedux';



export default combineReducers({
	index,
	list,
	seat,
    through,
    fillOrder,
});



