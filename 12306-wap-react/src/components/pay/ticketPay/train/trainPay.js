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
import AliPayServer from '../../../../server/pay/AliPay/index';

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
        this.onPaySuccess = this.onPaySuccess.bind(this);
    }
	

	//初始化支付倒计时
    componentDidMount(){
        const { actions ,payInfo ,payCountDown,token } = this.props;
        //初始化判断是否支付成功
        this.initTicketStatus();
        //初始化判断微信公众号支付URL
        WechatPayServer.initValidCode();
		actions.requestTrainPayCountDown( PayModel.getTrainPayCountDown,{
				order: payInfo.orderNo,
				token: token.access_token,
  		})
    }

    
    //初始化判断是否支付成功
    initTicketStatus(){
        const { payInfo,token } = this.props;
        const self = this;
        switch(payInfo.model){
            case 'train':
                PayModel.trainState({
                    order: payInfo.orderNo,
                    token: token.access_token
                }).then(function(state){
                    if(state.code === '00000'){
                        if( state.data.status === 4 || state.data.status === 14 ){
                            ModalAlert.show({
                                content:'支付成功!',
                                onClick:function(){
                                    ModalAlert.hide();
                                    self.onPaySuccess();
                                }
                            });
                        }
                    }
                },function(error){
                    console.log('出错了');
                });
                break;
            case 'bus':
                PayModel.busState({
                    order: payInfo.orderNo,
                    token: token.access_token
                }).then(function(state){
                    if(state.code === '00000'){
                        if(state.data === 1){
                            ModalAlert.show({
                                content:'支付成功!',
                                onClick:function(){
                                    ModalAlert.hide();
                                    self.onPaySuccess();
                                }
                            });
                        }
                    }
                },function(error){
                    console.log('出错了');
                });
                break;
        }
    }

    
    
    //支付成功回调
    //汽车票未做
    onPaySuccess(){
        const { payInfo ,push } = this.props;
        switch(payInfo.model){
            case 'train':
                push('/train/orderDetail/'+payInfo.orderNo);
                break;
            case 'bus':
                break;
        }

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
        let { payInfo } = this.props;
        payInfo.model = this.props.params.model;
        switch(type){
            case 0:
                WechatPayServer.pay(payInfo,this.onPaySuccess);
                break;
            case 1:
                //支付宝
                AliPayServer.pay(payInfo);
                break;
            default:
                WechatPayServer.pay(payInfom,this.onPaySuccess);
                break;
        }
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


