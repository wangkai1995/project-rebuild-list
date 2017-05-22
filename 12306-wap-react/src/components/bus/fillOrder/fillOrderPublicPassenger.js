import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import busModel from '../../../http/bus/index';

import SessionServer from '../../../server/session/index';
import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusfillOrderPublicPassenger extends Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { actions} = this.props;
        const busInfo = SessionServer.get('FillOrderBusInfo');
        actions.requestServiceCharge(busModel.busServiceCharge,{
            busFromStation:busInfo.dptStation
        });
    }


    render(){
        const busInfo = SessionServer.get('FillOrderBusInfo');
        const {serviceInfo} = this.props;
        return(
           <div styleName="ticket-price">
                <span styleName="left">暂不支持在线退改签</span>
                <span styleName="right">
                    票价<span styleName="money">￥{busInfo.ticketPrice}</span> |
                    服务费<span styleName="money">￥{serviceInfo.data}</span>
                    <i styleName="cicon icon-que-icon queIcon"></i>                            
                </span>
            </div>
        )
    }
    
}



export default BusfillOrderPublicPassenger;



