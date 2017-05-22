import React ,{Component} from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './searchSubmit.scss';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SearchSubmit extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(){
		this.props.onSearchSubmit();
	}
	render(){

		return(
			<div styleName="search-submit">
				<a onClick={this.handleSubmit} styleName="submit-button">开始搜索</a>
			</div>
		)
	}
}

export default SearchSubmit;