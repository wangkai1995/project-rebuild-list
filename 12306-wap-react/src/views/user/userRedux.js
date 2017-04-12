import { combineReducers } from 'redux';
import index from './index/indexRedux';
import login from './login/loginRedux';
import forgotPassword from './forgotPassword/forgotPasswordRedux'



export default combineReducers({
    index,
    login,
    forgotPassword,
});

