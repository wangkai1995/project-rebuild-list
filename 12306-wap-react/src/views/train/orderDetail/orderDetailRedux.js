import { combineReducers } from 'redux';
import orderDetail from '../../../components/train/orderDetail/orderDetailContainerRedux';
import * as orderDetailActions from '../../../components/train/orderDetail/orderDetailContainerAction';


//reducer
export default combineReducers({
    orderDetail,
});


//action
export const actions  = orderDetailActions;
