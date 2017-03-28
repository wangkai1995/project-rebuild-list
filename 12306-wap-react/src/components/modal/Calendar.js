import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'


import Popup from './Popup';
import Calendar from './calendar/container';


@immutableRenderDecorator
class ModalCalendar extends Component{
	// static propTypes = {
	// 	showDate: PropTypes.string,
	// 	showWeek: PropTypes.string,
	// 	isVisible: PropTypes.bool,
	// 	onChange: PropTypes.func,
	// 	onHide: PropTypes.func,
	// };

	constructor(props){
		super(props);
		this.onDateChange = this.onDateChange.bind(this);
	}

	onDateChange(value) {
		console.log(value);
	  // this.props.onChange(value);
	  // this.props.onHide();
	}


	render(){
		return (
			<Popup>
				<Calendar />
			</Popup>
		);
	}
}



export default ModalCalendar;


