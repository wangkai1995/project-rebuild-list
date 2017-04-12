import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import User from '../views/user/user';
import UserIndex from '../views/user/index/index';
import UserLogin from '../views/user/login/login';
import UserForgotPassword from '../views/user/forgotPassword/forgotPassword'



const UserRoutes =  function(){
    return(
        <Route path='/user' component={User} >
            <IndexRoute  component={UserIndex} />
            <Route path='/user/login'  component={UserLogin}/>
            <Route path='/user/forgotPassword'  component={UserForgotPassword}/>
        </Route> 
    )      
};


export default UserRoutes;


