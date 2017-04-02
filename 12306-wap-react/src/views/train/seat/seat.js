import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';


import styles from './seat.scss';
import { actions } from './seatRedux';

import Header from '../../../layouts/header/header';
import TrainSeatContainer from '../../../components/train/seat/seatContainer';


@CSSModules(styles,{allowMultiple: true})
class TrainSeat extends Component {
	
	constructor(props){
		super(props);
	}

	render(){
		const { params, seat, seatAction ,push }= this.props;
		
		return(
			<div styleName="seat-container" >
				<Header title="车次详情" />
				<TrainSeatContainer  params={params} actions={seatAction} push={push}  {...seat}  />
			</div>
		);
	}
}



export default connect( state =>{
	return{
		seat : state.train.seat.seat,
	};
},dispatch =>{
	return{
		seatAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(TrainSeat);


