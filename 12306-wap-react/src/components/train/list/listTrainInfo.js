import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import TrainInfoItem from './listTrainInfoItem';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainInfo extends Component{
	
	constructor(props){
		super(props);
	}


	getTrainItem(){
		const trainList = this.props.trainInfo.trainInfos;
		return trainList.map( function(item){
			return <TrainInfoItem {...item} />
		});
	}


	render(){
		const { trainInfo } = this.props;
		if( Array.isArray(trainInfo.trainInfos) && trainInfo.trainInfos.length > 0){
			return(
				<div styleName='trainInfo-container' key='111' >
					<ul styleName="trainInfo-list">
						{this.getTrainItem()}
					</ul>
				</div>
			);
		}else{
			return(
				<div styleName='trainInfo-container' key='2222' >
					<div styleName="list-empty ">没有找到符合条件的车次</div>
				</div>
			);
		}
	}
}






export default TrainInfo;
