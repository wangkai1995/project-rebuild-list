import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityInlineItem extends Component{
		render(){
			const {cityName} = this.props;
			return(
				<div styleName="citys">
					<a>{cityName}</a>
				</div>
			);
		}
}


export default CityInlineItem;