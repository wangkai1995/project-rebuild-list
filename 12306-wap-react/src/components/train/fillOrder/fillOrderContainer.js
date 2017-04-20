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
import TrainfillOrderPublicPassenger from './fillOrderPublicPassenger';
import TrainfillOrderPublicContactsMessage from './fillOrderPublicContactsMessage';
import TrainfillOrderPublicInsurance from './fillOrderPublicInsurance';
import TrainfillOrderPublicTreaty from './fillOrderPublicTreaty';
import TrainfillOrderPublicFooter from './fillOrderPublicFooter';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CommonTrainFillOrder extends Component{
    
    constructor(props){
        super(props);
        this.state={
            contacts:{
                name: '',
                mobile: '',
            },
            insurance:false,
            treatyChecked: true,
        }
        this.contactsNameChange = this.contactsNameChange.bind(this);
        this.contactsMobileChange = this.contactsMobileChange.bind(this);
        this.insuranceChange = this.insuranceChange.bind(this);
        this.treatyChange = this.treatyChange.bind(this);
    }
    

    //初始化请求保险和用户信息
    componentDidMount(){
        const { actions , token } = this.props;
        actions.requestInsuranceInfo(trainModel.trainInsurance);
        actions.requestUserInfo(userModel.userInfo,{
            access_token : token.access_token,
        });
        actions.initTrainInfo( this.initTrainInfo() );
        actions.initTrainPassenger( this.initPassenger() );
    }


    componentWillReceiveProps(nextProps){
        const { userInfo ,insuranceInfo } = nextProps;
        if(nextProps){
            this.setState({
                contacts:{
                    name: userInfo.realName,
                    mobile: userInfo.mobile,
                }
            });
        }
        if(insuranceInfo){
            this.setState({
                insurance:insuranceInfo.insurances[0],
            });
        }
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


    //初始化填充乘客信息
    initPassenger(){
        var passenger = SessionServer.get('trainPassenger');
        return  passenger? passenger : false;
    }


    //联系人姓名修改
    contactsNameChange(name){
        let { contacts } = this.state;
        contacts.name = namel
        this.setState({
            contacts: contacts,
        });
    }


    //联系人电话修改  
    contactsMobileChange(mobile){
        let { contacts } = this.state;
        contacts.mobile = mobile
        this.setState({
            contacts: contacts,
        });
    }

    //选择保险
    insuranceChange(insurance){
        this.setState({
            insurance: insurance,
        });
    }


    //协议改变
    treatyChange(Checked){
        this.setState({
            treatyChecked: Checked,
        });
    }


    render(){
        const { insuranceInfo, userInfo, trainInfo ,passengerInfo } = this.props;
        const { contacts, insurance ,treatyChecked } =this.state; 
        return (
            <div styleName="root-container">
                <TrainfillOrderPublicHeader trainInfo={trainInfo} />
                <div styleName="train-fill-order-container">
                    <TrainfillOrderPublicPassenger  
                                    passengerInfo={passengerInfo} 
                    />
                    <TrainfillOrderPublicContactsMessage 
                                    contacts={contacts}
                                    onNameChange={this.contactsNameChange}
                                    onMobileChange={this.contactsMobileChange} 
                    />
                    <TrainfillOrderPublicInsurance 
                                    onInsuranceChange={this.insuranceChange}
                                    checkedInsurance={insurance} 
                                    insuranceList={insuranceInfo.insurances} 
                    />
                    <TrainfillOrderPublicTreaty 
                                    onTreatyChange={this.treatyChange} 
                                    treatyChecked={treatyChecked} 
                    />
                </div>
                <TrainfillOrderPublicFooter />
                <ModalLoading isVisible={!insuranceInfo || !userInfo} textContent="正在为您加载"  />
            </div>
        );
    }
}





export default CommonTrainFillOrder;




