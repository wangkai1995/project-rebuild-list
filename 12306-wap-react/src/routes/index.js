import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import TrainIndex from '../views/train/index/index';
import City from '../views/public/city/city';


const routes = historys =>  (
	<Router history={historys}>
		<Route path='/train' component={TrainIndex} >
			<IndexRoute  component={TrainIndex} />
		</Route>
		<Route path='/city/:model/:direction' component={City}/>
		<Redirect from='*' to="/train" />
	</Router>
);


export default routes;




