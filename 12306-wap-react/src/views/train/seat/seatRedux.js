import { combineReducers } from 'redux';
import seat from '../../../components/train/seat/seatContainerRedux';
import * as cityActions from '../../../components/train/seat/seatContainerAction';


//reducer
export default combineReducers({
	seat,
});


//action
export const actions  = cityActions;