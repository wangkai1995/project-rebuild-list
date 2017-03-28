import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import trainModel from '../../../http/train/index';

import TrainListHeader from './listHeader';
import TrainInfo from './listTrainInfo';
import TrainFilter from './listFilter';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainInfoContainer extends Component{
	
	constructor(props){
		super(props);
		this.state={
			updateFlag: true,
			trainInfo:{},
			isBuff: false,
			trainInfosBuff:[],
		};
		this.seachFilter = this.seachFilter.bind(this);
		this.startDateChange = this.startDateChange.bind(this);
	}
	
	//请求城市
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
	
	//初始化车次缓存
	componentWillReceiveProps(nextProps){
		var buff = [];
		const { trainInfos } = nextProps.trainInfo;
		if( trainInfos && !this.state.isBuff ){
			trainInfos.map(function(train){
				buff.push(train);
			});
			this.setState({
				updateFlag: !this.state.updateFlag,
				isBuff: true,
				trainInfosBuff:buff,
				trainInfo: nextProps.trainInfo
			});
		}
	}
	
	//出发时间发生变化
	startDateChange(date){
		console.log(date);
	}
	
	//筛选车次
	seachFilter(trainInfos){
		let { trainInfo } = this.state;
		trainInfo.trainInfos = trainInfos;
		this.setState({
			trainInfo: trainInfo,
			updateFlag: !this.state.updateFlag,
		});
	}


	render(){

		const { params , filterSeach ,actions }= this.props;
		const { trainInfo ,trainInfosBuff ,updateFlag } = this.state;

		return(
			<div styleName="root-container">
				<TrainListHeader onDateChange={this.startDateChange} params={params} />
				<TrainInfo trainInfo={ trainInfo } key={updateFlag} />
				<TrainFilter 
						onSeachFilter={this.seachFilter}
						trainInfosBuff={trainInfosBuff}	
						filterSeach={filterSeach}
						trainInfo={trainInfo} 
						filterSeachAction={actions.setFilterSeach} 
				/>
			</div>
		);
	}

}






export default TrainInfoContainer;


