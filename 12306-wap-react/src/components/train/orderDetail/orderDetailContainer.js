import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './orderDetail.scss';



import TokenServer from '../../../server/token/index';
import trainModel from '../../../http/train/index';
import ModalLoading from '../../../components/modal/loading';


import OrderDetailStatus from './orderDetailStatus';
import OrderDetailTrainInfo from './orderDetailTrainInfo';
import OrderDetailPassenger from './orderDetailPassenger';
import OrderDetailInsurance from './orderDetailInsurance';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainOrderDetailContainer extends Component{
    
    constructor(props){
        super(props);
    }
    

    //初始化参数请求车次信息
    componentDidMount(){
        const { actions ,params } = this.props; 
        var token = TokenServer.getToken();
        actions.requestTrainOrder(trainModel.trainOrderDetail,{
            orderNo:params.orderNo,
            token: token.access_token,
        });
    }



    render(){
        const { loading ,orderDetail } = this.props;
        return (
            <div styleName="container">
                <OrderDetailStatus orderDetail={orderDetail} />
                <OrderDetailTrainInfo orderDetail={orderDetail} />
                <OrderDetailPassenger   
                            passengerInfo={orderDetail? orderDetail.passengerInfo : false} 
                            contactMobile={orderDetail? orderDetail.contactMobile : false} 
                />
                <OrderDetailInsurance insuranceInfo={orderDetail? orderDetail.insuranceInfo : false} />
                <ModalLoading isVisible={loading} textContent="正在为您加载"  />
            </div>
        );
    }


}






export default TrainOrderDetailContainer;


