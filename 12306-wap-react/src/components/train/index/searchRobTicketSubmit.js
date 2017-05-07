import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './search.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SearchRobTicketSubmit extends Component{
	
	handleSubmit(){
		this.props.onSearchRobTicketSubmit();
	}

	render(){
		return (
			<div styleName="search-submit">
				<a onClick={ this.handleSubmit.bind(this) } styleName="search-rob-button">
					抢票
				</a>
			</div>
		)
	}

}


export default SearchRobTicketSubmit;

