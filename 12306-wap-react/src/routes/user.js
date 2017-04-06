import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import User from '../views/user/user';
import UserIndex from '../views/user/index/index';



const UserRoutes =  function(){
    return(
        <Route path='/user' component={User} >
            <IndexRoute  component={UserIndex} />
        </Route> 
    )      
};


export default UserRoutes;


