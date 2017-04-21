import { combineReducers } from 'redux';
import changePassengers from '../../../components/user/changePassengers/changePassengersContainerRedux';
import * as changePassengersActions from '../../../components/user/changePassengers/changePassengersContainerAction';


//reducer
export default combineReducers({
    changePassengers,
});




//action
export const actions = changePassengersActions;



