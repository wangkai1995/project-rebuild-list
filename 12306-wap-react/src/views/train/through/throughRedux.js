import { combineReducers } from 'redux';
import through from '../../../components/train/through/throughContainerRedux';
import * as throughActions from '../../../components/train/through/throughContainerAction';


//reducer
export default combineReducers({
    through,
});


//action
export const actions  = throughActions;