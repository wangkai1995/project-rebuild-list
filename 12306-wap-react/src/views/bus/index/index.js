import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './index.scss';


import Banner from '../../../layouts/banner/banner';
import SearchFooter from '../../../layouts/footer/searchFooter';
import Search from '../../../components/bus/index/searchContainer';
import { actions } from './indexRedux';


import localServer from '../../../server/local/index';


@CSSModules(styles,{allowMultiple: true})
class BusIndex extends Component {

    render(){
		const { searchAction ,push} = this.props;
		let { search } = this.props;
		let fromCity = localServer.get('bus.fromCity');
		let toCity = localServer.get('bus.toCity');
		search.fromCityName = fromCity? fromCity.cityName : '深圳';
		search.fromCityCode = fromCity? fromCity.cityCode : 'SZQ';
		search.toCityName = toCity? toCity.cityName : '广州';
		search.toCityCode = toCity? toCity.cityCode : 'CAN';


        return(
            <div styleName='index-container'>
            	<Banner classPrefix="bus"/>
            	<Search {...search} actions={searchAction} push={push} />
                <SearchFooter Model='bus' />
            </div>

        );
    }
}

export default connect( state =>{
	return{
		search : state.bus.index.search,
	};
},dispatch =>{
	return{
		searchAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(BusIndex);




