import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import Pubilc from '../views/public/public';
import City from '../views/public/city/city';
import Faq from '../views/public/faq/faq';
import Feedback from '../views/public/feedback/feedback'
import AboutUs from '../views/public/aboutUs/aboutUs'
import Company from '../views/public/company/company'
import Legalnotices from '../views/public/legalnotices/legalnotices';
import AgreementList from '../views/public/agreementList/agreementList';
import Agreement from '../views/public/agreement/agreement';



const PublicRoutes =  function(){
    
    return(
        <Route path='/public' component={Pubilc} >
            <Route path='/public/city/:model/:direction' component={City}/>
            <Route path='/public/faq' component={Faq}/>
            <Route path='/public/feedback' component={Feedback}/>
            <Route path='/public/aboutUs' component={AboutUs}/>
            <Route path='/public/company' component={Company}/>
            <Route path='/public/legalnotices' component={Legalnotices} />
            <Route path='/public/agreementList' component={AgreementList} />
            <Route path='/public/agreement/:id' component={Agreement} />
        </Route>
    )

};



export default PublicRoutes;

