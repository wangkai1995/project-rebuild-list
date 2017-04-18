import { combineReducers } from 'redux';
import fillOrder from '../../../components/train/fillOrder/fillOrderContainerRedux';
import * as fillOrderActions from '../../../components/train/fillOrder/fillOrderContainerAction';


//reducer
export default combineReducers({
    fillOrder,
});


//action
export const actions  = fillOrderActions;

