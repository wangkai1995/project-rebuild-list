import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';


import TrainIndex from '../views/train/index/index'; 


const routes = historys =>  (
	<Router history={historys}>
		<Route path='/' component={TrainIndex} >
			<IndexRoute  component={TrainIndex} />
		</Route>
		<Redirect from='*' to="/" />
	</Router>
);


export default routes;




