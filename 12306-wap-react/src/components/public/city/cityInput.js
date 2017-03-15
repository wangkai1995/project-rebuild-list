import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityInput extends Component{

		render(){
			return(
				<div styleName='city-input'>
					<label styleName="city-input-label">
						<input styleName="input" type="text" placeholder="中文/拼音/首字母"/>
					</label>
				</div>
			);
		}
}


export default CityInput;