import { combineReducers } from 'redux';
import list from '../../../components/train/list/listContainerRedux';
import * as cityActions from '../../../components/train/list/listContainerAction';


//reducer
export default combineReducers({
	list,
});


//action
export const actions  = cityActions;