import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './addChilder.scss';


import Header from '../../../layouts/header/header'
import AddChilderContainer from '../../../components/user/addChilder/addChilderContainer';


@CSSModules(styles,{allowMultiple: true})
class UserAddChilder extends Component{

    render(){
        return(
            <div styleName='container'>
                <Header title="填写儿童信息" />
				<AddChilderContainer />
            </div>
        );
    }
}


export default UserAddChilder;


