import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';


import Popup from '../../modal/Popup';

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderCommonModal extends Component {
    
    constructor(props){
        super(props);
    }
    

    render(){
        const { isModal ,price ,childLen ,adultLen ,insurancePrice ,passengerLen } = this.props;
        if(!isModal){
            return null;
        }
        return(
            <Popup prefix="fillOrder">
                <ul styleName="footer-popup-detail">
                    <li styleName="popup-item">
                        <div styleName="item-col-left">成人票</div>
                        <div styleName="item-col-Middle">¥{price}</div>
                         <div styleName="item-col-right">x{adultLen}人</div>
                    </li>
                    <li styleName="popup-item separated">
                        <div styleName="item-col-left">儿童票</div>
                        <div styleName="item-col-Middle">¥{price}</div>
                        <div styleName="item-col-right">x{childLen}人</div>
                    </li>
                    <li styleName="popup-item">
                        <div styleName="item-col-left">保险</div>
                        <div styleName="item-col-Middle">¥{insurancePrice}</div>
                        <div styleName="item-col-right">x{passengerLen}人</div>
                    </li>
                </ul>
            </Popup>
        );
    }
    
}



export default  TrainfillOrderCommonModal;

