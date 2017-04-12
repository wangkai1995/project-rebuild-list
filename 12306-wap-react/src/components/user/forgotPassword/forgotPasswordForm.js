import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './forgotPassword.scss';


import ValidateCode from '../../lib/validateCode/index';

import ForgotPasswordSubmit from './forgotPasswordSubmit';



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
@CSSModules(styles,{allowMultiple: true})
class ForgotPasswordFrom extends Component{

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
        console.log(date)
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
            <div styleName="forgot-password-form">
                <form>
                    <label styleName="form-item" >
                        <Field name="username" onChange={ this.handleUserName } type="text" component='input' placeholder="请输入手机号码用于找回密码"/>
                    </label>
                    <label styleName="form-item" >
                        <Field onChange={ this.handlePassword } name="password" type="password" component="input" placeholder="请输入短信中的验证码"/>
                        <ValidateCode 
                                prefix="login"
                                disabled = { pristine || loading || !validPhone ||!validPhoneFlag } 
                                onHandleSubmit={ handleSubmit( this.handleOnValidateCode.bind(this) ) } 
                        />
                    </label>
                    <ForgotPasswordSubmit
                            handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                            disabled={ loading || !validPhone || !submitFlag } 
                    />
                </form>
            </div> 
        )
    }


}






export default reduxForm({
  form: 'forgotPasswordFrom',                 //你的redux-form的特殊标记，必填项
})(ForgotPasswordFrom)   



