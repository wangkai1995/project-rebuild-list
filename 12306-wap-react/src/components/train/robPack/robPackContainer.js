import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './robPack.scss';

import Header from '../../../layouts/header/header';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainRobPackContainer extends Component{
	
	constructor(props){
		super(props);
	}


	render(){	
		return(
			<div styleName="container">
			</div>
		);
	}

}






export default TrainRobPackContainer;



