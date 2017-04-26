import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './index.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class UserContent extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
        return(
           <div styleName="personal-content">
                <div styleName="content-list">
                    <Link styleName="content-item">
                        <i styleName="cicon  icon-user-order-ico "></i>
                        <span>我的订单</span>
                        <i styleName="cicon icon-user-arrow-ico"></i>
                    </Link>

                    <Link to="/user/passenger/user" styleName="content-item item-separate">
                        <i styleName="cicon  icon-user-information-ico "></i>
                        <span>常用信息</span>
                        <i styleName="cicon icon-user-arrow-ico"></i>
                    </Link>

                    <Link to="/public/faq" styleName="content-item">
                        <i styleName="cicon  icon-user-help-ico "></i>
                        <span>帮助中心</span>
                        <i styleName="cicon icon-user-arrow-ico"></i>
                    </Link>

                    <Link to="/public/feedback" styleName="content-item">
                        <i styleName="cicon  icon-user-advice-ico "></i>
                        <span>投诉与建议</span>
                        <i styleName="cicon icon-user-arrow-ico"></i>
                    </Link>

                    <Link to="/public/aboutUs" styleName="content-item">
                        <i styleName="cicon  icon-user-about-ico "></i>
                        <span>关于我们</span>
                        <i styleName="cicon icon-user-arrow-ico"></i>
                    </Link>
                </div>
                <div styleName="personal-center-ad">
                </div>
           </div>
        );
    }
}






export default UserContent;


