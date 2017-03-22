import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './list.scss';
import icon from '../../../styles/sprite.css';

import Header from '../../../layouts/header/header';
import ModalDate from '../../modal/Date';


@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainListHeader extends Component {
	
	constructor(props){
		super(props);
		this.state={
			isVisible:false,
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.showModalDate = this.showModalDate.bind(this);
		this.hideModalDate = this.hideModalDate.bind(this);
	}
	
	//关闭时间选择
	showModalDate(){
		this.setState({
			isVisible:true,
		})
	}
	
	//显示时间选择
	hideModalDate(){
		this.setState({
			isVisible:false,
		})
	}
	
	//时间改变
	handleDateChange(Date){
		console.log(Date);
		this.setState({
			isVisible:false,
		});
	}
	
	//初始化头部城市组件
	getHeaderCityName(){
		const { fromCityName , toCityName } = this.props.params;
		return(
			<div>
				<span styleName="header-from-name">{fromCityName}</span>&nbsp;&nbsp;
				<i styleName="cicon header-icon icon-icon-plane-point_small"></i>&nbsp;&nbsp;
				<span styleName="header-to-name">{toCityName}</span>
			</div>
		)
	}
	
	//初始化时间选择组件
	getHeaderDetpDate(){
		const { detpDate } = this.props.params;
		return(
			<div styleName="bar-tab-time">
				<a styleName="tab-forward">
					<i styleName="cicon icon-icon-left-ion-small"></i>
					&nbsp;&nbsp;前一天
				</a>
				<div styleName="tab-time" onClick={this.showModalDate}>
					<span styleName='time-select-icon'>
						<i styleName="cicon icon-icon-time-select "></i>&nbsp;&nbsp;
						<i styleName="cicon divide icon-icon-divide"></i>&nbsp;&nbsp;
					</span>
					<span styleName="time-text">{detpDate}</span>
				</div>
				<a styleName="tab-backwards">
					后一天&nbsp;&nbsp;
					<i styleName="cicon icon-icon-right-ion-small"></i>
				</a>
			</div>
		)
	}

	render(){
		return(
			<div styleName="list-header-container">
				<Header title={this.getHeaderCityName()} prefix="train-list" childer={this.getHeaderDetpDate()} />
				<ModalDate
						onHide={this.hideModalDate}
						onChange={this.handleDateChange} 	
						isVisible={this.state.isVisible}
				/>
			</div>
		);
	}
}



export default  TrainListHeader;