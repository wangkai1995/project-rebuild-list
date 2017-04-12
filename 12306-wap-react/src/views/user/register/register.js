import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './login.scss';

import { actions } from './registerRedux';

import Header from '../../../layouts/header/header'



@CSSModules(styles,{allowMultiple: true})
class UserRegister extends Component{

    render(){
        const { register, registerAction } = this.props;
        return(
            <div styleName='register-container'>
                <Header prefix="login" title="注册" />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        register : state.user.register.register,
    };
},dispatch =>{
    return{
        registerAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserRegister);


