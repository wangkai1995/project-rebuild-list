import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
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

    }


    render(){
        const { oldPassword ,newPassword ,confirmPassword } = this.state;
        return(
            <div styleName='container'>
                <div styleName="list">
                	<label styleName="item">
                		<input type="text" onChange={this.handleInputOldPassword} value={oldPassword} placeholder="请输入原密码"/>
                	</label>
                    <label styleName="item">
                        <input type="text" onChange={handleInputNewPassword} value={newPassword} placeholder="请输入新密码"/>
                    </label>
                    <label styleName="item">
                        <input type="text" onChange={this.handleInputConfimPassword} value={confirmPassword} placeholder="请确认新密码"/>
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



