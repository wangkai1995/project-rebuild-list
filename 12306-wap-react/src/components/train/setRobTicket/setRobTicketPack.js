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
class SetRobTicketPack extends Component{

	constructor(props){
		super(props);
		this.handleSelectPack = this.handleSelectPack.bind(this);
	}


	getRobPack(){	
		let { packInfo } = this.props;
		let localPack = SessionServer.get('trainRobPack');
		let checkedPack = false;
		if(!localPack && packInfo){
			let noPack = {
				packId:0,
				packName:"不购买加速包,高峰期出票较慢",
				packPrice:0,
				sort:0,
				status:0,
			}
			packInfo.push(noPack);
			localPack = {
				list : packInfo,
				checked: packInfo[0],
			}
			checkedPack = packInfo[0];
			SessionServer.set('trainRobPack',localPack);
		}else if(localPack){
			checkedPack = localPack.checked;
		}
		
		if(checkedPack){
			return <span styleName="text-overflow">{checkedPack.packName}</span>
		}
	}


	handleSelectPack(){
		const { push } = this.props;
		push('/train/robPack');
	}


	render(){
		return(
			<div styleName='ser-rob-item last-child'>
				<div styleName="item-content" onClick={this.handleSelectPack} >
					<span styleName="title">抢票速度</span>
					<span styleNmae="item-show-content" >
						{this.getRobPack()}
					</span>
					<i styleName="cicon icon-right-icon"></i>
				</div>
				<div styleName="border-buttom no-border"></div>
			</div>
		);
	}
}




export default SetRobTicketPack;



