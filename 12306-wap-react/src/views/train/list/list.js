import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';


import styles from './list.scss';
import icon from '../../../styles/sprite.css';

import Header from '../../../layouts/header/header';
import TrainInfoContainer from '../../../components/train/list/listContainer';


@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainList extends Component {
	

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
	
	getHeaderDetpDate(){
		const { detpDate } = this.props.params;
		return(
			<div styleName="bar-tab-time">
				<a styleName="tab-forward">
					<i styleName="cicon icon-icon-left-ion-small"></i>
					&nbsp;&nbsp;前一天
				</a>
				<div styleName="tab-time">
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
			<div styleName='search-list-container'>
				<Header title={this.getHeaderCityName()} prefix="train-list" childer={this.getHeaderDetpDate()} />
				<TrainInfoContainer/>
			</div>
		);
	}
}



export default  TrainList;
