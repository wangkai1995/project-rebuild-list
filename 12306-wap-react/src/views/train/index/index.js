import React,{ Component } from 'react';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import Banner from '../../../layouts/banner/banner';
import Search from '../../../components/train/index/searchContainer';
import styles from './index.scss';


@CSSModules(styles,{allowMultiple : true})
class trainIndex extends Component {

	render(){

		let classname = classnames({
			'index-container': true
		});

		console.log(classname);

		return(
			<div styleName={classname}>
				<Banner classPrefix="train"/>
				<Search/>
			</div>
		);
	}
}

export default trainIndex;


