import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import { Md5 } from 'ts-md5/dist/md5';
import CSSModules from 'react-css-modules'
import styles from './changePassword.scss';

import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePasswordContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
        	oldPassword : '',
            newPassword : '',
            confirmPassword: '',
        }
        this.handleInputOldPassword = this.handleInputOldPassword.bind(this);
        this.handleInputNewPassword = this.handleInputNewPassword.bind(this);
        this.handleInputConfimPassword = this.handleInputConfimPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputOldPassword(e){
		var value = e.target.value;
		this.setState({
			oldPassword: value,
		})
    }

    handleInputNewPassword(e){
        var value = e.target.value;
        this.setState({
            newPassword: value,
        })
    }

    handleInputConfimPassword(e){
        var value = e.target.value;
        this.setState({
            confirmPassword: value,
        })
    }


    handleSubmit(){
        const { oldPassword ,newPassword ,confirmPassword } = this.state;
        const { push } = this.props;
        if(!oldPassword || !newPassword || !confirmPassword){
            return false;
        }
        if(newPassword !== confirmPassword){
            ModalAlert.show({
                content: '新密码两次输入不一致',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
            return false;
        }
        let formData = {};
        var token = TokenServer.getToken();
        formData.oldPassword = Md5.hashStr(oldPassword);
        formData.newPassword = Md5.hashStr(confirmPassword);
        
        userModel.userPasswordChange({
            token: token.access_token,
            formData:formData
        }).then(function(result){
            if(result.code === '00000'){
                ModalAlert.show({
                    content: '密码修改成功,请重新登录',
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
        const { oldPassword ,newPassword ,confirmPassword } = this.state;
        return(
            <div styleName='container'>
                <div styleName="list">
                	<label styleName="item">
                		<input type="password" onChange={this.handleInputOldPassword} value={oldPassword} placeholder="请输入原密码"/>
                	</label>
                    <label styleName="item">
                        <input type="password" onChange={this.handleInputNewPassword} value={newPassword} placeholder="请输入新密码"/>
                    </label>
                    <label styleName="item">
                        <input type="password" onChange={this.handleInputConfimPassword} value={confirmPassword} placeholder="请确认新密码"/>
                    </label>
                </div>
                <div styleName="btn-Submit">
                	<button onClick={this.handleSubmit} styleName="button">保存</button>
                </div>
            </div>
        );
    }
}





export default ChangePasswordContainer;



