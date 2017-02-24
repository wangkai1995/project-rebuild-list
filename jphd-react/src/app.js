import React ,{ Component } from 'react';
import ReactDom from 'react-dom';
import { Router ,Route ,Redirect ,IndexRoute ,browserHistory ,hashHistory} from 'react-router';
import RouteConfig from './Router/route';


ReactDom.render(
        RouteConfig,
    document.getElementById('app')
);