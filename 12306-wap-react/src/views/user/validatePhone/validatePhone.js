import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './validatePhone.scss';


import Header from '../../../layouts/header/header';
import ValidatePhoneContainer from '../../../components/user/validatePhone/validatePhoneContainer';


@CSSModules(styles,{allowMultiple: true})
class UserVaildatePhone extends Component {

    render(){
        let { push ,params} = this.props;
        const phone = params.phone.replace(/^(\d{4})\d+(\d{4})$/,'$1****$2');
        console.log(phone)
        return(
            <div styleName='container'>
                <Header title="验证新手机" /> 
                <ValidatePhoneContainer push={push} showPhone={phone} phone={params.phone} />
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
})(UserVaildatePhone);




