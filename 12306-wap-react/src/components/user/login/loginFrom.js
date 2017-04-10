import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './login.scss';
import icon from '../../../styles/sprite.css';


import LoginSubmit from './loginSubmit';


const loginValidate = values => {
    const error = {}
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    const { username , password } = values;
    if(!username){
        error.username= '用户名不可以为空';
        return error;
    }

    if( !phoneReg.test(username) ){
        error.username= '手机格式不正确';
        return error;
    }

    if(!password){
        error.password= '密码不可以为空';
        return error;
    }

    if(password.length < 8 || password.length > 16){
         error.password= '密码长度不正确8~16位';
         return error;
    }

    return error;
}


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class userField extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { input, label, type, meta: { touched, error} } = this.props;
        return(
            <div>
                <label styleName="login-from-input" >
                    <i styleName="cicon icon-login-user-ico"></i>
                  <input {...input} placeholder={label} type={type}/>
                </label>
                 {touched && (error && <p styleName="login-error">{error}</p>)}
            </div>
        );
    }
}


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class passwordField extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { input, label, type, meta: { touched, error} } = this.props;
        return(
            <div>
                <label styleName="login-from-input" >
                    <i styleName="cicon icon-login-password-ico"></i>
                  <input {...input} placeholder={label} type={type}/>
                </label>
                 {touched && (error && <p styleName="login-error">{error}</p>)}
            </div>
        );
    }
}



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class LoginFrom extends Component{

    constructor(props){
        super(props);
    }

    handleOnSubmit(data){
        this.props.onLogin(data);
    }

    render(){
        const { handleSubmit ,invalid ,error ,pristine ,loading } = this.props;
        return(
            <div styleName="login-from-container">
                <form>
                    <Field name="username" type="text" component={userField} label="请输入手机号码"/>
                    <Field name="password" type="password" component={passwordField} label="请输入密码"/>
                </form>
                <LoginSubmit 
                        handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                        disabled={ invalid || pristine || loading } 
                />
            </div> 
        )
    }
}




export default reduxForm({
  form: 'loginFrom',                 //你的redux-form的特殊标记，必填项
  validate:loginValidate,            // 上面定义的一个验证函数，使redux-form同步验证
})(LoginFrom)   



