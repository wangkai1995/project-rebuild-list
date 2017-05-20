import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './orderDetail.scss';


import Popup from '../../modal/Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderDetailModal extends Component {
    
    constructor(props){
        super(props);
    }


    getRobHandleFee(){
        const { orderType ,totalInfo ,childrenLen ,adultLen } = this.props;
        if(orderType !== 2 ){
            return null;
        }
        const robHandleFee = (totalInfo[3] && totalInfo[3].type === 4 )? totalInfo[3].price : 0;
        return (
            <li styleName="popup-item">
                <div styleName="item-col-left">抢票服务</div>
                <div styleName="item-col-Middle">¥{robHandleFee}</div>
                <div styleName="item-col-right">x{childrenLen+adultLen}人</div>
            </li>
        )
    }

    render(){
        const { isModal ,childrenLen ,adultLen ,adultPrice  ,childrenPrice ,insurancePrice ,orderType  } = this.props;
        if(!isModal){
            return null;
        }
        return(
            <Popup prefix="fillOrder">
                <ul styleName="footer-popup-detail">
                    <li styleName="popup-item">
                        <div styleName="item-col-left">成人票</div>
                        <div styleName="item-col-Middle">¥{adultPrice}</div>
                         <div styleName="item-col-right">x{adultLen}人</div>
                    </li>
                    <li styleName="popup-item separated">
                        <div styleName="item-col-left">儿童票</div>
                        <div styleName="item-col-Middle">¥{childrenPrice}</div>
                        <div styleName="item-col-right">x{childrenLen}人</div>
                    </li>
                    <li styleName="popup-item">
                        <div styleName="item-col-left">保险</div>
                        <div styleName="item-col-Middle">¥{insurancePrice}</div>
                        <div styleName="item-col-right">x{childrenLen+adultLen}人</div>
                    </li>
                    { this.getRobHandleFee() }
                </ul>
            </Popup>
        );
    }
    
}




export default  OrderDetailModal;


