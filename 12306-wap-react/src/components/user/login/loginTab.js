import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class LoginTab extends Component{

    constructor(props){
        super(props);
        console.log(this.props);
    }

    
    render(){
        return(
            <ul styleName="login-tab">
                <li>普通登录</li>
                <li>手机动态密码登录</li>
            </ul>
        );
    }

}





export default LoginTab;




