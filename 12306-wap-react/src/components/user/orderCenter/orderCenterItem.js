import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './orderCenter.scss';
import icon from '../../../styles/sprite.css';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class OrderCenterItem extends Component{

    constructor(props){
        super(props);
    }

    getTrainOrder(){
        const { orderStatus ,totalPrice ,trainItems ,orderStatusText } = this.props;
        const iconClass=classnames({
            'cicon': true,
            'icon-train_gray': orderStatus === '2' || orderStatus === '10',
            'icon-train':  orderStatus !== '2' && orderStatus !== '10'
        });
        const priceClass=classnames({
            'price-right':true,
            'money': orderStatus !== '12' && orderStatus !== '2'
        });
        return(
            <div>
                <div styleName="item-title">
                    <span styleName="price-type">
                        <i styleName={iconClass}></i>
                        &nbsp;
                        <span>{trainItems[0].deptStationName}</span>
                        -
                        <span>{trainItems[0].arrStationName}</span>
                    </span>
                    <span styleName={priceClass}>&yen;{totalPrice}</span>
                </div>
                <div>
                    <div styleName="item-row">
                        <div styleName="item-col">{trainItems[0].route}&nbsp;{trainItems[0].seatName}</div>
                        <div styleName="item-col right">{orderStatusText}</div>
                    </div>
                    <div styleName="item-row">
                        <div styleName="item-col">{trainItems[0].deptTime}</div>
                        <div styleName="item-col"></div>
                    </div>
                </div>
            </div>
        );
    }


    getBusOrder(){
    }


    getOrder(){
        const{ orderType } = this.props;
        let item;
        switch(orderType){
            case '1':
                item = this.getTrainOrder();
                break;
            case '3':
                item = this.getBusOrder();
                break;
            default:
                break;
        }
        return item;
    }


    render(){
        console.log(this.props);
        const { orderStatus, orderType } = this.props;
        const itemClass=classnames({
            'order-item': true,
            'orderStatus-gray': orderStatus === '12' || orderStatus === '2' || (orderStatus === '10' && orderType === '1' )
        });
        return(
            <div styleName={itemClass} >
                {this.getOrder()}
            </div>
        );
    }


}






export default OrderCenterItem


