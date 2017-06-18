import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './login12306.scss';


import Header from '../../../layouts/header/header';

import Login12306Container from '../../../components/user/login12306/login12306Container';



@CSSModules(styles,{allowMultiple: true})
class UserLogin12306 extends Component {

    render(){
        return(
            <div styleName='container'>
                <Header title="登录12306账号" /> 
              	<Login12306Container/>
            </div>
        );
    }
}




export default UserLogin12306;


