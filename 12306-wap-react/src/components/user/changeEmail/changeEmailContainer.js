import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changeEmail.scss';

import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangeEmailContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
        	email : this.props.email,
        }
        this.handleInputEmail = this.handleInputEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputEmail(e){
		var value = e.target.value;
		this.setState({
			email: value,
		})
    }


    handleSubmit(){
    	const { email } = this.state;
    	var emailReg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    	if(!emailReg.test(email)){
    		ModalAlert.show({
                content: '邮箱格式不符合规范',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
            return false;
    	}
    	var token = TokenServer.getToken();
    	var params = {
    		email : email,
    	}
        userModel.updateUserInfo({
        	token: token.access_token,
            formData:params
        }).then(function(result){
			if(result.code === '00000'){
				ModalAlert.show({
	                content: '修改邮箱成功!',
	                onClick:function(){
	                    ModalAlert.hide();
	                    window.history.back();
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
        });
    }


    render(){
    	const { email } = this.state;
        return(
            <div styleName='container'>
                <div styleName="list">
                	<label styleName="item">
                		<input type="text" onChange={this.handleInputEmail} value={email} placeholder="请输入邮箱"/>
                	</label>
                </div>
                <div styleName="btn-Submit">
                	<button onClick={this.handleSubmit} styleName="button">保存</button>
                </div>
            </div>
        );
    }
}







export default ChangeEmailContainer;





