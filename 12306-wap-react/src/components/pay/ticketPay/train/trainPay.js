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
import TrainPaySelect from './trainPaySelect';


@immutableRenderDecorator
@CSSModules(_.merge({},pubilcStyles,styles,icon),{allowMultiple: true})
class TrainPay extends Component{
    
    constructor(props){
        super(props);
        this.state={
            type:0,
        }
        this.HandleSelectPayMethod = this.HandleSelectPayMethod.bind(this);
    }
	

	//初始化支付倒计时
    componentDidMount(){
        const { actions ,payInfo ,payCountDown,token } = this.props;
		actions.requestTrainPayCountDown( PayModel.getTrainPayCountDown,{
				order: payInfo.orderNo,
				token: token.access_token,
  		})
    }

    
    
    HandleSelectPayMethod(type){
        this.setState({
            type:type,
        });
    }


    
    render(){
    	const { payInfo ,payCountDown } = this.props;
        const { type } = this.state;
        return (
            <div>
				<TrainPayInfo payInfo={payInfo} payCountDown={payCountDown}  />
                <TrainPaySelect defaultType={type} onMethodSelect={this.HandleSelectPayMethod} />
            </div>
        );
    }

}






export default TrainPay;


