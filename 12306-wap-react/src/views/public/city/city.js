import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import styles from './city.scss';


import Header from '../../../layouts/header/header';


@CSSModules(styles,{allowMultiple : true})
class City extends Component{


	render(){
		return(
			<div styleName="city-container">
				<Header title="选择城市" />
				
			</div>
		)
	}
}


export default City;