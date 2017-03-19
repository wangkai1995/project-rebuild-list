import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CitySearch extends Component{
	
		handleClick(city){
			this.props.onCheckCity(city);
		}
		
		getSearchCity(searchCity){
			return searchCity.map( (item) =>{
				return (
					<li styleName="search-li">
				  		<a onClick={ this.handleClick.bind(this,item) }>
						  	{item.cityName}
					  	</a> 
					</li>
				)
			});
		}


		render(){
			const { searchCity } = this.props

			return(
				<ul>
					{ this.getSearchCity(searchCity) }
				</ul>
			);
		}
}


export default CitySearch;