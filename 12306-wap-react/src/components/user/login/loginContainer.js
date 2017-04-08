import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';


import userModel from '../../../http/user/index';

import LoginTab from './loginTab';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserLoginContainer extends Component{

    constructor(props){
        super(props);
        console.log(this.props);
    }

    
    render(){
        return(
            <div>
                <LoginTab />
            </div>
        );
    }


}




export default UserLoginContainer;


