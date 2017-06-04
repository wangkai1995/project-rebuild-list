import { combineReducers } from 'redux';
import index from './index/indexRedux';
import login from './login/loginRedux';
import forgotPassword from './forgotPassword/forgotPasswordRedux';
import register from './register/registerRedux';
import account from './account/accountRedux';
import passengers from './passengers/passengersRedux';
import changePassengers from './changePassengers/changePassengersRedux';
import orderCenter from './orderCenter/orderCenterRedux';
import changeAccount from './changeAccount/changeAccountRedux';




export default combineReducers({
    index,
    login,
    forgotPassword,
    register,
    account,
    passengers,
    changePassengers,
    orderCenter,
    changeAccount,
});



