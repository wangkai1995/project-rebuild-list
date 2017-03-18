import { combineReducers } from 'redux';
import city from '../../../components/public/city/cityContainerRedux';
import * as cityActions from '../../../components/public/city/cityContainerAction';


//reducer
export default combineReducers({
	city,
});


//action
export const actions  = cityActions;