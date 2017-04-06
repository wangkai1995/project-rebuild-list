import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';



import TrainRoutes from './train';
import PublicRoutes from './public';
import UserRoutes from './user';



const routes = historys =>  (
	<Router history={historys}>

		{ TrainRoutes() }
		{ PublicRoutes() }
        { UserRoutes() }

		<Redirect from='*' to="/train" />
	</Router>
);



export default routes;




