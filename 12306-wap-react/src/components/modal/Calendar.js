import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';


import Popup from './Popup';
import Calendar from './calendar/container';


@immutableRenderDecorator
class ModalCalendar extends Component{
	static propTypes = {
		default:  PropTypes.instanceOf(Date),
		check: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		minDate: PropTypes.instanceOf(Date),
		isYearChange: PropTypes.bool,
		isMonthChange: PropTypes.bool,
		clickDateFlag: PropTypes.bool,
		clickDateHide: PropTypes.bool,
		isVisible: PropTypes.bool,
		onInit: PropTypes.func,
		onHide: PropTypes.func,
		onClickDate: PropTypes.func,
		onChangeDate: PropTypes.func,
	};

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


