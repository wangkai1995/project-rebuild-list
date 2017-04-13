import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './account.scss';


import { actions } from './accountRedux';

import Header from '../../../layouts/header/header'


@CSSModules(styles,{allowMultiple: true})
class UserAccount extends Component {

    render(){
        const { account, accountAction } = this.props;
        return(
            <div styleName='container'>
                <Header title="我的账户" />  
            </div>
        );
    }
}




export default connect( state =>{
    return{
        account : state.user.account.account,
    };
},dispatch =>{
    return{
        accountAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserAccount);



