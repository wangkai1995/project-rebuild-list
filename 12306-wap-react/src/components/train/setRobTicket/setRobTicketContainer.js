import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './setRobTicket.scss';

import trainModel from '../../../http/train/index';
import SessionServer from '../../../server/session/index'
import * as DateFilter from '../../../filter/Date';

import ModalLoading from '../../../components/modal/loading';

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
		};
		this.handleSelectCity = this.handleSelectCity.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleSelectTrain = this.handleSelectTrain.bind(this);
		this.handleSelectSeat = this.handleSelectSeat.bind(this);
	}
	

	//请求城市
	componentDidMount(){
		const { actions } = this.props;
		let robTrainInfo = SessionServer.get('robTicketTrainInfo');
		actions.requestDateRange(trainModel.trainDateRange);
		actions.requestPack(trainModel.trainRobPack);
		if(robTrainInfo){
			this.setState({
				robTrainInfo: robTrainInfo,
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
		push('/train/setRobTicket/'+date);
	}

	//选择车次
	handleSelectTrain(){
		const { fromCityName, fromCityCode ,toCityName, toCityCode ,params ,push } = this.props;
		push('/train/robTrainInfo/'+encodeURI(fromCityName)+'/'+fromCityCode+'/'+encodeURI(toCityName)+'/'+toCityCode+'/'+params.detpDate);
	}

	//选择坐席
	handleSelectSeat(){

	}


	render(){	
		const { loading, fromCityName ,toCityName ,maxDate ,minDate ,packInfo ,push ,params } = this.props;
		const { robTrainInfo } = this.state;
		const buttonClass=classnames({
			'rob-ticket-submit' : true,
			'submit-disabled' : true,
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
							onSelectSeat={this.handleSelectSeat}  
				/>
				<SetRobTicketPack 
							push={push} 
							packInfo={packInfo} 
				/>

				<button styleName={buttonClass}>下一步</button>
				<ModalLoading isVisible={loading} textContent="加载中" />
			</div>
		);
	}

}






export default TrainSetRobTicketContainer;



