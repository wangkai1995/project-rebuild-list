import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './account.scss';
import icon from '../../../styles/sprite.css';






@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class AccountInfo extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const { mobile,email } = this.props.userInfo
        return(
            <div styleName="account-info">
                  <Link to="/user/changePhone" styleName="about-item border ">
                        <span styleName="fl">手机</span>
                        <span styleName="fr">
                            <i styleName="cicon icon-right-icon fr"></i>
                            {mobile}
                        </span>
                  </Link>
                  <Link to={`/user/changeEmail/${email?email:0}`} styleName="about-item">
                        <span styleName="fl">邮箱</span>
                        <span styleName="fr">
                            <i styleName="cicon icon-right-icon fr"></i>
                            {email}
                        </span>
                  </Link>
                  <Link to="/user/changePassword" styleName="about-item mt10">
                        <span styleName="fl">修改密码</span>
                        <span styleName="fr">
                            <i styleName="cicon icon-right-icon fr"></i>
                        </span>
                  </Link>
                  <Link to="/user/login12306" styleName="about-item mt10 mb20 login12306">
                        <span styleName="fl">
                            <i styleName="cicon icon-train-12306-icon"></i>
                            &nbsp;12306.cn账户登录
                        </span>
                        <span styleName="fr">
                            <i styleName="cicon icon-right-icon fr"></i>
                        </span>
                  </Link>
            </div>
        );
    }

}



export default AccountInfo;
