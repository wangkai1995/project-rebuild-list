import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './forgotPassword.scss';

import { actions } from './forgotPasswordRedux';


import Header from '../../../layouts/header/header'
import ForgotPasswordContainer from '../../../components/user/forgotPassword/forgotPasswordContainer';


@CSSModules(styles,{allowMultiple: true})
class UserForgotPassword extends Component{

    render(){
        const { forgotPassword, forgotPasswordAction } = this.props;
        console.log(this.props);
        return(
            <div styleName='container'>
                <Header title="忘记密码" />
                <ForgotPasswordContainer {...forgotPassword} action={forgotPasswordAction} />
            </div>
        );
    }
}






export default connect( state =>{
    return{
        forgotPassword : state.user.forgotPassword.forgotPassword,
    };
},dispatch =>{
    return{
        forgotPasswordAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserForgotPassword);


