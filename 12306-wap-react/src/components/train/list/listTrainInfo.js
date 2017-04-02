import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';

import TrainInfoItem from './listTrainInfoItem';

import ModalLoading from '../../../components/modal/loading';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainInfo extends Component{
	
	constructor(props){
		super(props);
	}


	getTrainItem(){
		const { trainInfos } = this.props.trainInfo;
		const { onCheckedTrain } = this.props;
		return trainInfos.map( function(item){
			return <TrainInfoItem onCheckTrain={onCheckedTrain} {...item} key={item.trainCode} />
		});
	}



	render(){
		const { trainInfo,isLoading } = this.props;

		if( Array.isArray(trainInfo.trainInfos) && trainInfo.trainInfos.length > 0){
			return(
				<div styleName='trainInfo-container' >
					<ul styleName="trainInfo-list">
						{this.getTrainItem()}
					</ul>
					<ModalLoading isVisible={isLoading} textContent="正在为您加载车次" />
				</div>
			);
		}else if(Array.isArray(trainInfo.trainInfos) && trainInfo.trainInfos.length === 0){
			return(
				<div styleName='trainInfo-container' >
					<div styleName="list-empty ">没有找到符合条件的车次</div>
				</div>
			);
		}else{
			<ModalLoading isVisible={true} textContent="正在为您加载车次" />
		}
	}
}






export default TrainInfo;
