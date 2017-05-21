import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import pubilcStyles from '../ticketPay.scss';
import styles from './trainPay.scss';
import icon from '../../../../styles/sprite.css';

import PayModel from '../../../../http/pay/index';

import TrainPayInfo from './trainPayInfo';


@immutableRenderDecorator
@CSSModules(_.merge({},pubilcStyles,styles,icon),{allowMultiple: true})
class TrainPay extends Component{
    
    constructor(props){
        super(props);
    }
	
	 //初始化支付倒计时
    componentDidMount(){
        const { actions ,payInfo ,payCountDown,token } = this.props;
		actions.requestTrainPayCountDown( PayModel.getTrainPayCountDown,{
				order: payInfo.orderNo,
				token: token.access_token,
  		})
    }
    
    render(){
    	const { payInfo ,payCountDown } = this.props;

        return (
            <div>
				<TrainPayInfo payInfo={payInfo} payCountDown={payCountDown}  />
            </div>
        );
    }

}





export default TrainPay;


