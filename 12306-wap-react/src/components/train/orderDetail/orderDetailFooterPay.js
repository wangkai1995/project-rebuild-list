import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './orderDetail.scss';
import icon from '../../../styles/sprite.css';


import OrderDetailModal from './orderDetailModal';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class OrderDetailFooterPay extends Component{
    
    constructor(props){
        super(props);
        this.state={
            isModal: false,
            totalfee: 0,
            insurancePrice: 0,
            adultPrice: 0,
            childrenPrice : 0,
            adultLen: 0,
            childrenLen: 0,
        }
        this.handleClickDetail = this.handleClickDetail.bind(this);
    }

    //处理展示数据
    componentWillReceiveProps(nextProps){
        const { orderDetail } = nextProps;
        let totalfee = 0;
        let insurancePrice = 0;
        let adult = [];
        let adultPrice = 0;
        let childrenPrice = 0;
        let children = [];
        if(orderDetail){
           totalfee =  orderDetail.total; 

           if(orderDetail.passengerInfo){
                orderDetail.passengerInfo.forEach(function(item){
                    if(item.ticketType === '2'){
                        children.push(item);
                        childrenPrice = item.seatPrice;
                        return false;
                    };
                    adult.push(item);
                    adultPrice = item.seatPrice;
                    return false;
                })
           }
           insurancePrice = orderDetail.insuranceInfo.length>0? orderDetail.insuranceInfo[0].insurancePrice : 0;
        }
        this.setState({
            totalfee: totalfee,
            adultPrice: adultPrice,
            childrenPrice: childrenPrice,
            insurancePrice: insurancePrice,
            adultLen: adult.length,
            childrenLen: children.length,
        });
    }


    handleClickDetail(flag){
        this.setState({
            isModal:flag,
        });
    }

    
    
    
    render(){
        const { orderDetail ,onPaySubmit } = this.props;
        const { totalfee  ,isModal ,insurancePrice ,adultPrice ,childrenPrice ,adultLen ,childrenLen } = this.state;
        const iconClass = classnames({
            'cicon':true,
            'icon-up-icon':!isModal,
            'icon-down-icon':isModal,
        });
        if(!orderDetail || (orderDetail.status !== 3 && orderDetail.status !== 11) ){
            return null;
        }
        return (
            <div styleName="pay-footer"> 
                <span styleName="footer-price">
                    &yen;&nbsp;&nbsp;
                    <span styleName="pirce">{totalfee}</span>
                </span>
                <input type="submit" styleName="footer-submit" value="提交订单" onClick={ onPaySubmit } /> 
                <span styleName="footer-detail" onClick={ this.handleClickDetail.bind(this,!isModal) }>
                    明细&nbsp;
                    <i styleName={iconClass}></i>
                </span>
               <OrderDetailModal 
                    adultPrice={adultPrice}
                    childrenPrice={childrenPrice}
                    insurancePrice={insurancePrice}
                    adultLen={adultLen}
                    childrenLen={childrenLen}
                    isModal={isModal}
                    orderType={orderDetail.orderType}
                    totalInfo={orderDetail.totalInfo}
                />
            </div>
        );
    }


}





       

export default OrderDetailFooterPay;

