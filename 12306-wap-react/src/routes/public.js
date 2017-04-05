import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

import City from '../views/public/city/city';



const PublicRoutes =  function(){
    
    return(
        <Route path='/city/:model/:direction' component={City}/>
    )

};



export default PublicRoutes;
