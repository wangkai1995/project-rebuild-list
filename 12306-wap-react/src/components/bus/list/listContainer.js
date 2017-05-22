import React ,{ Component , PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import busModel from '../../../http/bus/index';
import * as DateFilter from '../../../filter/Date';

import BusListHeader from './listHeader';
import BusInfo from './listBusInfo';
import BusFilter from './listFilter';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class BusInfoContainer extends Component{
	
	constructor(props){
		super(props);
		this.startDateChange = this.startDateChange.bind(this);
	}

	componentDidMount(){
		const { actions ,params } = this.props;
		actions.requestBusInfo(busModel.busInfoList,{
			from: params.fromCityName,
			to: params.toCityName,			
			startDate: params.detpDate,
		});
	}

	//出发时间发生变化
	startDateChange(date){
		const { actions ,params } = this.props;
		var date = DateFilter.getFormat(date,'yyyy-MM-dd');
		this.setState({
			isBuff: false,
		});
		actions.requestBusInfo(busModel.busInfoList,{
			from: params.fromCityName,
			to: params.toCityName,			
			startDate: date,
		});
	}



	render(){	
		const { params ,actions,minDate ,maxDate,loading }= this.props;
		const { busInfo} = this.props;
		return(
			<div styleName="root-container">
				<BusListHeader 
						minDate={minDate} 
						maxDate={maxDate} 
						onDateChange={this.startDateChange} 
						params={params} 
				/>	
				<BusInfo 
						isLoading={loading} 
						busInfo={ busInfo } 
				/>
				<BusFilter />
			
			</div>
		);
	}

}


export default BusInfoContainer;


