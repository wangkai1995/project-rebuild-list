import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './addChilder.scss';

import Popup from '../../modal/Popup';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SelectAdultModal extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Popup>
			
			</Popup>
		);
	}
}






export default SelectAdultModal;


