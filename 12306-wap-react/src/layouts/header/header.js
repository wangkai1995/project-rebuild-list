import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './header.scss';
import trainStyle from './train.scss';
import userStyle from './user.scss';
import icon from '../../styles/sprite.css';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,trainStyle,userStyle,icon),{allowMultiple: true})
class Header extends Component{
	static propTypes = {
		childer:PropTypes.node,
		prefix: PropTypes.string,
		title: PropTypes.string.isRequired,
	};

	constructor(props){
		super(props);
		this.handleBackClick = this.handleBackClick.bind(this);
	}

	handleBackClick(){
		window.history.go(-1);
	}

	render(){
		const { prefix,childer,title } = this.props;
		
		let headerClass = classnames({
			[`${prefix}-header`] : prefix,
			'header-container': true,
			bar: true,
		});

		if(childer){
			return(
				<div styleName={ headerClass }>
					<a styleName='back' onClick={this.handleBackClick} >
						<i styleName="cicon icon-back-icon-1"></i>
					</a>
					<h1 styleName="title">{title}</h1>

					{childer}
				</div>
			);
		}else{
			return(
				<div styleName={ headerClass }>
					<a styleName='back' onClick={this.handleBackClick} >
						<i styleName="cicon icon-back-icon-1"></i>
					</a>
					<h1 styleName="title">{title}</h1>
				</div>
			)
		}

	}
}


export default Header;