import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityCurrent extends Component{

		render(){
			return(
				<div>
					<h2 styleName="title">当前城市</h2>
					<div styleName="inline-block-container">
						<div styleName="citys">
							<a>正在定位</a>
						</div>
					</div>
				</div>
			);
		}
}


export default CityCurrent;