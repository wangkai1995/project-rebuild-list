import { combineReducers } from 'redux';
import index from './index/indexRedux';
import list from './list/listRedux';
import seat from './seat/seatRedux';
import through from './through/throughRedux';
import fillOrder from './fillOrder/fillOrderRedux';
import orderDetail from './orderDetail/orderDetailRedux';
import setRobTicket from './setRobTicket/setRobTicketRedux';
import robTrainInfo from './robTrainInfo/robTrainInfoRedux';




export default combineReducers({
	index,
	list,
	seat,
    through,
    fillOrder,
    orderDetail,
    setRobTicket,
    robTrainInfo,
});




