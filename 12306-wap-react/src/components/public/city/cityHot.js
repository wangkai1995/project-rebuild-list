import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';

import CityInlineItem from './cityInlineItem';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityHotList extends Component{
		static propTypes = {
			onClickCity: PropTypes.func,
		};
		
		render(){
			const { $$cityList , onClickCity } = this.props;

			let cityHotList =  $$cityList.map( (item) =>{
				return <CityInlineItem onCheckCity={onClickCity} {...item} />
			} );


			return(
				<div>
					<h2 styleName="title">热门城市</h2>
					<div styleName="inline-block-container">
							{ cityHotList }
					</div>
				</div>
			);
		}
}


export default CityHotList;

