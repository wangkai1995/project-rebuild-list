import React from 'react';
import RecatDOM from 'react-dom';
import routes from './routes/index';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
// import DevTools from './redux/DevTools';

//兼容处理单独引入
import assign from 'core-js/library/fn/object/assign';
import Promises from 'core-js/library//es6/promise';
Object.assign = Object.assign|| assign;
Promise = Promises;



const store = configureStore();
const history = syncHistoryWithStore( hashHistory , store );



RecatDOM.render((
	<Provider store={store} >
		<div>
			{routes(history)}
		</div>
	</Provider>
),document.getElementById('app'));




// RecatDOM.render((
// 	<Provider store={store} >
// 		<div>
// 			{routes(history)}
// 			<DevTools />
// 		</div>
// 	</Provider>
// ),document.getElementById('app'));




