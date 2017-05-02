import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import CryptoJS from '../../../lib/des3';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import loadingIMG from '../../../images/loading.gif';

import Popup from '../../modal/Popup';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderBuy12306Modal extends Component {
    
    constructor(props){
        super(props);
        this.state={
            password:'',
            passwordShow:'',
            userName:'',
            login:false,
        }
        this.handlePasswordFocus = this.handlePasswordFocus.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
    }



    componentWillReceiveProps(nextProps){
        const { loading } = nextProps;
        const { login } = this.state;
        if(!loading && login){
            this.setState({
                login: false
            });
        }
    }


    getInputForm(){
        const { login ,password ,passwordShow , userName } = this.state;
        const { onCancel } = this.props;
        const loginBtnClass = classnames({
            'button': true,
            'active': (userName && password),
            'disabled': (!userName || !password),
        });

        if(!login){
            return (
                <div styleName="popup-12306-login">
                    <h3>登录12306.cn账户购票</h3>
                    <p>能增加购票成功率哦</p>
                    <i styleName="cicon icon-login_close popup-colse" onClick={onCancel} ></i>

                     <div styleName="login-12306-container">
                        <div styleName="login-12306-item">
                            <div styleName="input-label">
                                <i styleName="cicon icon-login_account"></i>
                            </div>
                            <div styleName="input-input">
                                <input   
                                        input="text" 
                                        placeholder="账号"
                                        value={userName} 
                                        onChange={this.handleUserNameChange}
                                />
                            </div>
                        </div>
                        <div styleName="login-12306-item">
                            <div styleName="input-label">
                                <i styleName="cicon icon-login_password"></i>
                            </div>
                            <div styleName="input-input">
                                <input 
                                        input="text" 
                                        placeholder="密码" 
                                        ref="password12306" 
                                        value={passwordShow}
                                        onChange={this.handlePasswordChange}
                                        onFocus={this.handlePasswordFocus}
                                        onBlur={this.handlePasswordBlur}
                                />
                            </div>
                        </div>
                        <button styleName={loginBtnClass}
                                onClick={this.handleLogin}
                            >   
                                登录
                        </button>
                        <button styleName="button submit"
                                onClick={this.handleBuy}
                            >
                                直接购买
                        </button>
                    </div>
                </div>
            )
        }else{
            return (
                <div styleName="popup-12306-login">
                    <h3>登录12306.cn账户购票</h3>
                    <p>能增加购票成功率哦</p>
                    <i styleName="cicon icon-login_close popup-colse" onClick={onCancel} ></i>
                     <div styleName="login-12306-loading">
                            <img src={loadingIMG} />
                            <p>登录中</p>
                    </div>
                </div>
            )
        }
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
            passwordShow: passwordShow,
        })
    }


    handleUserNameChange(el){
        var value = el.target.value;
        this.setState({
            userName:value,
        })
    }


    handlePasswordChange(el){
        var value = el.target.value;
        this.setState({
            password: value,
            passwordShow: value,
        })
    }


    handleLogin(){
        let key = 'Fyg-f5yZi7F4VJ9DvYzDGo575n_DDCx_yXjygPj_12306';
        let key2 = 'F1oD4Jx7';
        const { password,userName } = this.state;
        const { onBuySubmit } = this.props;

        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var user = CryptoJS.TripleDES.encrypt(userName, keyHex, {  
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
        };

        onBuySubmit(user);
        this.setState({
            login:true,
        });
    }


    handleBuy(){
        const { onBuySubmit ,onCancel } = this.props;
        onBuySubmit();
        onCancel();
    }


    render(){
        const { isBuyModal } = this.props;
        
        if(!isBuyModal){
            return null;
        }
        return(
            <Popup>
                {this.getInputForm()}
            </Popup>
        );
    }
    
}




export default  TrainfillOrderBuy12306Modal;


