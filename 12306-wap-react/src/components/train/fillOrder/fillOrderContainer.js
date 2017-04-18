import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './fillOrder.scss';


import SessionServer from '../../../server/session/index';
import trainModel from '../../../http/train/index';
import userModel from '../../../http/user/index';


import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


import TrainfillOrderPublicHeader from './fillOrderPublicHeader';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CommonTrainFillOrder extends Component{
    
    constructor(props){
        super(props);
    }
    

    //初始化请求保险和用户信息
    componentDidMount(){
        const { actions , token } = this.props;
        actions.requestInsuranceInfo(trainModel.trainInsurance);
        actions.requestUserInfo(userModel.userInfo,{
            access_token : token.access_token,
        });
        actions.initTrainInfo( this.initTrainInfo() );
    }

    
    //初始化填充车次信息
    initTrainInfo(){
        const { push ,actions } = this.props;
        var trainInfo = SessionServer.get('FillOrderTrainInfo');
        if(!trainInfo){
            ModalAlert.show({
                content:'错误的订单,车次信息不存在!',
                onClick:function(){
                    ModalAlert.hide();
                    push('/train');
                }
            });
        }
        return trainInfo;
    }


    render(){
        const { insuranceInfo, userInfo, trainInfo } = this.props;
        return (
            <div styleName="root-container">
                <TrainfillOrderPublicHeader trainInfo={trainInfo} />
                <ModalLoading isVisible={!insuranceInfo || !userInfo} textContent="正在为您加载"  />
            </div>
        );
    }


}






export default CommonTrainFillOrder;

