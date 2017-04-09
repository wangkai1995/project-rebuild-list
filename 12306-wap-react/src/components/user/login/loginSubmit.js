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


    getErrorMessage(){
        const { error } = this.props;
        if(error){
            return  <p styleName="login-error">{error}</p>
        }
    }

    
    render(){
        const { disabled ,handleSubmit } = this.props;
        const buttonClass=classnames({
            'login-submie': true,
            'login-submie-disabled':disabled,
        });
        return (
            <div>
                <div styleName="login-register">
                    <Link>忘记密码?</Link>
                    <Link>快速注册></Link>
                </div>
                <button
                    styleName={buttonClass}
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    登录
                </button>
               { this.getErrorMessage() }
            </div> 
        )
    }


}





export default LoginSubmit;
