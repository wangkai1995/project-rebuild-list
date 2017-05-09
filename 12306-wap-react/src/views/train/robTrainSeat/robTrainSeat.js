import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styles from './robTrainSeat.scss';


import SessionServer from '../../../server/session/index'

import Header from '../../../layouts/header/header';
import RobTrainSeatContainer from '../../../components/train/robTrainSeat/robTrainSeatContainer';



@CSSModules(styles,{allowMultiple : true})
class TrainRobTrainSeat extends Component{

    render(){
        const{ push } = this.props;
        const robTrainInfo = SessionServer.get('robTicketTrainInfo');
        return(
            <div styleName="container">
                <Header title="选择坐席" />
                <RobTrainSeatContainer  {...robTrainInfo}  push={push} />
            </div>
        )
    }
}






export default connect( state =>{
},dispatch =>{
    return{
        push : bindActionCreators(push , dispatch),
    }
})(TrainRobTrainSeat);



