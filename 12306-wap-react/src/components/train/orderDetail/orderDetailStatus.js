import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './orderDetail.scss';
import icon from '../../../styles/sprite.css';


import CountDown from '../../lib/countDown/index';
import OrderDetailProgress from './orderDetailProgress';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class OrderDetailStatus extends Component{
    
    constructor(props){
        super(props);
        this.handleCountDownOver = this.handleCountDownOver.bind(this);
    }
    

    handleCountDownOver(){
        const { onCountDownOver } = this.props;
        //延时500毫秒
        setTimeout(function(){
            onCountDownOver(); 
        },500);
    }


    getOrderCountTimePay(){
        const { orderDetail } = this.props; 
        return (
            <div styleName="pay-countTime">
                <i styleName="cicon icon-order_smile"></i>
                &nbsp;座位已成功锁定!,请在
                <CountDown onOver={this.handleCountDownOver} time={orderDetail.overplusTime}/>
                秒内完成支付.
            </div>
        )
    }

    getRobOrderCountTimePay(){
        const { orderDetail } = this.props; 
        return (
            <div styleName="pay-countTime">
                <i styleName="cicon icon-order_smile"></i>
                &nbsp;抢票订单尚未支付,请在
                <CountDown onOver={this.handleCountDownOver} time={orderDetail.overplusTime}/>
                秒内完成支付.
            </div>
        )
    }


    getOrderProgress(){
        const { onQuery , onTimeout } = this.props;
        return <OrderDetailProgress onTimeout={onTimeout} onQuery={onQuery} />
    }


    getOrderStatus(){
        const { orderDetail } = this.props;
        let statusElement;
        switch(orderDetail.status){
            //待支付
            case 3 :
                statusElement = (
                    <div styleName="train-status-await-pay">
                        <h4>待支付</h4>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            case 11:
                statusElement = (
                    <div styleName="train-status-await-pay">
                        <h4>待支付</h4>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //已取消
            case 10:
                statusElement =  (
                    <div styleName="train-status-cancel">
                        <div styleName="title">
                            已取消
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //占座失败
            case 2:
                statusElement = (
                    <div styleName="train-status-failed">
                        <div styleName="title">
                            占座失败
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p styleName="gray">系统占座失败，订单已取消</p>
                        <p styleName="reason">失败原因:&nbsp;{orderDetail.reason}</p>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //等待出票
            case 4:
                statusElement = (
                    <div styleName="train-status-await">
                        <div styleName="title">
                            正在出票
                            <span >
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>正在为您出票,请稍后</p>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //出票成功
            case 6:
                statusElement = (
                    <div styleName="train-status-success" >
                        <div styleName="title">
                            购票成功
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>请凭购票时有效证件到火车站或代售点取票</p>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //出票失败
            case 5:
                statusElement = (
                    <div styleName="train-status-failed">
                        <div styleName="title">
                            出票失败
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p styleName="gray">购票金额在1-7个工作日内退回</p>
                        <p styleName="reason">失败原因:&nbsp;{orderDetail.reason}</p>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //退票中
            case 7:
                statusElement = (
                    <div styleName="train-status-await">
                        <div styleName="title">
                            退票中
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                        <div styleName="return-record">
                            <a>查看退改记录</a>
                        </div>
                    </div>
                );
                break;
            //已退票
            case 8:
                statusElement = (
                    <div styleName="train-status-await">
                        <div styleName="title">
                            已退票
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                         <div styleName="return-record">
                            <a>查看退改记录</a>
                        </div>
                    </div>
                );
                break;
            //部分退票
            case 9:
                statusElement = (
                    <div styleName="train-status-await">
                        <div styleName="title">
                            部分退票
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                         <div styleName="return-record">
                            <a>查看退改记录</a>
                        </div>
                    </div>
                );
                break;
            //抢票已取消
            case 21:
                statusElement = (
                    <div styleName="train-status-cancel">
                        <div styleName="title">
                            {orderDetail.statusText}
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //抢票中,等待出票
            case 14:
                statusElement = (
                    <div styleName="train-status-await" >
                        <div styleName="title">
                            抢票中,等待出票
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>正在为您抢票,抢到会第一时间短信通知您</p>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            //抢票取消中 正在取消
            case 30:
                statusElement = (
                    <div styleName="train-status-await" >
                        <div styleName="title">
                            {orderDetail.statusText}
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            case 20:
                statusElement = (
                    <div styleName="train-status-await" >
                        <div styleName="title">
                            {orderDetail.statusText}
                            <span>
                                总额明细&nbsp;&nbsp;
                                <span styleName="color-money">
                                    &yen;
                                    <span styleName="price">{orderDetail.total}</span>
                                </span>
                            </span>
                        </div>
                        <p>订单号:&nbsp;{orderDetail.orderNo}</p>
                    </div>
                );
                break;
            default:
                statusElement =  null;
        }
        return(
            <div styleName="status-container">
                { statusElement }   
            </div>
        );
    }



    render(){
        const { orderDetail } = this.props;

        if(!orderDetail){
            return null;
        }else{
            return (
                <div>
                    { orderDetail.status === 3? this.getOrderCountTimePay() : null }
                    { orderDetail.status === 11? this.getRobOrderCountTimePay() : null }
                    { orderDetail.status !== 1? this.getOrderStatus() : this.getOrderProgress() }
                </div>
            );
        }   
    }


}






export default OrderDetailStatus;



