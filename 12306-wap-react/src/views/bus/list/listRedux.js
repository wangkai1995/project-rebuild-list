import { combineReducers } from 'redux';
import list from '../../../components/bus/list/listContainerRedux';
import * as cityActions from '../../../components/bus/list/listContainerAction';


//reducer
export default combineReducers({
	list,
});


//action
export const actions  = cityActions;