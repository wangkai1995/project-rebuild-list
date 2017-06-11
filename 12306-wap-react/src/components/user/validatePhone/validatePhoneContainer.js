import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './validatePhone.scss';

import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';

import ValidateCode from '../../lib/validateCode/index';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ValidatePhoneContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
        	code: '',
        }
        this.handleSubmitVerifyCode = this.handleSubmitVerifyCode.bind(this);
        this.handleInputCode = this.handleInputCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


	
    handleSubmitVerifyCode(){
		const { phone } = this.props;
		userModel.verifyCode({
			mode: 'modify-mobile',
            mobile: phone,
		}).then(function(result){
			if(result.code !== '00000'){
				ModalAlert.show({
                    content: result.message,
                    onClick:function(){
                        ModalAlert.hide();
                    }
                });
			}
		})
    }


	handleInputCode(e){
		var value = e.target.value;
		this.setState({
			code:value,
		});
	}


    handleSubmit(){
		const { phone ,push } = this.props;
		const { code } = this.state;
		var token = TokenServer.getToken();
		var params = {
			verifycode:code,
			mobile: phone,
		}
		userModel.verifyPhone({
			token: token.access_token,
			formData:params,
		}).then(function(result){
			if(result.code === '00000'){
				ModalAlert.show({
                    content: '修改手机号码成功,请重新登录',
                    onClick:function(){
                        ModalAlert.hide();
                        TokenServer.removeToken();
                        push('/user/login');
                    }
                });
			}else{
				ModalAlert.show({
                    content: result.message,
                    onClick:function(){
                        ModalAlert.hide();
                    }
                });
			}
		})
    }


    render(){
    	const { showPhone } = this.props;
    	const { code } = this.state;
    	const submitClass = classnames({
    		'button':true,
    		'disabled' :(!code || code.length > 6),
    	});
        return(
            <div styleName='container'>
            	<div styleName="list">
                	<label styleName="item title">
                		将验证信息发送至{showPhone}
                	</label>
                    <label styleName="item">
                       <input type="text" onChange={this.handleInputCode}  value={code} placeholder="请输入短信中的六位验证码"/>
                       <span styleName="verifyCode">
                       		<ValidateCode 
                                prefix="login"
                                onHandleSubmit={this.handleSubmitVerifyCode}
                        	/>
                       </span>
                    </label>
                </div>
                <div styleName="btn-Submit">
                	<button onClick={this.handleSubmit} styleName={submitClass}>完成</button>
                </div>
            </div>
        );
    }
}







export default ValidatePhoneContainer;




