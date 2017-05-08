import React ,{ Component ,PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './setRobTicket.scss';
import icon from '../../../styles/sprite.css';


import SessionServer from '../../../server/session/index'



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SetRobTicketTrain extends Component{

	constructor(props){
		super(props);
	}


	componentDidMount(){
	}
	

	getRobTrain(){
		return <span>建议多选</span>
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


