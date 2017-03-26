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
			isModal:false,
		}
		this.showFilterModal = this.showFilterModal.bind(this);
		this.hideFilterModal = this.hideFilterModal.bind(this);
	}

	showFilterModal(){
		this.setState({
			isModal: true,
		});
	}

	hideFilterModal(){
		this.setState({
			isModal: false,
		});
	}

	render(){
		const { trainArrStations,trainDeptStations } = this.props.trainInfo;

		if(!this.state.isModal){
			return(
				<div styleName="filter-footer">
					<div onClick={this.showFilterModal} >
						<i styleName="cicon icon-tab-choice-n"></i>
						<span>筛选</span>
					</div>
					<div>
						<i styleName="cicon icon-tab_cost"></i>
						<span>耗时</span>
					</div>
					<div>
						<i styleName="cicon icon-tab-time-n"></i>
						<span>从早到晚</span>
					</div>
					<div>
						<i styleName="cicon icon-tab-money-n"></i>
						<span>价格</span>
					</div>
				</div>
			)
		}else{
			return <TrainFilterModal onHide={this.hideFilterModal} trainArr={trainArrStations} trainDept={trainDeptStations} />
		}
	}

}






export default TrainFilter;
