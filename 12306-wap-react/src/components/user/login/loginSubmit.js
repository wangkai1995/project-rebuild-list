import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class LoginSubmit extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
        const { disabled ,handleSubmit } = this.props;
        const buttonClass=classnames({
            'login-submie': true,
            'button-disabled':disabled,
        });
        return (
            <div>
                <div styleName="login-register">
                    <Link>忘记密码?</Link>
                    <Link>快速注册></Link>
                </div>
                <span
                    styleName={buttonClass}
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    登录
                </span>
            </div> 
        )
    }


}





export default LoginSubmit;
