import {combineReducers} from 'redux';
import fillOrder from '../../../components/bus/fillOrder/fillOrderContainerRedux';
import * as fillOrderActions from '../../../components/bus/fillOrder/fillOrderContainerAction';


//reducer
export default combineReducers({
    fillOrder,
});


//action
export const actions  = fillOrderActions;