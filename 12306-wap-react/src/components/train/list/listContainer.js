import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';


import trainModel from '../../../http/train/index';

import TrainListHeader from './listHeader';
import TrainInfo from './listTrainInfo';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainInfoContainer extends Component{
	
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const { actions ,params } = this.props;
		actions.initParams(params);
		actions.requestTrainInfo(trainModel.trainInfoList,{
			arrStationCode: params.toCityCode,
			deptStationCode: params.fromCityCode,
			deptDate: params.detpDate,
			findGD:  params.findGD,
		});
	}


	render(){
		// console.log(this.props);
		const { params , trainInfo }= this.props;
		
		return(
			<div styleName="root-container">
				<TrainListHeader params={params} />
				<TrainInfo trainInfo={trainInfo} />
			</div>
		);
	}
}






export default TrainInfoContainer;


