import { combineReducers } from 'redux';
import changeAccount from '../../../components/user/changeAccount/changeAccountContainerRedux';
import * as changeAccountActions from '../../../components/user/changeAccount/changeAccountContainerAction';


//reducer
export default combineReducers({
    changeAccount,
});


//action
export const actions = changeAccountActions;

