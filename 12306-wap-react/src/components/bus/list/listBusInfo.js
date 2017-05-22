import React,{Component} from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './list.scss';
import { Link } from 'react-router';

import SessionServer from '../../../server/session/index';
import ModalLoading from '../../../components/modal/loading';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple:true})
class BusInfo extends Component{

	constructor(props){
		super(props);
	}

	handleClick(item){
		 SessionServer.set('FillOrderBusInfo',item);
	}

	getBusInfoList(){
		const self = this;
		const { busTrains } = this.props.busInfo;
		return busTrains.map(function(item){
            return <li styleName="busInfo-list">
            		   <div styleName="car-list-left">
	            		   <span styleName="starttime">{item.dptTime}</span>
	            		   <span styleName="car-type">{item.coachType}</span>
            		   </div>
            		   <div styleName="car-list-divide">
						   <span styleName="divide-top"></span>
						   <span styleName="divide"></span>
						   <span styleName="divide-bottom"></span>
            		   </div>
            		   <div styleName="car-list-right">
            		   	   <span styleName="arr-dpt">
            		   	   		<span styleName="car-fromcity">{item.dptStation}</span>
            		   	   		<span styleName="car-tocity">{item.to}</span>
            		   	   </span>
            		   	   <span styleName="price">
            		   	   		<span styleName="ticket-price">￥<span styleName="money">{item.ticketPrice}</span></span>
            		   	   		<span styleName="ticket-count">{item.trainCount}张</span>
            		   	   </span>
            		   	   <span styleName="buy" onClick={ () =>{ self.handleClick(item); } }>
            		   	   		<Link to="/bus/fillOrder">预订</Link>
            		   	   </span>
            		   </div>
                   </li>
        });
	}

	render(){
		const { busInfo,isLoading } = this.props;

		if( Array.isArray(busInfo.busTrains) && busInfo.busTrains.length > 0){
			return(
				<div styleName='trainInfo-container' >
					<ul styleName="trainInfo-list">
						 {this.getBusInfoList()}
					</ul>
					<ModalLoading isVisible={isLoading} textContent="正在为您加载车次" />
				</div>
			);
		}else if(!Array.isArray(busInfo.busTrains) && busInfo.busTrains == null){
			return(
				<div styleName='trainInfo-container' >
					<div styleName="list-empty ">没有找到符合条件的车次</div>
				</div>
			);
		}else{
			return <ModalLoading isVisible={true} textContent="正在为您加载车次" />
		}
	}
}

export default BusInfo;