import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './login.scss';
import icon from '../../../styles/sprite.css';


import LoginSubmit from './loginSubmit';
import ValidateCode from '../../lib/validateCode/index';



const loginValidate = values => {
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    if(!values){
        return false;
    }
    if( !phoneReg.test(values) ){
        return false;
    }
    return true;
}

const passwordValidate = values =>{
    if(values.length === 6){
        return true;
    }
    return false;
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
        this.state={
            submitFlag: false,
            validPhoneFlag:false,
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }


    handleOnSubmit(data){
        this.props.onLogin(data);
    }

    handleOnValidateCode(data){
        const { username } = data;
        this.props.onGetValidateCode(username);
    }


    handleUserName(event, newValue, previousValue){
        if(loginValidate(newValue)){
            this.setState({
                validPhoneFlag:true,
            })
            this.props.onVlidatePhone(newValue);
        }else{
            this.setState({
                validPhoneFlag:false,
            })
        }
    }

    handlePassword(event, newValue, previousValue){
        if(passwordValidate(newValue)){
            this.setState({
               submitFlag: true, 
            });
        }else{
            this.setState({
               submitFlag: false, 
            });
        }
    }


    render(){
        const { handleSubmit ,error ,pristine ,loading ,validPhone } = this.props;
        const { validPhoneFlag ,submitFlag } = this.state;     
        return(
            <div styleName="login-from-container">
                <form>
                    <Field name="username" onChange={ this.handleUserName } type="text" component={userField} label="请输入手机号码"/>
                    <label styleName="login-from-input" >
                        <i styleName="cicon icon-login-password-ico"></i>
                        <Field onChange={ this.handlePassword } name="password" type="password" component="input" placeholder="请输入动态密码"/>
                        <ValidateCode 
                                prefix="login"
                                disabled = { pristine || loading || !validPhone ||!validPhoneFlag } 
                                onHandleSubmit={ handleSubmit( this.handleOnValidateCode.bind(this) ) } 
                        />
                    </label>
                </form>
                <LoginSubmit 
                        handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                        disabled={ loading || !validPhone || !submitFlag } 
                />
            </div> 
        )
    }
}







export default reduxForm({
  form: 'loginPhoneFrom',                 //你的redux-form的特殊标记，必填项
})(LoginPhoneFrom)   



