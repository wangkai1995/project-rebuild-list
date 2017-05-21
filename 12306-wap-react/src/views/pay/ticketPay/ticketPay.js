import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';


import styles from './ticketPay.scss';
import { actions } from './ticketPayRedux';

import TokenServer from '../../../server/token/index';


import Header from '../../../layouts/header/header';
import TicketPayContainer from '../../../components/pay/ticketPay/ticketPayContainer';



@CSSModules(styles,{allowMultiple: true})
class TrainThrough extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { params, pay, payAction  }= this.props;
         var token = TokenServer.getToken();
        return(
            <div styleName="container" >
                <Header title="订单支付" />
                <TicketPayContainer token={token} params={params} {...pay} actions={payAction} />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        pay : state.pay.ticketPay.ticketPay,
    };
},dispatch =>{
    return{
        payAction : bindActionCreators(actions , dispatch),
    };
})(TrainThrough);


