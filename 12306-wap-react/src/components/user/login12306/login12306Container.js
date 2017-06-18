import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import CryptoJS from '../../../lib/des3';
import CSSModules from 'react-css-modules'
import styles from './login12306.scss';
import icon from '../../../styles/sprite.css';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class Login12306Container extends Component{

    constructor(props){
        super(props);
        this.state={
        	account:'',
        	password:'',
        }
        this.handleAccountInput = this.handleAccountInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //获取焦点切换程密码模式
    handlePasswordFocus(){
        let passwordEl = this.refs.password12306;
        passwordEl.type='password';
    }


    //切换焦点切换到文本模式
    handlePasswordBlur(){
        const { password } = this.state;
        let passwordEl = this.refs.password12306;
        passwordEl.type='text';
        var passwordShow =  password.replace(/./g,'*');
        this.setState({
            password: passwordShow,
        })
    }

    handleAccountInput(e){
		let value = e.target.value;
		this.setState({
			account:value
		})
    }

    handlePasswordInput(e){
		let value = e.target.value;
		this.setState({
			password:value
		})
    }


    handleSubmit(){
		let key = 'Fyg-f5yZi7F4VJ9DvYzDGo575n_DDCx_yXjygPj_12306';
        let key2 = 'F1oD4Jx7';
        let token  = TokenServer.getToken();
        const { password,account } = this.state;
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var user = CryptoJS.TripleDES.encrypt(account, keyHex, {  
            iv:CryptoJS.enc.Utf8.parse(key2),    
            mode: CryptoJS.mode.CBC,    
            padding: CryptoJS.pad.Pkcs7});
        var passwords = CryptoJS.TripleDES.encrypt(password, keyHex, {  
            iv:CryptoJS.enc.Utf8.parse(key2),    
            mode: CryptoJS.mode.CBC,    
            padding: CryptoJS.pad.Pkcs7});
        var user = {
            trainUserName : encodeURIComponent( user.toString() ),
            trainUserPwd : encodeURIComponent( passwords.toString() ),
            access_token: token.access_token,
        };

     	userModel.login12306(user).then(function(result){
     		if(result.code === '00000'){
     			ModalAlert.show({
	                content: '登录12306账户成功!',
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
     	})
    }


    render(){
    	const { account , password } = this.state;
    	const buttonClass= classnames({
    		'button': true,
    		'button-disabled' : (!account || !password),
    	})
        return(
            <div styleName='container'>
            	<div styleName="input-12306-content">
            		<div styleName="input-item clear-fixed">
            			<div styleName="label">
            				<i styleName="cicon icon-login_account"></i>
            			</div>
            			<div styleName="input">
            				<input type="text" onChange={this.handleAccountInput} value={account} placeholder="12306.cn账号"/>
            			</div>
            		</div>
            		<div styleName="input-item clear-fixed">
            			<div styleName="label">
            				<i styleName="cicon icon-login_password"></i>
            			</div>
            			<div styleName="input">
            				<input 
            						type="text" 
            						onFocus={this.handlePasswordFocus}
                                    onBlur={this.handlePasswordBlur}
            						onChange={this.handlePasswordInput}  
            						value={password} 
            						ref="password12306" 
            						placeholder="12306.cn密码"
    						/>
            			</div>
            		</div>
            	</div>
            	<button onClick={this.handleSubmit} styleName={buttonClass}>登录</button>
            </div>
        );
    }
}






export default Login12306Container;


