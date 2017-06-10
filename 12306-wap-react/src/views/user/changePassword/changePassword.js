import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './changePassword.scss';


import Header from '../../../layouts/header/header';

import ChangePasswordContainer from '../../../components/user/changePassword/changePasswordContainer';



@CSSModules(styles,{allowMultiple: true})
class UserChangePassword extends Component {

    render(){
    	const { push } = this.props;
        return(
            <div styleName='container'>
                <Header title="修改密码" /> 
              	<ChangePasswordContainer push={push} />
            </div>
        );
    }
}





export default connect( state =>{
    return{};
},dispatch =>{
    return{
        push : bindActionCreators(push , dispatch),
    }
})(UserChangePassword);



