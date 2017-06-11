import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './changePhone.scss';


import Header from '../../../layouts/header/header';
import ChangePhoneContainer from '../../../components/user/changePhone/changePhoneContainer';


@CSSModules(styles,{allowMultiple: true})
class UserChangePhone extends Component {

    render(){
        const { push } = this.props;
        return(
            <div styleName='container'>
                <Header title="修改绑定手机" /> 
                <ChangePhoneContainer push={push} />
            </div>
        );
    }
}





export default connect( state =>{
    return{
    };
},dispatch =>{
    return{
        push : bindActionCreators(push , dispatch),
    }
})(UserChangePhone);




