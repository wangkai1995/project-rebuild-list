import { combineReducers } from 'redux';
import setRobTicket from '../../../components/train/setRobTicket/setRobTicketContainerRedux';
import * as setRobTicketActions from '../../../components/train/setRobTicket/setRobTicketContainerAction';


//reducer
export default combineReducers({
    setRobTicket,
});


//action
export const actions  = setRobTicketActions;
