import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import { Md5 } from 'ts-md5/dist/md5';
import CSSModules from 'react-css-modules'
import styles from './changePhone.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePhoneContainer extends Component{

    constructor(props){
        super(props);
        this.state={
        	loading: false,
        	password: '',
        	newPhone: '',
        };
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleInputNewPhone = this.handleInputNewPhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputPassword(e){
    	var value = e.target.value;
    	this.setState({
    		password: value,
    	})
    }

    handleInputNewPhone(e){
    	var value = e.target.value;
    	this.setState({
			newPhone: value,
    	})
    }


    handleSubmit(){
    	const self = this;
		const { newPhone } = this.state;
		const { push } = this.props;
		const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
		if(!phoneReg.test(newPhone)){
			return false;
		}
		this.setState({
			loading: true,
		})

		userModel.mobileValid({
			mobile:newPhone
		}).then(function(data){
			if(data.code === '00000'){
				if(data.data === 1){
					ModalAlert.show({
		                content: '该手机号码已经被注册',
		                onClick:function(){
		                    ModalAlert.hide();
		                    self.setState({
								loading: false,
							})
		                }
		            });
				}else{
					self.handleValidateUser();
				}
			}else{
				ModalAlert.show({
	                content: data.message,
	                onClick:function(){
	                    ModalAlert.hide();
	                    self.setState({
							loading: false,
						})
	                }
	            });
			}
		});
    }

	
    handleValidateUser(){
		const self = this;
		const { password ,newPhone } = this.state;
		const { push } = this.props;
		let username = TokenServer.getToken().name;
        let userPassword = Md5.hashStr(password);
        userModel.login({
        	username: username,
            password: userPassword,
        }).then(function(result){
        	if(result.access_token){
                push('/user/validatePhone/'+newPhone);
        	}
        },function(err){
        	ModalAlert.show({
                content: '验证失败,该用户不存在',
                onClick:function(){
                    ModalAlert.hide();
                    self.setState({
						loading: false,
					})
                }
            });
        });
    }


    render(){
    	const { password, newPhone ,loading } = this.state;
    	const submitClass = classnames({
    		'button':true,
    		'disabled' :(!password || !newPhone),
    	})
        return(
            <div styleName='container'>
            	<div styleName="list">
                	<label styleName="item">
                		<input type="password" onChange={this.handleInputPassword} value={password}  placeholder="登录密码"/>
                	</label>
                    <label styleName="item">
                        <input type="text" onChange={this.handleInputNewPhone} value={newPhone}  placeholder="新手机号"/>
                    </label>
                </div>
                <div styleName="btn-Submit">
                	<button onClick={this.handleSubmit} styleName={submitClass}>下一步,验证新手机</button>
                </div>
            </div>
        );
    }

}







export default ChangePhoneContainer;





