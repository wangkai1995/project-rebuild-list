import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './banner.scss';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class Banner extends Component {
	render(){

		const { classPrefix } = this.props;  

		let classname = classnames({
			[`${classPrefix}-bg`]: true,
			banner: true
		});

		return	<div styleName={classname} ></div>
	}
}


export default Banner;