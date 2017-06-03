import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './ticketPay.scss';

import PayModel from '../../../http/pay/index';
import SessionServer from '../../../server/session/index';

import ModalAlert from '../../../components/modal/Alert';
import ModalLoading from '../../../components/modal/loading';

import TrainPay from './train/trainPay';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TicketPayContainer extends Component{
    
    constructor(props){
        super(props);
    }
    
    //初始化获取支付订单信息
    componentDidMount(){
        const { actions ,params } = this.props;
        var payInfo = SessionServer.get(params.model+'PayInfo');
        if(payInfo){
            actions.initPayInfo(payInfo);
        }else{
            ModalAlert.show({
                content:'错误的订单信息!',
                onClick:function(){
                    ModalAlert.hide();
                    window.history.back();
                }
            });
        }
    }
    


    getPayModel(){
        const { params ,payInfo ,push } = this.props;
        if(payInfo){
           switch(params.model){
                case 'train':
                    return <TrainPay {...this.props } push={push} />;
                case 'bus':
                    return null;
                default:
                    return ModalAlert.show({
                        content:'错误的订单!',
                        onClick:function(){
                            ModalAlert.hide();
                            window.history.back();
                        }
                    });
            } 
        }
    }
    



    render(){
        const { loading } = this.props;
        return (
            <div styleName="container">
                { this.getPayModel() }
                 <ModalLoading isVisible={loading} textContent='正在为您加载' />
            </div>
        );
    }

}





export default TicketPayContainer;



