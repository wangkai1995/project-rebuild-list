import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Banner from '../../../layouts/banner/banner';
import Search from '../../../components/train/index/searchContainer';
import styles from './index.scss';
import { actions } from './indexRedux';


@CSSModules(styles,{allowMultiple : true})
class trainIndex extends Component {

	render(){
		const { search ,searchAction} = this.props;

		return(
			<div styleName='index-container'>
				<Banner classPrefix="train"/>
				<Search {...search} {...searchAction} />
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
	}
})(trainIndex);




