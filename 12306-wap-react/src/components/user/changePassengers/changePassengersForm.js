import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changePassengers.scss';



const loginValidate = values => {
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    
}



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePassengersForm extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const { handleSubmit ,error ,pristine } = this.props;    
        return(
            <form>
                <div styleName="input-list">
                    <label styleName="input-item">
                        <span styleName="input-label">姓名</span>
                        <Field type="text" component="input"  placeholder="请输入正确姓名和证件姓名保持一致" />
                    </label>
                    <label styleName="input-item">
                        <span styleName="input-label">手机号码</span>
                        <Field type="text" component="input"  placeholder="请输入正确手机号码" />
                    </label>
                    <label styleName="input-item">
                        <span styleName="input-label">证件号码</span>
                        <Field type="text" component="input"  placeholder="请输入正确身份证号码" />
                    </label>
                </div>
            </form>
        );
    }

}





export default reduxForm({
  form: 'changePassengersForm',                 //redux-form的特殊标记，必填项
})(ChangePassengersForm)   



