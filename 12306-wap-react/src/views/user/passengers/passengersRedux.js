import { combineReducers } from 'redux';
import passengers from '../../../components/user/passengers/passengersContainerRedux';
import * as passengersActions from '../../../components/user/passengers/passengersContainerAction';


//reducer
export default combineReducers({
    passengers,
});


//action
export const actions = passengersActions;


