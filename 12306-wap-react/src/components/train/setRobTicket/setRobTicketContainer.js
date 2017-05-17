import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './setRobTicket.scss';

import trainModel from '../../../http/train/index';
import SessionServer from '../../../server/session/index'
import * as DateFilter from '../../../filter/Date';

import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import SetRobTicketCity from './setRobTicketCity';
import SetRobTicketDate from './setRobTicketDate';
import SetRobTicketTrain from './setRobTicketTrain';
import SetRobTicketSeat from './setRobTicketSeat';
import SetRobTicketPack from './SetRobTicketPack';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainSetRobTicketContainer extends Component{
	
	constructor(props){
		super(props);
		this.state={
			robTrainInfo: false,
			robSeatInfo: false,
		};
		this.handleSelectCity = this.handleSelectCity.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleSelectTrain = this.handleSelectTrain.bind(this);
		this.handleSelectSeat = this.handleSelectSeat.bind(this);
		this.handleSubmitFillOrder = this.handleSubmitFillOrder.bind(this);
	}
	

	//请求城市
	componentDidMount(){
		const { actions } = this.props;
		let robTrainInfo = SessionServer.get('robTicketTrainInfo');
		let robSeatInfo = SessionServer.get('robTicketSeatInfo');
		actions.requestDateRange(trainModel.trainDateRange);
		actions.requestPack(trainModel.trainRobPack);
		if(robTrainInfo){
			this.setState({
				robTrainInfo: robTrainInfo,
			})
		}
		if(robSeatInfo){
			this.setState({
				robTrainInfo: robTrainInfo,
				robSeatInfo: robSeatInfo
			})
		}
	}
	
	
	//选择城市
	handleSelectCity(direction){

		this.props.push('/public/city/train/'+direction);
	}

	//时间改变
	handleChangeDate(date){
		const { push  } = this.props;
		SessionServer.remove('robTicketTrainInfo');
		SessionServer.remove('robTicketSeatInfo');
		this.setState({
			robTrainInfo: false,
			robSeatInfo: false,
		})
		push('/train/setRobTicket/'+date);
	}

	//选择车次
	handleSelectTrain(){
		const { fromCityName, fromCityCode ,toCityName, toCityCode ,params ,push } = this.props;
		push('/train/robTrainInfo/'+encodeURI(fromCityName)+'/'+fromCityCode+'/'+encodeURI(toCityName)+'/'+toCityCode+'/'+params.detpDate);
	}

	//选择坐席
	handleSelectSeat(){
		const { robTrainInfo } = this.state;
		const { push } = this.props;
		if(!robTrainInfo){
			return ModalAlert.show({
                content:'请先选择抢票车次',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
		}
		push('/train/robTrainSeat');
	}

	//车次价格修正
    seatPriceValida(train,seat){
        //如果是硬卧
        if(seat.seatCode === '3' || seat.seatName === '硬卧'){
            seat.seatPrice = train.ywXiaPrice;
        }

        //如果是软卧
        if(seat.seatCode === '4' || seat.seatName === '软卧'){
             seat.seatPrice = train.rwXiaPrice;
        }
        return seat;
    }
	
	//提交
	handleSubmitFillOrder(){
		const { push } = this.props;
		const { robTrainInfo,robSeatInfo } = this.state;
		var checkedTrain = robTrainInfo.firstTrain;
		checkedTrain.checkedSeat = robSeatInfo.firstSeat;
        var maxPrice = parseFloat(robSeatInfo.firstSeat.seatPrice);
		//客户端显示
		//车次
		checkedTrain.trainShow = robTrainInfo.firstTrain.trainCode+'(首选)';
		if(Array.isArray(robTrainInfo.standbyTrain)){
			checkedTrain.standbyTrainCode = '';
			for(let i=0; i<robTrainInfo.standbyTrain.length ;i++){
	            checkedTrain.trainShow += ','+robTrainInfo.standbyTrain[i].trainCode;
	            checkedTrain.standbyTrainCode += robTrainInfo.standbyTrain[i].trainCode+',';
	        }
	        checkedTrain.standbyTrainCode = checkedTrain.standbyTrainCode.substring(0,checkedTrain.standbyTrainCode.length-1);
		}
        //坐席
        checkedTrain.seatShow = robSeatInfo.firstSeat.seatName+'(首选)';
        if(Array.isArray(robSeatInfo.standbySeat)){
        	checkedTrain.standbySeatCode = '';
			for(let i=0; i<robSeatInfo.standbySeat.length ;i++){
	            checkedTrain.seatShow += ','+robSeatInfo.standbySeat[i].seatName;
	            checkedTrain.standbySeatCode += robSeatInfo.standbySeat[i].seatCode+',';
	            //拿到票价最高价格
	            if(parseFloat(robSeatInfo.standbySeat[i].seatPrice) > maxPrice ){
	            	maxPrice = parseFloat(robSeatInfo.standbySeat[i].seatPrice);
	            }
	        }
	        checkedTrain.standbySeatCode = checkedTrain.standbySeatCode.substring(0,checkedTrain.standbySeatCode.length-1);
        }
        checkedTrain.ticketMaxPrice  = maxPrice;
        SessionServer.set('FillOrderTrainInfo',checkedTrain);
		//跳转到抢票订单填写
		push('/train/fillOrder/rob');
	}


	render(){	
		const { loading, fromCityName ,toCityName ,maxDate ,minDate ,packInfo ,push ,params } = this.props;
		const { robTrainInfo ,robSeatInfo } = this.state;
		const buttonClass=classnames({
			'rob-ticket-submit' : true,
			'submit-disabled' : (!robTrainInfo.firstTrain || !robSeatInfo.firstSeat),
		});
		return(
			<div styleName="container">
				<SetRobTicketCity  
							fromCityName={fromCityName} 
							toCityName={toCityName}
							onSelectCity={this.handleSelectCity}
				/>
				<SetRobTicketDate 
							maxDate={maxDate} 
							minDate={minDate} 
							detpDate={params.detpDate} 
							onChangeDate={this.handleChangeDate} 
				/>
				<SetRobTicketTrain
							robTrainInfo={robTrainInfo}
							onSelectTrain={this.handleSelectTrain} 
				/>
				<SetRobTicketSeat 
							robSeatInfo={robSeatInfo}
							onSelectSeat={this.handleSelectSeat}  
				/>
				<SetRobTicketPack 
							push={push} 
							packInfo={packInfo} 
				/>

				<button onClick={this.handleSubmitFillOrder} styleName={buttonClass}>下一步</button>
				<ModalLoading isVisible={loading} textContent="加载中" />
			</div>
		);
	}

}






export default TrainSetRobTicketContainer;



