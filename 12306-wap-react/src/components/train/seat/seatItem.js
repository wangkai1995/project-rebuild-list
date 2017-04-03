import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './seat.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SeatItem extends Component{
	
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	getButton(seatNum,trainStatus){
		switch(trainStatus){
			case 0:
				return seatNum === 0? <button 	onClick={this.handleClick} styleName="rob-btn">抢票</button> : <button onClick={this.handleClick} >预定</button>
			case -2:
				return <button styleName="appoint" onClick={this.handleClick} >预约抢票</button>
			default:
				return;
		}
	}

	handleClick(){
		const { seatName , seatPrice, showButton ,seatCode } = this.props;
		this.props.onCheckSeat({seatName , seatPrice, showButton ,seatCode });
	}

	render(){
		const { seatName , seatPrice, showButton ,trainStatus } = this.props;
		const seatNum = isNaN(parseInt(this.props.seatNum)) ? 0: parseInt(this.props.seatNum);
		const PriceClass= classnames({
			'text-overflow' : true,
			'disbled' : seatNum === 0,
			'no-buy' : trainStatus === -2,
		});

		return (
			<li styleName="seat-item">
				<span styleName="text-overflow">{seatName}</span>
				<span styleName="text-overflow">
					{trainStatus === -2? '未开售' : seatNum+'张'}
				</span>
				<span styleName={PriceClass}>
					{seatPrice}&nbsp;
					<i>起</i>
				</span>
				{this.getButton(seatNum,trainStatus)}
			</li>
		);
	}

}




export default SeatItem;
