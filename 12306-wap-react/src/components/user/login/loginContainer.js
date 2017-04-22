import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import { Md5 } from 'ts-md5/dist/md5';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';


import userModel from '../../../http/user/index';
import TokenServer from '../../../server/token/index';
import ModalDialog from '../../../components/modal/Dialog';


import LoginTab from './loginTab';
import LoginFrom from './loginFrom';
import LoginPhoneFrom from './loginPhoneFrom';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserLoginContainer extends Component{

    constructor(props){
        super(props);
        this.requestLogin = this.requestLogin.bind(this);
        this.changeLoginType = this.changeLoginType.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.getValidateCode = this.getValidateCode.bind(this);
        this.requestPhoneLogin = this.requestPhoneLogin.bind(this);
    }

    //更新的时候判断是否登录成功并且附带信息
    componentWillReceiveProps(nextProps){
        const { loginInfo ,error } = nextProps;
        if(loginInfo){
            TokenServer.setToken(loginInfo,function(){
                window.history.back();
            });
        }
    }
    
    //根据登陆模式获取对应表单
    getLoginFrom(){
        const { loginType ,loading ,validPhone } = this.props;
        switch(loginType){
            case 1:
                return <LoginFrom 
                            validPhone={validPhone}
                            onVlidatePhone={ this.validatePhone } 
                            onLogin={ this.requestLogin } 
                            loading={loading} />;
            case 2:
                return <LoginPhoneFrom
                            onGetValidateCode={ this.getValidateCode }
                            onVlidatePhone={ this.validatePhone } 
                            validPhone={validPhone}
                            onLogin={ this.requestPhoneLogin } 
                            loading={loading}  
                        />;
            default :
                return null;
        }
    }

    //切换登陆模式
    changeLoginType(type){
        const { action } = this.props;
        action.changeLoginType(type);
    }

    //获取验证码
    getValidateCode(phone){
        const { action } = this.props;
        action.requestVlidateCode(userModel.verifyCode,{
            mode: 'dynamic-password',
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

    //请求登陆
    requestLogin(data){
        const { action } =this.props;
        let username = data.username;
        let password = Md5.hashStr(data.password);
        action.requestLogin(userModel.login,{
            username: username,
            password: password,
        });
    }

    //动态密码登录
    requestPhoneLogin(data){
       const { action } =this.props;
        let username = data.username;
        let password = data.password;
        action.requestLogin(userModel.login,{
            username: username,
            password: password,
        }); 
    }


    render(){
        const { loginType ,isVisible ,error ,action } =this.props;
        return(
            <div styleName="login-container">
                <LoginTab onTypeChange={this.changeLoginType} loginType={loginType} />
                {this.getLoginFrom()}
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





export default UserLoginContainer;



