import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';



import TrainRoutes from './train';
import BusRoutes from './bus';
import PublicRoutes from './public';
import UserRoutes from './user';
import PayRoutes from './pay';



const routes = historys =>  (
	<Router history={historys}>

		{ TrainRoutes() }
		{ BusRoutes() }
		{ PublicRoutes() }
        { UserRoutes() }
        { PayRoutes() }

		<Redirect from='*' to="/train" />
	</Router>
);


export default routes;




