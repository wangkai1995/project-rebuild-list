import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './login.scss';


import { actions } from './loginRedux';

import Header from '../../../layouts/header/header'
import UserLongiContainer from '../../../components/user/login/loginContainer';



@CSSModules(styles,{allowMultiple: true})
class UserLogin extends Component{

    render(){
        const { login, loginAction } = this.props;
        return(
            <div styleName='login-container'>
                <Header prefix="login" title="登录" />
                <UserLongiContainer action={loginAction} {...login} />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        login : state.user.login.login,
    };
},dispatch =>{
    return{
        loginAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserLogin);


