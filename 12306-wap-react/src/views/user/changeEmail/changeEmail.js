import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './changeEmail.scss';


import Header from '../../../layouts/header/header';

import ChangeEmailContainer from '../../../components/user/changeEmail/changeEmailContainer';



@CSSModules(styles,{allowMultiple: true})
class UserChangeEmail extends Component {

    render(){
        const { params } = this.props;
        const email = params.email !== '0'? params.email : '';
        return(
            <div styleName='container'>
                <Header title="修改邮箱" /> 
              	<ChangeEmailContainer email={email} />
            </div>
        );
    }
}




export default UserChangeEmail;




