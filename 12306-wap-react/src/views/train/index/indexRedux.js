import { combineReducers } from 'redux';
import search,{ changeDateAction ,showDateAction , hideDateAction ,findGDAction } from '../../../components/train/index/searchContainerRedux';


//reducer
export default combineReducers({
	search,
});


//action
export const actions = {
  	changeDateAction,
  	showDateAction,
  	hideDateAction,
  	findGDAction,
};

