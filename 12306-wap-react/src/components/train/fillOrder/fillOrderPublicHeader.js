import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';


import Header from '../../../layouts/header/header';
import * as DateFilter from '../../../filter/Date';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderPublicHeader extends Component {
	
	constructor(props){
		super(props);
	}
	

	//初始化车次信息
	getHeaderTrainInfo(){
		const { trainInfo } = this.props;
		console.log(trainInfo);
		if(trainInfo){
			return(
				<div styleName="train-header-info">
					<div styleName="header-from">
						<p styleName="header-city">{trainInfo.deptStationName}</p>
						<p styleName="header-time">{trainInfo.deptTime}</p>
						<p styleName="header-date">
							{ DateFilter.getFormat(trainInfo.deptDate,'M月dd日') } 
							&nbsp;
							{ DateFilter.getWeek(trainInfo.deptDate) }
						</p>
					</div>
				</div>
			)
		}
	}


	render(){
		return(
			<Header title="订单填写" prefix="train-fill-order" childer={this.getHeaderTrainInfo()} />
		);
	}
	
}



export default  TrainfillOrderPublicHeader;

