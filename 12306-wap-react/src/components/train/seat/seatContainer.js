import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './seat.scss';


import trainModel from '../../../http/train/index';
import SessionServer from '../../../server/session/index';

import ModalLoading from '../../../components/modal/loading';
import SeatTrainInfo from './seatTrainInfo';
import SeatList from './seatList';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainSeatContainer extends Component{
	
	constructor(props){
		super(props);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleCheckSeat = this.handleCheckSeat.bind(this);
	}
	
	//初始化参数请求车次信息
	componentDidMount(){
		const { actions ,params } = this.props;
		actions.initParams(params);
		actions.requestTrainInfo(trainModel.trainInfo,{
			arrStationCode: params.toCityCode,
			deptStationCode: params.fromCityCode,
			deptDate: params.detpDate,
			trainCode:  params.trainCode,
		});
	}

	//时间改变
	handleDateChange(date){
		const { actions ,params } = this.props;
		actions.requestTrainInfo(trainModel.trainInfo,{
			arrStationCode: params.toCityCode,
			deptStationCode: params.fromCityCode,
			deptDate: date,
			trainCode:  params.trainCode,
		});
	}

	//选中坐席
	handleCheckSeat(seat){
		const { trainInfo ,push } = this.props;
		//可以购买普通订单
		if(seat.showButton === 1){
			let checkedTrain = trainInfo;
			checkedTrain.checkedSeat = seat;
			SessionServer.set('FillOrderTrainInfo',checkedTrain);
			//跳转到普通订单填写
			push('/train/fillOrder/common');
		}
		
	}


	render(){
		const { trainInfo ,minDate ,maxDate ,loading } = this.props;
		const { seatList, trainStatus } = trainInfo;
		
		return (
			<div styleName="seta-container">
				<SeatTrainInfo 
						onDateChange={this.handleDateChange}
						minDate={minDate} 
						maxDate={maxDate} 
						trainInfo={trainInfo}
				/>
				<SeatList 
						key={trainInfo.deptDate}
						onCheckSeat={this.handleCheckSeat}
						seatList={seatList} 
						trainStatus={trainStatus} 
				/>
				<ModalLoading isVisible={loading} textContent="正在为您加载车次" />
			</div>
		);
	}

}




export default TrainSeatContainer;


