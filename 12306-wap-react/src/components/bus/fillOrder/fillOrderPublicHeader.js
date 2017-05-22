import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import Header from '../../../layouts/header/header';
import * as DateFilter from '../../../filter/Date';

import SessionServer from '../../../server/session/index';

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusfillOrderPublicHeader extends Component {
	
	constructor(props){
		super(props);

	}
	

	//初始化车次信息
	getHeaderBusInfo(){
		const busInfo = SessionServer.get('FillOrderBusInfo');
		if(busInfo){
			return(
				<div styleName="bus-type-message">
					<div styleName="start-time">
					    { DateFilter.getFormat(busInfo.startDate,'M月dd日') } 
						({ DateFilter.getWeek(busInfo.startDate) }){busInfo.dptTime}发车</div>
					<div styleName="bus-message">
						<div styleName="from-to-message">
							<span styleName="from-city">{busInfo.from}</span>
							<span styleName="coach-type">{busInfo.coachType}</span>
							<span styleName="to-city">{busInfo.to}</span>
						</div>
						<div styleName="divide">
							<i styleName="cicon icon-icon-bus-point-to"></i>
						</div>
						<div styleName="Station-message">
							<span styleName="dptStation">{busInfo.dptStation}</span>
							<span styleName="arrStation">{busInfo.arrStation}</span>							
						</div>
					</div>
					
				</div>
			)
		}
	}


	render(){
		return(
			<Header title="填写订单"  prefix="train-fill-order" childer={this.getHeaderBusInfo()} />
		);
	}
	
}



export default  BusfillOrderPublicHeader;

