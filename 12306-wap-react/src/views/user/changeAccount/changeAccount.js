import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import styles from './changeAccount.scss';


import { actions } from './changeAccountRedux';

import Header from '../../../layouts/header/header';

import ChangeAccountContainer from '../../../components/user/changeAccount/changeAccountContainer';


@CSSModules(styles,{allowMultiple: true})
class UserChangeAccount extends Component {

    render(){
        const { changeAccount, userInfo, changeAccountAction,push } = this.props;
        return(
            <div styleName='container'>
                <Header title="编辑个人资料" /> 
                <ChangeAccountContainer 
                        {...changeAccount} 
                        actions={changeAccountAction} 
                        push={push} 
                />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        changeAccount : state.user.changeAccount.changeAccount,
    };
},dispatch =>{
    return{
        changeAccountAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserChangeAccount);



