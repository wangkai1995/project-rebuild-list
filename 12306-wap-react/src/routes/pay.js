import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import Pay from '../views/pay/pay';
import TicketPay from '../views/pay/ticketPay/ticketPay';

const PayRoutes =  function(){
    
    return(
        <Route path='/pay' component={Pay} >
        	<Route path='/pay/ticket/:model' component={TicketPay}/>
        </Route>
    )

};



export default PayRoutes;

