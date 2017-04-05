import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';



import TrainRoutes from './train';
import PublicRoutes from './public';



const routes = historys =>  (
	<Router history={historys}>

		{TrainRoutes()}
		{PublicRoutes()}

		<Redirect from='*' to="/train" />
	</Router>
);



export default routes;




