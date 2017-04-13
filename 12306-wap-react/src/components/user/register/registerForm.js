import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './register.scss';
import icon from '../../../styles/sprite.css';



import ValidateCode from '../../lib/validateCode/index';
import RegisterSubmit from './registerSubmit';



const phoneVlidate = values => {
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    if(!values){
        return false;
    }
    if( !phoneReg.test(values) ){
        return false;
    }
    return true;
}


const registerVlidate = values =>{
    let error={};
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    const { username,password,validPassword,validCode } = values;

    if( !phoneReg.test(username) ){
        error.username='手机号码格式不正确'
        return error;
    }

    if( !password || (password.length<7 && password>16) ){
        error.password='密码不可以为空,长度8-16位'
        return error;
    }

    if( password !== validPassword ){
        error.validPassword='两次密码输入不一致'
        return error;
    }

    if( !validCode || validCode.length !== 6 ){
        error.validCode='验证码不可以为空,长度6位'
        return error;
    }

    return error;
}



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class RegisterUserField extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { input, label, type, meta: { touched, error} } = this.props;
        return(
            <div>
                <label styleName="register-from-input" >
                    <i styleName="cicon icon-login-user-ico"></i>
                  <input {...input} placeholder={label} type={type}/>
                </label>
                 {touched && (error && <p styleName="register-error">{error}</p>)}
            </div>
        );
    }
}

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class RegisterPasswordField extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { input, label, type, meta: { touched, error} } = this.props;
        return(
            <div>
                <label styleName="register-from-input" >
                    <i styleName="cicon icon-login-password-ico"></i>
                  <input {...input} placeholder={label} type={type}/>
                </label>
                 {touched && (error && <p styleName="register-error">{error}</p>)}
            </div>
        );
    }
}



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class RegisterFrom extends Component{

    constructor(props){
        super(props);
        this.state={
            validPhoneFlag:false,
        }
        this.handleUserName = this.handleUserName.bind(this);
    }

    handleOnSubmit(data){
        this.props.onRegister(data);
    }

    handleOnValidateCode(data){
        const { username } = data;
        this.props.onGetValidateCode(username);
    }

    handleUserName(event, newValue, previousValue){
        if(phoneVlidate(newValue)){
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

    render(){
        const { handleSubmit ,invalid ,pristine ,loading ,validPhone ,agreement,onCheckAgreement} = this.props;
        const { validPhoneFlag  } = this.state;     
        return(
            <div styleName="register-from-container">
                <form>
                    <Field name="username" onChange={ this.handleUserName } type="text" component={RegisterUserField} label="请输入手机号码"/>
                    <Field name="password"  type="password" component={RegisterPasswordField} label="请输入密码8-16位字母,数字和符号"/>
                    <Field name="validPassword"  type="password" component={RegisterPasswordField} label="密码确认"/>
                    <label styleName="register-from-input" >
                        <i styleName="cicon icon-login-validation-ico"></i>
                        <Field onChange={ this.handlePassword } name="validCode" type="text" component="input" placeholder="请输入验证码"/>
                        <ValidateCode 
                                prefix="login"
                                disabled = { pristine || loading || !validPhone ||!validPhoneFlag } 
                                onHandleSubmit={ handleSubmit( this.handleOnValidateCode.bind(this) ) } 
                        />
                    </label>
                    <RegisterSubmit 
                            onCheckAgreement={onCheckAgreement}
                            handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                            disabled={ !agreement || invalid || loading || !validPhone } 
                    />
                </form>
            </div> 
        )
    }
}







export default reduxForm({
  form: 'registerFrom',                 //你的redux-form的特殊标记，必填项
  validate: registerVlidate,
})(RegisterFrom)   
