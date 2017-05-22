import React ,{ Component ,PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './searchCity.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SearchCity extends Component{

	//验证是否为字符串和函数
	static propTypes = {
		fromCityName: PropTypes.string,
		toCityName: PropTypes.string,
		selectCity: PropTypes.func,
	};

	handleClick(direction){
		this.props.selectCity(direction);
	}

	render(){
		const {fromCityName , toCityName} = this.props;
		return(
			<label styleName="label-item">
				<div styleName="city-title">
					<span styleName="label-form-city">出发城市</span>
					<span styleName="label-to-city">到达城市</span>
				</div>
				<div styleName="select-city">
					<a 	styleName="city from-city" onClick={ () =>{ this.handleClick('from'); } }>{fromCityName}</a>
					<i  styleName='cicon icon-jiaohuan-ico'></i>
					<a 	styleName="city to-city" onClick={ () =>{ this.handleClick('to'); } }>{toCityName}</a>
				</div>
				<div styleName="left-border"></div>
				<div styleName="right-border"></div>
			</label>
		)
	}
}

export default SearchCity;