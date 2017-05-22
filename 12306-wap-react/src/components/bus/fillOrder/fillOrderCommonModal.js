import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './fillOrder.scss';


import Popup from '../../modal/Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class BusfillOrderCommonModal extends Component {
    
    constructor(props){
        super(props);
    }

    
    

    render(){
        const { isModal ,childrenLen ,adultLen ,ticketPrice ,insurancePrice  } = this.props;
        if(!isModal){
            return null;
        }
        return(
            <Popup prefix="fillOrder">
                <ul styleName="footer-popup-detail">
                    <li styleName="popup-item">
                        <div styleName="item-col-left">成人票</div>
                        <div styleName="item-col-Middle">¥{ticketPrice}</div>
                         <div styleName="item-col-right">x{adultLen}人</div>
                    </li>
                    <li styleName="popup-item separated">
                        <div styleName="item-col-left">儿童票</div>
                        <div styleName="item-col-Middle">¥{ticketPrice}</div>
                        <div styleName="item-col-right">x{childrenLen}人</div>
                    </li>
                    <li styleName="popup-item">
                        <div styleName="item-col-left">保险</div>
                        <div styleName="item-col-Middle">¥{insurancePrice}</div>
                        <div styleName="item-col-right">x{childrenLen+adultLen}人</div>
                    </li>
                </ul>
            </Popup>
        );
    }
    
}




export default  BusfillOrderCommonModal;


