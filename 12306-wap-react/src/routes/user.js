import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import User from '../views/user/user';
import UserIndex from '../views/user/index/index';
import UserLogin from '../views/user/login/login';
import UserForgotPassword from '../views/user/forgotPassword/forgotPassword';
import UserRegister from '../views/user/register/register';
import UserAccount from '../views/user/account/account';
import UserPassengers from '../views/user/passengers/passengers';
import UserChangePassengers from '../views/user/changePassengers/changePassengers';
import UserOrderCenter from '../views/user/orderCenter/orderCenter';
import UserAddChilder from '../views/user/addChilder/addChilder';
import UserChangeAccount from '../views/user/changeAccount/changeAccount';
import UserChangeEmail from '../views/user/changeEmail/changeEmail';
import UserChangePassword from '../views/user/changePassword/changePassword';
import UserChangePhone from '../views/user/changePhone/changePhone';
import UserVaildatePhone from '../views/user/validatePhone/validatePhone';
import UserLogin12306 from '../views/user/login12306/login12306';


const UserRoutes =  function(){
    return(
        <Route path='/user' component={User} >
            <IndexRoute  component={UserIndex} />
            <Route path='/user/login'  component={UserLogin}/>
            <Route path='/user/forgotPassword'  component={UserForgotPassword}/>
            <Route path='/user/register'  component={UserRegister}/>
            <Route path='/user/account' component={UserAccount}/>
            <Route path='/user/passenger/:model' component={UserPassengers}/>
            <Route path='/user/changePassenger/:model/:id' component={UserChangePassengers}/>
            <Route path='/user/orderCenter' component={UserOrderCenter}/>
            <Route path='/user/addChilder' component={UserAddChilder}/>
            <Route path='/user/changeAccount' component={UserChangeAccount} />
            <Route path='/user/changeEmail/:email' component={UserChangeEmail} />
            <Route path='/user/changePassword' component={UserChangePassword} />
            <Route path='/user/changePhone' component={UserChangePhone} />
            <Route path='/user/validatePhone/:phone' component={UserVaildatePhone} />
            <Route path='/user/login12306' component={UserLogin12306} />
        </Route> 
    )      
};




export default UserRoutes;



