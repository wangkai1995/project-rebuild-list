import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './city.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityInlineItem extends Component{

		handleClick(city){
			this.props.onCheckCity(city);
		}

		render(){
			const {cityName} = this.props;
			return(
				<div styleName="citys">
					<a onClick={ this.handleClick.bind(this,this.props) } >
						{cityName}
					</a>
				</div>
			);
		}
}


export default CityInlineItem;


