import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './register.scss';


import userModel from '../../../http/user/index';
import ModalDialog from '../../../components/modal/Dialog';

import RegisterFrom from './registerForm';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class RegisterContainer extends Component{

    constructor(props){
        super(props);
        this.validatePhone = this.validatePhone.bind(this);
        this.getValidateCode = this.getValidateCode.bind(this);
    }

    //获取验证码
    getValidateCode(phone){
        const { action } = this.props;
        action.requestVlidateCode(userModel.verifyCode,{
            mode: '',
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


    render(){
       const { loading ,validPhone ,isVisible ,error ,action } = this.props;
        return(
            <div styleName='container'>
                <RegisterFrom 
                    validPhone={validPhone}
                    loading={loading}  
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


