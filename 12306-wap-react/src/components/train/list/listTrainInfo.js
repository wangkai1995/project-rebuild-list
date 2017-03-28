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
		const { trainInfos } = this.props.trainInfo;
		return trainInfos.map( function(item){
			return <TrainInfoItem {...item} key={item.trainCode} />
		});
	}


	render(){
		const { trainInfo } = this.props;

		if( Array.isArray(trainInfo.trainInfos) && trainInfo.trainInfos.length > 0){
			return(
				<div styleName='trainInfo-container' >
					<ul styleName="trainInfo-list">
						{this.getTrainItem()}
					</ul>
				</div>
			);
		}else{
			return(
				<div styleName='trainInfo-container' >
					<div styleName="list-empty ">没有找到符合条件的车次</div>
				</div>
			);
		}
	}
}






export default TrainInfo;
