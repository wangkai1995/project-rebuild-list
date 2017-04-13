import React,{ Component } from 'react';
import classnames from 'classnames';
import { Md5 } from 'ts-md5/dist/md5';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './register.scss';


import userModel from '../../../http/user/index';
import ModalDialog from '../../../components/modal/Dialog';

import ModalAlert from '../../../components/modal/Alert';

import RegisterFrom from './registerForm';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class RegisterContainer extends Component{

    constructor(props){
        super(props);
        this.validatePhone = this.validatePhone.bind(this);
        this.getValidateCode = this.getValidateCode.bind(this);
        this.checkAgreement = this.checkAgreement.bind(this);
        this.register = this.register.bind(this);
    }

    //更新的时候判断是否注册成功
    componentWillReceiveProps(nextProps){
        const { registerFlag ,push } = nextProps;
        if(registerFlag){
            ModalAlert.show({
                content:'注册成功',
                onClick:function(){
                    ModalAlert.hide();
                    push('/user/login');
                }
            });
        }
    }

    //选择协议
    checkAgreement(checked){
        const {action}  =this.props;
        action.checkAgreement(checked);
    }

    //获取验证码
    getValidateCode(phone){
        const { action } = this.props;
        action.requestVlidateCode(userModel.verifyCode,{
            mode: 'register',
            mobile: phone,
        });
    }

    //验证手机
    validatePhone(phone){
        const { action } = this.props;
        action.requestVlidatePhone(userModel.mobileValid,{
            mobile: phone,
        });
    }

    //请求注册
    register(data){
        const { action } = this.props;
        const mobile = data.username;
        const password = Md5.hashStr(data.password);
        const confirmPassword = Md5.hashStr(data.validPassword);
        const verifyCode = data.validCode;
        action.requestRegister(userModel.register,{
            mobile: mobile,
            password: password,
            confirmPassword: confirmPassword,
            verifyCode: verifyCode,
        });
    }


    render(){
       const { loading ,validPhone ,isVisible ,agreement ,error ,action } = this.props;
        return(
            <div styleName='container'>
                <RegisterFrom 
                    onRegister={this.register}
                    onCheckAgreement={this.checkAgreement}
                    onVlidatePhone={ this.validatePhone }
                    onGetValidateCode={ this.getValidateCode }
                    validPhone={validPhone}
                    loading={loading} 
                    agreement={agreement} 
                />
                <ModalDialog 
                        isVisible={isVisible} 
                        title="提示" 
                        content={error}  
                        buttonText="确定"
                        buttonClick={action.resetError}
                />
            </div>
        );
    }


}





export default RegisterContainer;


