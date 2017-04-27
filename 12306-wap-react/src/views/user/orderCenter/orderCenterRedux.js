import { combineReducers } from 'redux';
import orderCenter from '../../../components/user/orderCenter/orderCenterContainerRedux';
import * as orderCenterActions from '../../../components/user/orderCenter/orderCenterContainerAction';


//reducer
export default combineReducers({
    orderCenter,
});


//action
export const actions = orderCenterActions;


