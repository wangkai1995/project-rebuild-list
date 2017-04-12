import { combineReducers } from 'redux';
import forgotPassword from '../../../components/user/forgotPassword/forgotPasswordContainerRedux';
import * as forgotPasswordActions from '../../../components/user/forgotPassword/forgotPasswordContainerAction';


//reducer
export default combineReducers({
    forgotPassword,
});


//action
export const actions = forgotPasswordActions;


