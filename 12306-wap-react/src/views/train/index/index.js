import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';

import Banner from '../../../layouts/banner/banner';
import SearchFooter from '../../../layouts/footer/searchFooter';
import Search from '../../../components/train/index/searchContainer';
import styles from './index.scss';
import { actions } from './indexRedux';

import localServer from '../../../server/local/index'



@CSSModules(styles,{allowMultiple : true})
class trainIndex extends Component {

	render(){
		const { searchAction ,push} = this.props;
		let { search }= this.props;
		//读取城市选择
		let fromCity = localServer.get('train.fromCity');
		let toCity = localServer.get('train.toCity');
		search.fromCityName = fromCity? fromCity.cityName : '深圳';
		search.fromCityCode = fromCity? fromCity.cityCode : 'SZQ';
		search.toCityName = toCity? toCity.cityName : '北京';
		search.toCityCode = toCity? toCity.cityCode : 'BJP';
		
		return(
			<div styleName='index-container'>
				<div styleName="content-container">
					<Banner classPrefix="train"/>
					<Search {...search} {...searchAction} push={push} />
				</div>
				<SearchFooter Model='train' />
			</div>
		);
	}
}



export default connect( state =>{
	return{
		search : state.train.index.search,
	};
},dispatch =>{
	return{
		searchAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(trainIndex);



