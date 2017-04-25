import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import Pubilc from '../views/public/public';
import City from '../views/public/city/city';
import Faq from '../views/public/faq/faq';
import Feedback from '../views/public/feedback/feedback'
import AboutUs from '../views/public/aboutUs/aboutUs'
import Company from '../views/public/company/company'



const PublicRoutes =  function(){
    
    return(
        <Route path='/pubilc' component={Pubilc} >
            <Route path='/pubilc/city/:model/:direction' component={City}/>
            <Route path='/pubilc/faq' component={Faq}/>
            <Route path='/pubilc/feedback' component={Feedback}/>
            <Route path='/pubilc/aboutUs' component={AboutUs}/>
            <Route path='/pubilc/company' component={Company}/>
        </Route>
    )

};



export default PublicRoutes;

