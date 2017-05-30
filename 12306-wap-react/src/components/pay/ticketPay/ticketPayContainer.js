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
        this.state = {
            payLoading:false,
        };
        this.handlePayLoading = this.handlePayLoading.bind(this);
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
    

    //支付loading状态
    handlePayLoading(){
        this.setState({
            payLoading:true,
        });
    }


    getPayModel(){
        const { params ,payInfo } = this.props;
        if(payInfo){
           switch(params.model){
                case 'train':
                    return <TrainPay {...this.props } onPayStart={this.handlePayLoading} />;
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
        const { payLoading } = this.state;
        const loadingText = payLoading? '正在获取支付信息': '正在为您加载';
        return (
            <div styleName="container">
                { this.getPayModel() }
                 <ModalLoading isVisible={loading || payLoading} textContent={loadingText} />
            </div>
        );
    }

}





export default TicketPayContainer;



