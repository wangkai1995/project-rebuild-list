import { combineReducers } from 'redux';
import search from '../../../components/train/index/searchContainerRedux';
import * as searchActions from '../../../components/train/index/searchContainerAction';

//reducer
export default combineReducers({
	search,
});


//action
export const actions = searchActions

