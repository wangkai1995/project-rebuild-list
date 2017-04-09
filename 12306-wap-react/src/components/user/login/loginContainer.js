import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import { Md5 } from 'ts-md5/dist/md5';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './login.scss';


import userModel from '../../../http/user/index';
import TokenServer from '../../../server/token/index';


import LoginTab from './loginTab';
import LoginFrom from './loginFrom';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserLoginContainer extends Component{

    constructor(props){
        super(props);
        this.requestLogin = this.requestLogin.bind(this);
    }

    
    //更新的时候判断是否登录成功并且附带信息
    componentWillReceiveProps(nextProps){
        const { loginInfo } = nextProps;
        if(loginInfo){
            TokenServer.setToken(loginInfo,function(){
                window.history.back();
            });
        }
    }
    

    getLoginFrom(){
        const { loginType ,loading } = this.props;
        switch(loginType){
            case 1:
                return <LoginFrom onLogin={ this.requestLogin } loading={loading} />;
            case 2:
                return ;
            default :
                return null;
        }
    }


    requestLogin(data){
        const { action } =this.props;
        let username = data.username;
        let password = Md5.hashStr(data.password);
        action.requestLogin(userModel.login,{
            username: username,
            password: password,
        });
    }

    
    render(){
        const { loginType } =this.props;
        return(
            <div styleName="login-container">
                <LoginTab loginType={loginType} />
                {this.getLoginFrom()}
            </div>
        );
    }
    

}




export default UserLoginContainer;


