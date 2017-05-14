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
		const { robSeatInfo } = this.props;
		const { firstSeat, standbySeat } = robSeatInfo;
		if(!robSeatInfo){
			return <span>建议多选</span>
		}
        let firstName = firstSeat.seatName+'(首选)';
        let standbyName = [];
        for(let i=0; i<standbySeat.length ;i++){
            standbyName.push(standbySeat[i].seatName);
        }
        return(
            <div styleName="content text-overflow">
                <span>{firstName}</span>&nbsp;
                {
                    standbyName.map(function(item){
                        return <span>{item}&nbsp;</span>
                    }) 
                }  
            </div>
        )
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


