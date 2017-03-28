import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';
import icon from '../../../styles/sprite.css';

import TrainFilterModal from './listFilterModal';

@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainFilter extends Component{
	
	constructor(props){
		super(props);

		this.state={
			reversal: false,
			isModal: false,
			detpTime:false,
		}
		this.showFilterModal = this.showFilterModal.bind(this);
		this.hideFilterModal = this.hideFilterModal.bind(this);
		this.runTimeFilter = this.runTimeFilter.bind(this);
		this.detpFilter = this.detpDateFilter.bind(this);
		this.priceFilter = this.priceFilter.bind(this);
	}

	//筛选显示
	showFilterModal(){
		this.setState({
			isModal: true,
		});
	}
	
	//筛选关闭
	hideFilterModal(){
		this.setState({
			isModal: false,
		});
	}
	
	//根据耗时筛选
	runTimeFilter(reversal){
		const { trainInfosBuff, onSeachFilter } = this.props;
		var buff = trainInfosBuff.map(function(iten){
			return iten;
		});
		buff.sort( function(curr,next){
			var currRunTime = curr.runTime.replace(':','') ,
				nextRunTime = next.runTime.replace(':','');

				currRunTime = isNaN( parseInt(currRunTime) )? 0: parseInt(currRunTime);
				nextRunTime = isNaN( parseInt(nextRunTime) )? 0: parseInt(nextRunTime);

				return  currRunTime < nextRunTime ? -1 : 1;
		});
		if(reversal){
			buff.reverse();
		}
		onSeachFilter(buff);
		this.setState({
			reversal: reversal,
		});
	}
	
	//根据出发时间筛选
	detpDateFilter(reversal){
		const { trainInfosBuff, onSeachFilter } = this.props;
		var buff = trainInfosBuff.map(function(iten){
			return iten;
		});
		buff.sort( function(curr,next){
			var currRunTime = curr.deptTime.replace(':','') ,
				nextRunTime = next.deptTime.replace(':','');

				currRunTime = isNaN( parseInt(currRunTime) )? 0: parseInt(currRunTime);
				nextRunTime = isNaN( parseInt(nextRunTime) )? 0: parseInt(nextRunTime);

				return  currRunTime < nextRunTime ? -1 : 1;
		});
		if(reversal){
			buff.reverse();
		}
		onSeachFilter(buff);
		this.setState({
			reversal: reversal,
			detpTime: reversal,
		});
	}
	
	//根据票价筛选
	priceFilter(reversal){
		const { trainInfosBuff, onSeachFilter } = this.props;
		var buff = trainInfosBuff.map(function(iten){
			return iten;
		});
		buff.sort( function(curr,next){
			var	currRunTime = isNaN( parseFloat(curr.minPrice) )? 0: parseFloat(curr.minPrice);
			var	nextRunTime = isNaN( parseFloat(next.minPrice) )? 0: parseFloat(next.minPrice);

				return  currRunTime < nextRunTime ? -1 : 1;
		});
		if(reversal){
			buff.reverse();
		}
		onSeachFilter(buff);
		this.setState({
			reversal: reversal,
		})
	}


	render(){
		const { filterSeachAction ,filterSeach ,trainInfosBuff,onSeachFilter } = this.props;
		const { trainArrStations,trainDeptStations } = this.props.trainInfo;
		const { reversal,detpTime } = this.state;

		if(!this.state.isModal){
			return(
				<div styleName="filter-footer">
					<div onClick={this.showFilterModal} >
						<i styleName="cicon icon-tab-choice-n"></i>
						<span>筛选</span>
					</div>
					<div onClick={this.runTimeFilter.bind(this,!reversal) }>
						<i styleName="cicon icon-tab_cost"></i>
						<span>耗时</span>
					</div>
					<div onClick={this.detpDateFilter.bind(this,!reversal) }>
						<i styleName="cicon icon-tab-time-n"></i>
						<span>{ detpTime? '从晚到早' : '从早到晚' }</span>
					</div>
					<div onClick={this.priceFilter.bind(this,!reversal) }>
						<i styleName="cicon icon-tab-money-n"></i>
						<span>价格</span>
					</div>
				</div>
			)
		}else{
			return <TrainFilterModal 	
							onSeachFilter={onSeachFilter}
							filterSeachAction={filterSeachAction} 
							trainInfo={trainInfosBuff} 
							filterSeach={filterSeach}
							onHide={this.hideFilterModal} 
							trainArr={trainArrStations} 
							trainDept={trainDeptStations} 
					/>
		}
	}

}






export default TrainFilter;
