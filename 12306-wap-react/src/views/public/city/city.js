import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './city.scss';
import { actions } from './cityRedux';


import Header from '../../../layouts/header/header';
import CityContainer from '../../../components/public/city/cityContainer';



@CSSModules(styles,{allowMultiple : true})
class City extends Component{

	render(){
		const { city ,cityAction,push } = this.props;
		
		return(
			<div styleName="city-container">
				<Header title="选择城市" />
				<CityContainer  {...city} {...cityAction}  push={push} />
			</div>
		)
	}
}



export default connect( state =>{
	return{
		city : state.publics.citys.city,
	};
},dispatch =>{
	return{
		cityAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(City);


