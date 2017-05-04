import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './orderDetail.scss';
import icon from '../../../styles/sprite.css';


import * as DateFilter from '../../../filter/Date';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class OrderDetailTrainInfo extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        const { orderDetail } = this.props;
        if(!orderDetail){
            return null;
        }

        return (
            <div styleName="trainInfo"> 
                <h3>{DateFilter.getFormat(orderDetail.deptDate,'MM月dd日')}&nbsp;{DateFilter.getWeek(orderDetail.deptDate)}</h3>
                <div styleName="train-info">
                    <div styleName="train-info-from">
                        <p styleName="train-info-city">{orderDetail.deptStationName}</p>
                        <p styleName="train-info-time">{orderDetail.deptTime}</p>
                    </div>
                    <div styleName="train-info-info">
                        <Link to={`/train/through/${orderDetail.deptDate}/${orderDetail.trainCode}`} >
                            <p>{orderDetail.trainCode}</p>
                            <p>
                                <i styleName="cicon icon-train-through-arrow-black"></i>
                            </p>
                            <p>{orderDetail.runTime}</p>
                        </Link>
                    </div>
                    <div styleName="train-info-to">
                        <p styleName="train-info-city">{orderDetail.arrStationName}</p>
                        <p styleName="train-info-time">{orderDetail.arrTime}</p>
                    </div>
                </div>
                <div styleName="change">
                    退改签说明
                </div>
            </div>
        );
    }


}





export default OrderDetailTrainInfo;

