import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';


import Popup from './Popup';
import Calendar from './calendar/container';


@immutableRenderDecorator
class ModalCalendar extends Component{
	
	constructor(props){
		super(props);
		this.state={
			isVisible: this.props.isVisible,
		}
		this.setCalendarHide = this.setCalendarHide.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({
			isVisible : nextProps.isVisible,
		});
	}	

	setCalendarHide(){
		this.setState({
			isVisible : false,
		});
	}

	render(){
		if(this.state.isVisible){
			return (
				<Popup>
						<Calendar setCalendarHide={this.setCalendarHide} {...this.props} />
				</Popup>
			);
		}else{
			return null;
		}
	}
}



export default ModalCalendar;


