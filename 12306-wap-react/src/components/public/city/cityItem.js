import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';

import { anchorServer } from './cityAnchor';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityItem extends Component{

		componentDidMount(){
			//记录瞄点信息
			anchorServer.setAnchor( this.props.title, this.refs.anchor.offsetTop );
		}

		getCity(citys){
			return citys.map( (city)=>{
				return ( 
					<li styleName="city-li">{city.cityName}</li>
				);	
			})
		}

		render(){
			const { title, citys } = this.props;
			return(
				<div ref='anchor'>
					<h2 styleName="title">{title}</h2>
					<ul styleName="city-ul">
						{ this.getCity(citys) }
					</ul>
				</div>
			);
		}
}


export default CityItem;