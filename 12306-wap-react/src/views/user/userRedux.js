import { combineReducers } from 'redux';
import index from './index/indexRedux';
import login from './login/loginRedux';



export default combineReducers({
    index,
    login,
});

