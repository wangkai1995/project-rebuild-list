import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CalendarHeader extends Component{


	constructor(props){
		super(props);
		this.handleAddYear = this.handleAddYear.bind(this);
		this.handleReduceYear = this.handleReduceYear.bind(this);
		this.handleAddMonth = this.handleAddMonth.bind(this);
		this.handleReduceMonth = this.handleReduceMonth.bind(this);
	}

	handleAddYear(){
		const { defaults , isYearChange ,onDateChange } = this.props;
		if(isYearChange){
			let newDefaults;
			let year = defaults.getFullYear(),
                month =defaults.getMonth(),
                day = defaults.getDate();

              newDefaults = new Date(year+1,month,day);
              onDateChange(newDefaults);
		}
	}

	handleReduceYear(){
		const { defaults , isYearChange ,onDateChange } = this.props;
		if(isYearChange){
			let newDefaults;
			let year = defaults.getFullYear(),
                month =defaults.getMonth(),
                day = defaults.getDate();

              newDefaults = new Date(year-1,month,day);
              onDateChange(newDefaults);
		}
	}

	handleAddMonth(){
		const { defaults , isMonthChange ,onDateChange } = this.props;

		if(isMonthChange){
			let newDefaults;
			let year = defaults.getFullYear(),
                month =defaults.getMonth(),
                day = defaults.getDate();

              newDefaults = new Date(year,month+1,1);

              onDateChange(newDefaults);
		}
	}

	handleReduceMonth(){
		const { defaults , isMonthChange ,onDateChange } = this.props;
		if(isMonthChange){
			let newDefaults;
			let year = defaults.getFullYear(),
                month =defaults.getMonth(),
                day = defaults.getDate();

              newDefaults = new Date(year,month-1,1);
              onDateChange(newDefaults);
		}
	}


	render(){
		const { year,month } = this.props;
		return (
			<div styleName="calendar-header">
				<h1>请选择日期</h1>
				<p>
					<span onClick={ this.handleReduceYear }>&lt;&nbsp;</span>
					<span styleName="header-date">{year}</span>
					<span onClick={ this.handleAddYear }>&nbsp;&gt;</span>
				</p>
				<p>
					<span onClick={ this.handleReduceMonth }>&lt;&nbsp;</span>
					<span styleName="header-date">{month}</span>
					<span onClick={ this.handleAddMonth }>&nbsp;&gt;</span>
				</p>
			</div>
		);
	}
	
}






export default CalendarHeader