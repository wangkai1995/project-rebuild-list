import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusfillOrderPublicContactsMessage extends Component {
    
    constructor(props){
        super(props);
    }



    render(){
       
        return(
           <div styleName="contacts-message">
                <div styleName="contacts-list-container">
                    <div styleName="contacts-list">
                        <label styleName="left">取票人</label>
                        <input type="text" onBlur={this.handleBlure} onChange={this.handleNameInput} value={name} ng-pattern="/^[\u4e00-\u9fa5]{2,10}$/" placeholder="请输入取票人姓名" />   
                    </div>
                    <div styleName="contacts-list">
                        <label styleName="left">取票人电话</label>
                        <input type="text" onBlur={this.handleBlure} onChange={this.handleMobileInput} value={mobile} ng-pattern="/^0?(13|15|18|14|17)[0-9]{9}$/" placeholder="请输入正确的手机号码" />   
                    </div>
                    <div styleName="contacts-list">
                        <label styleName="left">身份证号码</label>
                        <input type="text" onBlur={this.handleBlure} onChange={this.handleNameInput} value={name} ng-pattern="/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i" placeholder="请输入正确的身份证号码" />   
                    </div>
                </div>
            </div>
        )
    }
    
}



export default BusfillOrderPublicContactsMessage;



