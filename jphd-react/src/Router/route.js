import React ,{ Component } from 'react';
import { Router ,Route ,Redirect ,IndexRoute ,browserHistory ,hashHistory} from 'react-router';
import { layout } from '../App/layout';

class Roots extends Component{
    render(){
        return(
            <div>{this.props.children}</div>
        );
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;


const RouteConfig = (
        <Router history = {history}>
                <Route path="/" component={Roots}>
                    <IndexRoute component={layout}/>
                    <Route path='index' component={layout} />
                    <Redirect from="*" to='/' />
                </Route>
        </Router>
)


export default RouteConfig;