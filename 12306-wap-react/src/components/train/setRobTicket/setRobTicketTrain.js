import React ,{ Component ,PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './setRobTicket.scss';
import icon from '../../../styles/sprite.css';






@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SetRobTicketTrain extends Component{

	constructor(props){
		super(props);
	}

	

	getRobTrain(){
		const { robTrainInfo } = this.props;
		const { firstTrain, standbyTrain } = robTrainInfo;
		if(!robTrainInfo){
			return <span>建议多选</span>
		}
        let firstCode = firstTrain.trainCode+'(首选)';
        let standbyCode = [];
        for(let i=0; i<standbyTrain.length ;i++){
            standbyCode.push(standbyTrain[i].trainCode);
        }
        return(
            <div styleName="content text-overflow">
                <span>{firstCode}</span>&nbsp;
                {
                    standbyCode.map(function(item){
                        return <span>{item}&nbsp;</span>
                    }) 
                }  
            </div>
        )
		
	}
	
	

	render(){
		const { onSelectTrain } = this.props;
		return(
			<div styleName='ser-rob-item'>
				<div styleName="item-content" onClick={onSelectTrain}>
					<span styleName="title">选择车次</span>
					<span styleNmae="item-show-content" >
						{this.getRobTrain()}
					</span>
					<i styleName="cicon icon-right-icon"></i>
				</div>
				<div styleName="border-buttom"></div>
			</div>
		);
	}
}




export default SetRobTicketTrain;


