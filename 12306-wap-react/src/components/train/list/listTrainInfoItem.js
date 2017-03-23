import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import icon from '../../../styles/sprite.css';

@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainInfoItem extends Component{
	
	constructor(props){
		super(props);
	}

	getSeat(){
		const { seatList } = this.props;
		let count = 0;
		let seat = seatList.filter(function(item){
			count++;
			if(parseInt(item.seatNum) === 0){
				return false;
			}
			return item;
		});
		if(seat.length === 0){
			return (<span styleName="item-trainSeat-Sell-Out">暂无余票,建议抢票</span>)
		}else{
			//只要前三坐席
			if(seat.length > 3){
				seat.splice(3,seat.length);
			}
			return seat.map(function(item){
				if(parseInt(item.seatNum) === 0){
					return (
							<span styleName="item-trainSeat-item">
								{item.seatName}&nbsp;&nbsp;{item.seatNum}
								<span styleName="item-trainSeat-rob">(抢)</span>
							</span>
					);
				}
				return (<span styleName="item-trainSeat-item">{item.seatName}&nbsp;&nbsp;{item.seatNum}</span>);
			});
		}//END ESLE
	}

	render(){
		var test = this.getSeat();
		return(
			<li styleName='trainInfo-item'>
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
					<span styleName="item-arr">{this.props.arrTime}</span>
				</div>
				<div styleName="item-trainSeat">
					{this.getSeat()}
				</div>
			</li>
		);
	}
}






export default TrainInfoItem;
