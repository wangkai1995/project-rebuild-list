import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './searchContainer.scss';

import trainModel from '../../../http/train/index';

import SearchCity from './searchCity';
import SearchDate from './searchDate';
import SearchType from './searchType';
import SearchSubmit from './searchSubmit';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class Search extends Component{
	static propTypes = {
		Date: PropTypes.string,
		fromCityCode: PropTypes.string,
		fromCityName: PropTypes.string,
		toCityCode: PropTypes.string,
		toCityName: PropTypes.string,
		showDate: PropTypes.string,
		showWeek: PropTypes.string,
		findGD: PropTypes.bool,
		isVisible: PropTypes.bool,
		push: PropTypes.func,
		changeDateAction: PropTypes.fuc,
		hideDateAction: PropTypes.func,
		showDateAction: PropTypes.func,
		findGDAction: PropTypes.func,
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		dateRange: PropTypes.number,
	};
	

	componentDidMount(){
		this.props.dateRangeAction(trainModel.trainDateRange);
	}
	

	constructor(props){
		super(props);
		this.state = this.props;
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSelectCity = this.handleSelectCity.bind(this);
	}

	handleDateChange(date){
		this.props.changeDateAction(date);
	}
	
	//direction = 出发还是达到城市
	handleSelectCity(direction){
		this.props.push('/public/city/train/'+direction);
	}

	handleSearchSubmit(){
		const { fromCityName, fromCityCode ,toCityName, toCityCode ,detpDate , findGD } = this.props;
		this.props.push('/train/list/'+encodeURI(fromCityName)+'/'+fromCityCode+'/'+encodeURI(toCityName)+'/'+toCityCode+'/'+detpDate+'/'+findGD);
	}
	


	render(){

		const { fromCityName ,toCityName ,detpDate ,minDate,maxDate } = this.props;
		const { isVisible , showDate , showWeek ,hideDateAction ,showDateAction} = this.props;
		const { findGD,findGDAction } = this.props;
		return(
			<div styleName='search-container'>
				<div styleName='search-list'>
					<SearchCity
						fromCityName={fromCityName}
						toCityName={toCityName}
						selectCity={this.handleSelectCity}
					/>
					<SearchDate
						defaultDate={detpDate}
						showDate={showDate}
						showWeek={showWeek}
						onShow ={showDateAction}
						onHide ={hideDateAction}
						isVisible = {isVisible}
						minDate={minDate}
						maxDate={maxDate}
						onChangeDate ={this.handleDateChange} 
					/>
					<SearchType 
						findGD = {findGD}
						onChangeFind= {findGDAction}
					/>
				</div>
				<SearchSubmit onSearchSubmit={this.handleSearchSubmit.bind(this)} />
			</div>
		);
	}
}






export default Search;

