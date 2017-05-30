import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import pubilcStyles from '../ticketPay.scss';
import styles from './trainPay.scss';
import icon from '../../../../styles/sprite.css';


import CountDown from '../../../lib/countDown/index';

@immutableRenderDecorator
@CSSModules(_.merge({},pubilcStyles,styles,icon),{allowMultiple: true})
class TrainPayInfo extends Component{
    
    constructor(props){
        super(props);
        this.state = {
        	isVisible: false,
        }
    }


    handleDetailShow(checked){
    	this.setState({
    		isVisible: checked,
    	})
    }
	
	//查看乘客
    getPassenger(){
    	const { payInfo } = this.props;
    	return payInfo.passengerInfo.map(function(item){
			return <span>{item.passengerName}&nbsp;</span>
		})
    }
	
	//查看普通订单详情
    getCommonDetail(){
    }
	
	//查看抢票订单详情
    getRobDetail(){
		const { payInfo } = this.props;
		return (
			<div>
				<div styleName="order-detail">
					<div styleName="left-detail-icon">
						<i styleName="cicon icon-train"></i>
					</div>
					<div styleName="right-detail-message">
						<p>
							{payInfo.deptStationName}&nbsp;-&nbsp;
							{payInfo.arrStationName}&nbsp;
							{payInfo.grabDeadLine}
						</p>
						<p styleName="mt10">
							已选车次:&nbsp;
							{payInfo.firstChoiceTrainCode}(首选),
							{payInfo.reserveTrainCode}
						</p>
						<p>
							已选坐席:&nbsp;
							{payInfo.firstChoiceSeat}(首选),
							{payInfo.reserveSeat}
						</p>
					</div>
				</div>
				<div styleName="passengers">
					乘客:&nbsp;
					{ this.getPassenger() }
				</div>
			</div>
		)
    }


    getDetailShow(){
		const { payInfo } = this.props;
		const { isVisible } = this.state;
		if(isVisible){
			if(payInfo.orderType === 2){
				return this.getRobDetail();
			}
			return this.getCommonDetail();
		}
    }


    render(){
    	const { payInfo, payCountDown } = this.props;
    	const { isVisible } = this.state
		const iconClass=classnames({
			'cicon':true,
			['icon-upw-icon']: isVisible,
			['icon-pul-icon']: !isVisible,
		});

        return (
            <div styleName="payment-message-detail">
				<div styleName="pay-price">
					<div styleName="price-money-left">
						<div styleName="price-mesage">
							在线支付:&nbsp;&nbsp;
							<span styleName="price">&yen;&nbsp;{payInfo.total}</span>
						</div>
						<div styleName="price-time">
							剩余支付时间&nbsp;&nbsp;
							<i styleName="cicon icon-order-time-icon"></i>&nbsp;&nbsp;
							<CountDown onOver={()=>{}} time={payCountDown}/>
						</div>
					</div>
					<div styleName="price-icon-right" onClick={this.handleDetailShow.bind(this,!isVisible)}>
						<i styleName={iconClass}></i>
					</div>
				</div>
				{ this.getDetailShow() }
            </div>
        );
    }

}





export default TrainPayInfo;

