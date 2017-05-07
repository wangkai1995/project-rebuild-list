import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './setRobTicket.scss';

import trainModel from '../../../http/train/index';
import * as DateFilter from '../../../filter/Date';


import SetRobTicketCity from './setRobTicketCity';
import SetRobTicketDate from './setRobTicketDate';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainSetRobTicketContainer extends Component{
	
	constructor(props){
		super(props);
		this.handleSelectCity = this.handleSelectCity.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
	}
	

	//请求城市
	componentDidMount(){
		const { actions } = this.props;
		actions.requestDateRange(trainModel.trainDateRange);
	}
	
	//选择城市
	handleSelectCity(direction){
	}

	//时间改变
	handleChangeDate(date){
		const { push  } = this.props;
		push('/train/setRobTicket/'+date);
	}


	render(){	
		const { fromCityName ,toCityName ,maxDate ,minDate ,params } = this.props;
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
			</div>
		);
	}

}





export default TrainSetRobTicketContainer;



