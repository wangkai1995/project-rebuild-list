import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import TrainFilterCheckBox from './listFilterCheckBox';





@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainFilterContent extends Component{
	
	constructor(props){
		super(props);
	}

	render(){
		const { trainStation ,trainTime ,trainType } = this.props.filterSeach;
		const { onSeachChange } = this.props;
		return(
			<div styleName="filter-popup-content">
					
					<div styleName="filter-popup-item">
						<h4 styleName="filter-popup-title"><span></span>车次类型<span></span></h4>
						<TrainFilterCheckBox model='trainType' onCheck={onSeachChange} checkBoxList={trainType}  />
					</div>


					<div styleName="filter-popup-item">
						<h4 styleName="filter-popup-title"><span></span>出发时间<span></span></h4>
						<TrainFilterCheckBox model='trainTime'  onCheck={onSeachChange} checkBoxList={trainTime}  />
					</div>
					

					<div styleName="filter-popup-item">
						<h4 styleName="filter-popup-title"><span></span>出发/到达车站<span></span></h4>
						<TrainFilterCheckBox model='trainStation'  onCheck={onSeachChange} checkBoxList={trainStation} />
					</div>

			</div>
		);
	}

}





export default TrainFilterContent;


