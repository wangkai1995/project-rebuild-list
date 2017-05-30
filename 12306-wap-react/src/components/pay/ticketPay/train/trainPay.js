import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import pubilcStyles from '../ticketPay.scss';
import styles from './trainPay.scss';
import icon from '../../../../styles/sprite.css';

import PayModel from '../../../../http/pay/index';
import WechatPayServer from '../../../../server/pay/weChat/index';


import TrainPayInfo from './trainPayInfo';
import TrainPaySelect from './trainPaySelect';



@immutableRenderDecorator
@CSSModules(_.merge({},pubilcStyles,styles,icon),{allowMultiple: true})
class TrainPay extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            type:0,
        };
        this.HandleSelectPayMethod = this.HandleSelectPayMethod.bind(this);
        this.HandleSubmitPay = this.HandleSubmitPay.bind(this);
    }
	

	//初始化支付倒计时
    componentDidMount(){
        const { actions ,payInfo ,payCountDown,token } = this.props;
		actions.requestTrainPayCountDown( PayModel.getTrainPayCountDown,{
				order: payInfo.orderNo,
				token: token.access_token,
  		})
    }

    
    //选择支付方式
    HandleSelectPayMethod(type){
        this.setState({
            type:type,
        });
    }


    //提交支付
    HandleSubmitPay(){
        const { type } = this.state;
        let { payInfo ,onPayStart } = this.props;
        payInfo.model = this.props.params.model;
        switch(type){
            case 0:
                WechatPayServer.pay(payInfo);
                break;
            case 1:
                //支付宝
                break;
            default:
                WechatPayServer.pay(payInfo);
                break;
        }
        onPayStart();
    }


    
    render(){
    	const { payInfo ,payCountDown } = this.props;
        const { type } = this.state;
        return (
            <div>
				<TrainPayInfo payInfo={payInfo} payCountDown={payCountDown}  />
                <TrainPaySelect defaultType={type} onMethodSelect={this.HandleSelectPayMethod} />
                <div styleName="submit">
                    <button styleName="pay-btn" onClick={this.HandleSubmitPay}>确定</button>
                </div>
            </div>
        );
    }

}






export default TrainPay;


