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
    }

    
    render(){
        const { loginType } =this.props;
        return(
            <ul styleName="login-tab">
                <li styleName={loginType === 1? 'tab-active': ''}>
                    普通登录
                </li>
                <li styleName={loginType === 2? 'tab-active': ''}>
                    手机动态密码登录
                </li>
            </ul>
        );
    }

}





export default LoginTab;




