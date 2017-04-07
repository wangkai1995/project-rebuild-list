import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './seat.scss';
import icon from '../../../styles/sprite.css';

import * as DateFilter from '../../../filter/Date';
import SeatDate from './seatDate';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SeatTrainInfo extends Component{
	
	constructor(props){
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
	}


	handleDateChange(date){

		this.props.onDateChange( DateFilter.getFormat(date,'yyyy-MM-dd') );
	}
	

	getDetpDateSelect(){
		const { trainInfo, minDate ,maxDate } = this.props;
		const { deptDate } = trainInfo;

		if(deptDate &&  minDate && maxDate){
			return <SeatDate 
						minDate={minDate}
						maxDate={maxDate} 
						deptDate={deptDate} 
						onDateChange={this.handleDateChange}
					/>
		}
		return null;
	}


	render(){
		const { deptStationName , arrStationName , deptTime, arrTime, deptDate, arrDate } = this.props.trainInfo;
		const { trainCode , runTime } = this.props.trainInfo;
		
		return (
			<div styleName="train-info">
				<div styleName="info-from">
					<p styleName="city">{deptStationName}</p>
					<p styleName="time">{deptTime}</p>
					<p styleName="date">{DateFilter.getFormat(deptDate,'MM月dd日')}&nbsp;{DateFilter.getWeek(deptDate)}</p>
				</div>
				<div styleName="info-info">
					<Link to={`/train/through/${deptDate}/${trainCode}`} >
						<p>{trainCode}</p>
						<p>
							<i styleName="cicon icon-train-through-arrow-black"></i>
						</p>
						<p>{DateFilter.runTime(runTime)}</p>
					</Link>
				</div>
				<div styleName="info-to">
					<p styleName="city">{arrStationName}</p>
					<p styleName="time">{arrTime}</p>
					<p styleName="date">{DateFilter.getFormat(arrDate,'MM月dd日')}&nbsp;{DateFilter.getWeek(arrDate)}</p>
				</div>
				<div styleName="clear-fixed"></div>
				{this.getDetpDateSelect()}
			</div>
		);
	}


}




export default SeatTrainInfo;
