import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';

import CityAnchor from './cityAnchor';
import CityInput from './cityInput';
import CityCurrent from './cityCurrent';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityContainer extends Component{
		render(){
			return(
				<div>
					<CityAnchor/>
					<CityInput/>
					<CityCurrent/>
				</div>
			)
		}
}





export default CityContainer;