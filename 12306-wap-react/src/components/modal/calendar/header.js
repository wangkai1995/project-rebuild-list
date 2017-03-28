import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CalendarHeader extends Component{


	constructor(props){
		super(props);
	}


	render(){
		return (
			<div styleName="calendar-header">
				
			</div>
		);
	}
	
}






export default CalendarHeader