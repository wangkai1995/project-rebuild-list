import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';


import styles from './list.scss';
import icon from '../../../styles/sprite.css';
import Header from '../../../layouts/header/header';


@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainList extends Component {
	

	getHeaderCityName(){
		const { fromCityName , toCityName } = this.props.params;
		return(
			<div>
				<span>{fromCityName}</span>
				<i styleName="cicon icon-plane-point_small"></i>
				<span>{toCityName}</span>
			</div>
		)
	}


	render(){
		

		return(
			<div styleName='search-list-container'>
				<Header title={title} prefix="train-list"/>
				
			</div>
		);
	}
}



export default  TrainList;
