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
class SetRobTicketSeat extends Component{

	constructor(props){
		super(props);
	}


	getRobSeat(){
		return <span>建议多选</span>
	}


	render(){
		const { onSelectSeat } = this.props;
		return(
			<div styleName='ser-rob-item'>
				<div styleName="item-content" onClick={onSelectSeat}>
					<span styleName="title">选择坐席</span>
					<span styleNmae="item-show-content" >
						{this.getRobSeat()}
					</span>
					<i styleName="cicon  icon-right-icon"></i>
				</div>
				<div styleName="border-buttom no-border"></div>
			</div>
		);
	}
}





export default SetRobTicketSeat;


