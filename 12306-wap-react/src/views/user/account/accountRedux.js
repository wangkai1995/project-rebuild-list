import { combineReducers } from 'redux';
import account from '../../../components/user/account/accountContainerRedux';
import * as accountActions from '../../../components/user/account/accountContainerAction';


//reducer
export default combineReducers({
    account,
});


//action
export const actions = accountActions;

