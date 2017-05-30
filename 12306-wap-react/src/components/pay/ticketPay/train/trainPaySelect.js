import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import pubilcStyles from '../ticketPay.scss';
import styles from './trainPay.scss';
import icon from '../../../../styles/sprite.css';

import WechatPayServer from '../../../../server/pay/weChat/index';


@immutableRenderDecorator
@CSSModules(_.merge({},pubilcStyles,styles,icon),{allowMultiple: true})
class TrainPaySelect extends Component{
    
    constructor(props){
        super(props);
    }


    handleSelectMethod(type){
        const { onMethodSelect } = this.props;
        onMethodSelect(type);
    }
	

    render(){
        const { defaultType } = this.props;
        const AliPayClass=classnames({
            'pay-model': true,
            'hidden': WechatPayServer.isWechatBrowser,
        })
        const WeChatChecked =classnames({
            'cicon':true,
            'icon-order-choice_s': defaultType === 0,
            'icon-order-choice-n': defaultType !== 0
        })
        const AliPayChecked =classnames({
            'cicon':true,
            'icon-order-choice_s': defaultType === 1,
            'icon-order-choice-n': defaultType !== 1
        })
        return(
            <div styleName="payment-method-container">
                    <div styleName="pay-model">
                        <i styleName="cicon icon-order-weixin"></i>
                        <span>微信支付</span>
                        <i sytyleName="recommend cicon icon-icon-recommend"></i>
                        <div styleName="checkbox-select" onClick={this.handleSelectMethod.bind(this,0)}>
                            <i styleName={WeChatChecked}></i>
                        </div>
                    </div>
                    <div styleName={AliPayClass}>
                        <i styleName="cicon icon-order-zhifubao"></i>
                        <span>支付宝支付</span>
                        <div styleName="checkbox-select" onClick={this.handleSelectMethod.bind(this,1)}>
                            <i styleName={AliPayChecked}></i>
                        </div>
                    </div>
            </div>
        )
    }
}






export default TrainPaySelect;



