import React ,{ Component , PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './searchContainer.scss';

import busModel from '../../../http/bus/index';

import SearchCity from './searchCity';
import SearchDate from './searchDate';
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
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		dateRange: PropTypes.number,
	};
		

	constructor(props){
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleSelectCity = this.handleSelectCity.bind(this);
	}

	//请求热门景点
	componentDidMount(){
		const { actions } = this.props
		actions.busRecommendAction(busModel.busRecommend);
	}

	handleDateChange(date){
		const { actions } = this.props;
		actions.changeDateAction(date);
	}
	
	//direction = 出发还是达到城市
	handleSelectCity(direction){
		this.props.push('/public/city/bus/'+direction);
	}


	handleSearchSubmit(){
		const { fromCityName, fromCityCode ,toCityName, toCityCode ,detpDate } = this.props;
		this.props.push('/bus/list/'+encodeURI(fromCityName)+'/'+fromCityCode+'/'+encodeURI(toCityName)+'/'+toCityCode+'/'+detpDate);
	}

	
	getRecommendList(){
		const { recommendList} = this.props;
		const { fromCityName , fromCityCode ,toCityName,toCityCode,detpDate } = this.props;
		 if(Array.isArray(recommendList) && recommendList.length > 0){
            return recommendList.map(function(item){
                return  <Link styleName="item-pic" to={`/bus/list/${encodeURI(item.dept)}/${fromCityCode}/${encodeURI(item.dest)}/${toCityCode}/${detpDate}`}>
                			<img src={item.imageUrl}/>
                            <p><span>{item.dept}--{item.dest}</span><span>￥{item.price}</span></p>
                        </Link>
            });
        }
	}


	render(){

		const { fromCityName ,toCityName ,detpDate ,minDate,maxDate } = this.props;
		const { isVisible , showDate , showWeek} = this.props;
		const {showDateAction , hideDateAction } = this.props.actions;
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
				</div>
				<SearchSubmit onSearchSubmit={this.handleSearchSubmit.bind(this)} />
				<div styleName="recommend-bus">
					<div styleName="recommend-title">
						<span>&nbsp;</span>
						<span>热门景区推荐</span>
						<span>&nbsp;</span>
					</div>
					<div styleName="recommend-pic">
						 {this.getRecommendList()}
				    </div>
				</div>	
			</div>
		);
	}
}



export default Search;

