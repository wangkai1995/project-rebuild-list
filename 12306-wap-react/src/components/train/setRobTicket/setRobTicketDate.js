import React ,{ Component ,PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './setRobTicket.scss';
import icon from '../../../styles/sprite.css';

import * as DateFilter from '../../../filter/Date';
//自定义日历
import ModalCalendar from '../../../components/modal/Calendar';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SetRobTicketDate extends Component{
	static propTypes = {
		minDate: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		onChangeDate: PropTypes.func,
	};
	
	constructor(props){
		super(props);
		this.state={
			isVisible:false,
			detpDate:false,
		}
		this.handleShow = this.handleShow.bind(this);
		this.handleHide = this.handleHide.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount(){
		const { detpDate } = this.props;
		this.setState({
			detpDate: detpDate,
		})
	}


	componentWillReceiveProps(nextProps){
		const { detpDate } = nextProps;
		this.setState({
			detpDate: detpDate,
		})
	}
	

	handleShow(){
		this.setState({
			isVisible: true,
		})
	}
	

	handleHide(){
		this.setState({
			isVisible: false,
		})
	}


	handleDateChange(date){
		const { onChangeDate } = this.props;
		onChangeDate( DateFilter.getFormat(date,'yyyy-MM-dd') );
	}

	
	render(){
		const { detpDate, isVisible } = this.state;
		const { minDate , maxDate } = this.props;
		return(
			<div styleName='ser-rob-item'>
				<div styleName="item-content">
					<span styleName="title">出发日期</span>
					<span styleNmae="item-show-content" onClick={this.handleShow}>
						<span>{ DateFilter.getFormat(detpDate,'yyyy-MM-dd') }</span>
						&nbsp;
						<span>{ DateFilter.getWeek(detpDate) }</span>
					</span>
				</div>
				<div styleName="border-buttom"></div>
				<ModalCalendar
						default={ new Date(detpDate) }
						onHide={this.handleHide}
						onChangeDate={this.handleDateChange} 	
						isVisible={isVisible}
						minDate={minDate}
						maxDate={maxDate}
				/>
			</div>
		);
	}
}




export default SetRobTicketDate;


