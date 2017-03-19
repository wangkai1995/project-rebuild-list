import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainInfoContainer extends Component{
	
	constructor(props){
		super(props);

	}

	render(){

		return(
			<div styleName='trainInfo-container'>
				
			</div>
		);
	}
}






export default TrainInfoContainer;
