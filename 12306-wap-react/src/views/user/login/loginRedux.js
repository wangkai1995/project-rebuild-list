import { combineReducers } from 'redux';
import login from '../../../components/user/login/loginContainerRedux';
import * as loginActions from '../../../components/user/login/loginContainerAction';


//reducer
export default combineReducers({
    login,
});


//action
export const actions = loginActions;