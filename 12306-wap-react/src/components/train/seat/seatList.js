import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './seat.scss';


import SeatItem from './seatItem';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SeatList extends Component{
	
	constructor(props){
		super(props);
	}

	getSeatItem(){
		const { seatList , trainStatus , onCheckSeat } = this.props;
		if( seatList && seatList.length > 0){
			return seatList.map(function(seat){
				return  <SeatItem 
								{...seat}
							 	trainStatus={trainStatus}
							 	onCheckSeat={onCheckSeat}
						 />
			});
		}
	}

	render(){
		return (
			<div styleName="seat-list">
				<ul>
					{ this.getSeatItem() }
				</ul>
			</div>
		);
	}

}




export default SeatList;
