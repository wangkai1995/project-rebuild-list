import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './searchContainer.scss';

import SearchCity from './searchCity';
import SearchDate from './searchDate';
import SearchType from './searchType';
import SearchSubmit from './searchSubmit';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class Search extends Component{
	
	handlerSearch(){
		console.log(1111);
	}

	render(){

		return(
			<div styleName='search-container'>
				<div styleName='search-list'>
					<SearchCity />
					<SearchDate />
					<SearchType />
				</div>
				<SearchSubmit/>
			</div>
		)
	}
}



export default Search;