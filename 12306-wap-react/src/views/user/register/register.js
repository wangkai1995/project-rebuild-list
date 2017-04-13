import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './register.scss';

import { actions } from './registerRedux';

import Header from '../../../layouts/header/header'
import RegisterContainer from '../../../components/user/register/registerContainer'


@CSSModules(styles,{allowMultiple: true})
class UserRegister extends Component{

    render(){
        const { register, registerAction ,push } = this.props;
        return(
            <div styleName='register-container'>
                <Header prefix="login" title="注册" />
                <RegisterContainer {...register} action={registerAction} push={push} />
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


