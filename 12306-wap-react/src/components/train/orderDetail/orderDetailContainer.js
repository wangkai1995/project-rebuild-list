import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './orderDetail.scss';


import trainModel from '../../../http/train/index';
import ModalLoading from '../../../components/modal/loading';


import OrderDetailStatus from './orderDetailStatus';
import OrderDetailTrainInfo from './orderDetailTrainInfo';
import OrderDetailPassenger from './orderDetailPassenger';
import OrderDetailInsurance from './orderDetailInsurance';
import OrderDetailFooterPay from './orderDetailFooterPay';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainOrderDetailContainer extends Component{
    
    constructor(props){
        super(props);
        this.handleResetOrderDetail = this.handleResetOrderDetail.bind(this);
        this.handleQueryStatus = this.handleQueryStatus.bind(this);
        this.handleLockTimeOut = this.handleLockTimeOut.bind(this);
    }
    

    //初始化参数请求车次信息
    componentDidMount(){
        this.handleResetOrderDetail();
    }


    handleResetOrderDetail(){
        const { actions ,params ,token } = this.props; 
        actions.requestTrainOrder(trainModel.trainOrderDetail,{
            orderNo:params.orderNo,
            token: token.access_token,
        });
    }


    //查询状态
    handleQueryStatus(){
        const { params ,token } = this.props;
        const self = this; 
        trainModel.trainOrderStatus({
            orderNo:params.orderNo,
            token: token.access_token,
        }).then(function(data){
            if(data.code === '00000'){
                if( data.data.status === 3 || data.data.status === 11 ){
                    self.handleResetOrderDetail();
                }else if(data.data.status !== 1){
                    self.handleResetOrderDetail();
                }
            }
        })
    }


    //通知服务器超时
    handleLockTimeOut(){
        const { params ,token } = this.props;
        const self = this;  
        trainModel.trainOrderTimeOut({
            orderNo:params.orderNo,
            token: token.access_token,
        }).then(function(data){
            if(data.code === '00000'){
                self.handleResetOrderDetail();
            }
        })
    }


    render(){
        const { loading ,orderDetail } = this.props;
        const containerClass = classnames({
            'container' : true,
            'await-pay' : (orderDetail && (orderDetail.status === 3 || orderDetail.status === 11) ),
        });
        return (
            <div>
                <div styleName={containerClass} >
                    <OrderDetailStatus  
                                onCountDownOver={this.handleResetOrderDetail} 
                                orderDetail={orderDetail}
                                onQuery={this.handleQueryStatus}
                                onTimeout={this.handleLockTimeOut}
                     />
                    <OrderDetailTrainInfo orderDetail={orderDetail} />
                    <OrderDetailPassenger   
                                passengerInfo={orderDetail? orderDetail.passengerInfo : false} 
                                contactMobile={orderDetail? orderDetail.contactMobile : false} 
                    />
                    <OrderDetailInsurance insuranceInfo={orderDetail? orderDetail.insuranceInfo : false} />
                </div>
                <OrderDetailFooterPay orderDetail={orderDetail} />
                <ModalLoading isVisible={loading} textContent="正在为您加载"  />
            </div>  
        );
    }


}






export default TrainOrderDetailContainer;


