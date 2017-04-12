import { combineReducers } from 'redux';
import register from '../../../components/user/register/registerContainerRedux';
import * as registerActions from '../../../components/user/register/registerContainerAction';


//reducer
export default combineReducers({
    register,
});


//action
export const actions = registerActions;


