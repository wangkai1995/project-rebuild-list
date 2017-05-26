import { combineReducers } from 'redux';
import list from '../../../components/bus/list/listContainerRedux';
import * as listActions from '../../../components/bus/list/listContainerAction';


//reducer
export default combineReducers({
	list,
});


//action
export const actions  = listActions;
