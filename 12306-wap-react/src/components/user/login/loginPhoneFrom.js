import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './login.scss';
import icon from '../../../styles/sprite.css';


import LoginSubmit from './loginSubmit';
import ValidateCode from './loginValidateCode';



const loginValidate = values => {
    const error = {}
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    const { username , password } = values;
    if(!username){
        error._error= '手机号码不可以为空';
        return error;
    }
    if( !phoneReg.test(username) ){
        error._error= '手机格式不正确';
        return error;
    }
    return error;
}

const passwordValidate = values =>{
    if(!values){
        return false;
    }

    if(values>6){
        return false;
    }
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
class LoginPhoneFrom extends Component{

    constructor(props){
        super(props);
        this.handleTest = this.handleTest.bind(this);
    }

    handleOnSubmit(data){
        this.props.onLogin(data);
    }

    handleOnValidateCode(data){
        const { username } = data;
        this.props.onVlidateCode(username);
    }

    ///
    handleTest(event, newValue, previousValue){
        console.log(event, newValue, previousValue);
    }


    render(){
        const { handleSubmit ,invalid ,error ,pristine ,loading ,validPhone } = this.props;
        return(
            <div styleName="login-from-container">
                <form>
                    <Field name="username" type="text" component={userField} label="请输入手机号码"/>
                    <label styleName="login-from-input" >
                        <i styleName="cicon icon-login-password-ico"></i>
                        <Field onChange={ this.handleTest } name="password" type="password" component="input" placeholder="请输入动态密码"/>
                        <ValidateCode 
                                disabled = { invalid || pristine || loading } 
                                handleSubmit={ handleSubmit( this.handleOnValidateCode.bind(this) ) } 
                        />
                    </label>
                </form>
                <LoginSubmit 
                        handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                        disabled={ invalid || pristine || loading || !validPhone } 
                />
            </div> 
        )
    }
}






export default reduxForm({
  form: 'loginPhoneFrom',                 //你的redux-form的特殊标记，必填项
  validate:loginValidate,            // 上面定义的一个验证函数，使redux-form同步验证
})(LoginPhoneFrom)   



