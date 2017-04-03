import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './seat.scss';
import icon from '../../../styles/sprite.css';

import ModalCalendar from '../../../components/modal/Calendar';
import * as DateFilter from '../../../filter/Date';

@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class SeatDate extends Component{
	
	constructor(props){
		super(props);
		this.state={
			isVisible: false,
			isPrevShow: true,
			deptDate: this.props.deptDate? this.props.deptDate : DateFilter.getFormat(new Date(),'yyyy-MM-dd'),
		}
		this.showModalDate = this.showModalDate.bind(this);
		this.hideModalDate = this.hideModalDate.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.prevDate = this.prevDate.bind(this);
		this.nextDate = this.nextDate.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(this.state.isPrevShow){
			let date = new Date(nextProps.deptDate);
			date = new Date( date.setDate( date.getDate()-1 ) );
			//是否隐藏自己
			let difference = date.getTime() - new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ).getTime();
			if(difference <= 0){
				this.setState({
					isPrevShow: false,
					deptDate:nextProps.deptDate,
				});
			}else{
				this.setState({
					isPrevShow: true,
					deptDate:nextProps.deptDate,
				});
			}
		}else{
			this.setState({
				deptDate:nextProps.deptDate,
			});
		}
	}

	//显示时间选择
	showModalDate(){
		this.setState({
			isVisible:true,
		})
	}
	
	//关闭时间选择
	hideModalDate(){
		this.setState({
			isVisible:false,
		})
	}

	//上一天
	prevDate(){
		if(this.state.isPrevShow){
			let date = new Date(this.state.deptDate);
			date = new Date( date.setDate( date.getDate()-1 ) );
			//是否隐藏自己
			let difference = date.getTime() - new Date( DateFilter.getFormat(new Date(),'yyyy-MM-dd') ).getTime();
			if(difference <= 0){
				this.setState({
					isPrevShow: false,
				})
			}
			this.handleDateChange(date);
		}
	}
	
	//下一天
	nextDate(){
		let date = new Date(this.state.deptDate);
		date = new Date( date.setDate( date.getDate()+1 ) );
		//显示前一天
		this.setState({
			isPrevShow: true,
		})
		this.handleDateChange(date);
	}

	//时间改变
	handleDateChange(Date){

		this.props.onDateChange(Date);
	}

	render(){
		const { deptDate , isPrevShow ,isVisible } = this.state;
		const { minDate , maxDate } = this.props;	
		const prevClass=classnames({
			'prev': true,
			'hide': !isPrevShow,
		});

		return (
			<div styleName="date-select-containe">
				<span styleName={prevClass} onClick={this.prevDate}>
					前一天
				</span>
				<span styleName="select" onClick={this.showModalDate}>
					<i styleName="cicon icon-train_date_select"></i>
					{deptDate}
					{DateFilter.getWeek(deptDate)}
				</span>
				<span styleName="next" onClick={this.nextDate}>
					后一天
				</span>
				<ModalCalendar
						minDate={minDate}
						maxDate={maxDate}
						default={new Date(deptDate)}
						onHide={this.hideModalDate}
						onChangeDate={this.handleDateChange} 	
						isVisible={isVisible}
				/>
			</div>
		);
	}

}




export default SeatDate;