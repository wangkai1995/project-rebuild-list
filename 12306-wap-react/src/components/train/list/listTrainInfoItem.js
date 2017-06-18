import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './list.scss';
import icon from '../../../styles/sprite.css';

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainInfoItem extends Component{
	
	constructor(props){
		super(props);
		this.handleChenckTrain = this.handleChenckTrain.bind(this);
	}
	

	//坐席
	getSeat(){
		const { seatList , trainStatus ,reason ,canBuy } = this.props;
		let count = 0;
		let seat = seatList.filter(function(item){
			if(parseInt(item.seatNum) === 0){
				count++;
				return item;
			}
			return item;
		});

		if(!canBuy){
			return (<span>{reason}</span>)
		}

		//没有余票
		if(seat.length === count ){
			return (<span styleName="item-trainSeat-Sell-Out">暂无余票,建议抢票</span>)
		}


		//只要前三坐席
		if(seat.length > 3){
			seat.splice(3,seat.length);
		}
		return seat.map(function(item){
			if(parseInt(item.seatNum) === 0){
				return (
						<span styleName="item-trainSeat-item trainSeat-disabled">
							{item.seatName}&nbsp;&nbsp;{item.seatNum}
							<span styleName="item-trainSeat-rob">(抢)</span>
						</span>
				);
			}
			return (<span styleName="item-trainSeat-item">{item.seatName}&nbsp;&nbsp;{item.seatNum}</span>);
		});	
	}

	//是否抢票
	getIcon(){
		const { seatList , trainStatus ,reason } = this.props;

		if(trainStatus === -2){
			return <span styleName="appoint">预约抢票</span>
		}
		if(trainStatus === 0){
			return null;
		}

		for(var i=0; i<seatList.length ;i++){
			if(parseInt(seatList[i].seatNum) !== 0){
				return null;
			}
		}
		return <span>去抢票</span>
	}
	

	//选择坐席
	handleChenckTrain(){
		const { canBuy } = this.props;
		if(!canBuy){
			return false;
		}
		this.props.onCheckTrain(this.props);
	}


	render(){
		const { trainStatus ,canBuy } = this.props;
		const itemClass = classnames({
			'trainInfo-item' : true,
			'trainInfo-item-disabled' : !canBuy
		});
		return(
			<li styleName={itemClass} onClick={this.handleChenckTrain} >
				<div styleName="item-trainInfo">
					<div styleName="item-deptCity">{this.props.deptStationName}</div>
					<div styleName="item-infos">
						<span>{this.props.trainCode}</span><br/>
						<span>
							<i styleName="cicon icon-list_menu"></i>
						</span><br/>
						<span>{this.props.runTime}</span><br/>
					</div>
					<div styleName="item-arrCity">{this.props.arrStationName}</div>
					<div styleName="item-price">
						<span styleName="item-small">&yen;</span>
						<span styleName="item-money">{this.props.minPrice}</span>
						<span styleName="item-small ">起</span>
					</div>
				</div>
				<div styleName="item-trainTime">
					<span styleName="item-detp">{this.props.deptTime}</span>
					<span styleName="item-arr">
						{this.props.arrTime}
						{this.getIcon()}
					</span>
				</div>
				<div styleName="item-trainSeat">
					{this.getSeat()}
				</div>
			</li>
		);
	}


}






export default TrainInfoItem;
