import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './seat.scss';


import trainModel from '../../../http/train/index';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainSeatContainer extends Component{
	
	constructor(props){
		super(props);
		
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



	

	render(){
		console.log(this.props);

		return (
			<div>
				
			</div>
		);
	}

}




export default TrainSeatContainer;


