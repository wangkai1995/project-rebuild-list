import { combineReducers } from 'redux';
import ticketPay from '../../../components/pay/ticketPay/ticketPayContainerRedux';
import * as ticketPayActions from '../../../components/pay/ticketPay/ticketPayContainerAction';


//reducer
export default combineReducers({
    ticketPay,
});


//action
export const actions  = ticketPayActions;
