import { combineReducers } from 'redux';
import search from '../../../components/bus/index/searchContainerRedux';
import * as searchActions from '../../../components/bus/index/searchContainerAction';

export default combineReducers({
	search,
});

export const actions = searchActions
