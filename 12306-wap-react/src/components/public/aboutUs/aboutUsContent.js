import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './aboutUs.scss';
import _ from 'lodash';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class AboutUsContent extends Component{

    render(){
        return(
            <div styleName="about-list">
                <Link  to="/pubilc/company"  styleName="about-item">
                    <span>公司简介</span>
                    <i styleName="cicon icon-right-icon"></i>
                </Link>
                <Link styleName="about-item">
                    <span>法律声明</span>
                    <i styleName="cicon icon-right-icon"></i>
                </Link>
                <Link styleName="about-item">
                    <span>协议条款</span>
                    <i styleName="cicon icon-right-icon"></i>
                </Link>
                <Link styleName="about-item">
                    <span>联系电话:400-629-4999</span>
                    <i styleName="cicon icon-right-icon"></i>
                </Link>
            </div>
        )
    }
}



export default  AboutUsContent;

