import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import classnames from 'classnames';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CalendarContent extends Component{

	constructor(props){
		super(props);
	}

	getWeek(){
		let week = ['一','二','三','四','五','六','日'];
		return week.map(function(item,index){
			return <span>{item}</span>
		});
	}

	getDate(){
		const { dateList,checked } = this.props;
		var self = this;

		return  dateList.map(function(item){
			let classname = classnames({
				'date-disabled': !item.active,
				'date-active': ( item.active && item.monthFlag !== 'now' ),
				'date-checked': ( item.date.toString() === checked.toString() ) , 
			});
			return <span 	
						styleName={classname}
						onClick={ self.handleCheckDate.bind(self,item.date) }
						key={item.date.getTime()}
					>
						{item.value}
					</span>
		});
	}


	handleCheckDate(date){
		this.props.onCheckDate(date);
	}


	render(){
		return (
			<div styleName="calendar-content">
				<div styleName="calendar-week">
					{this.getWeek()}
				</div>
				<div styleName="calendar-date">
					{this.getDate()}
				</div>
			</div>
		);
	}
	
}






export default CalendarContent