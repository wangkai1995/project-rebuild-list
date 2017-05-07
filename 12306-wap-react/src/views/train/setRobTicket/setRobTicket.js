import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';


import styles from './setRobTicket.scss';
import { actions } from './setRobTicketRedux';

import TokenServer from '../../../server/token/index';
import localServer from '../../../server/local/index'

import Header from '../../../layouts/header/header';
import TrainSetRobTicketContainer from '../../../components/train/setRobTicket/setRobTicketContainer';



@CSSModules(styles,{allowMultiple: true})
class TrainSetRobTicket extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { params, setRobTicket, setRobTicketlAction ,push  }= this.props;
        var token = TokenServer.getToken();
        let fromCity = localServer.get('train.fromCity');
        let toCity = localServer.get('train.toCity');
        setRobTicket.fromCityName = fromCity? fromCity.cityName : '深圳';
        setRobTicket.fromCityCode = fromCity? fromCity.cityCode : 'SZQ';
        setRobTicket.toCityName = toCity? toCity.cityName : '北京';
        setRobTicket.toCityCode = toCity? toCity.cityCode : 'BJP';

        return(
            <div styleName="container" >
                <Header title="车次详情" />
                <TrainSetRobTicketContainer push={push}  token={token}  params={params} actions={setRobTicketlAction} {...setRobTicket} />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        setRobTicket : state.train.setRobTicket.setRobTicket,
    };
},dispatch =>{
    return{
        setRobTicketlAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    };
})(TrainSetRobTicket);

  



