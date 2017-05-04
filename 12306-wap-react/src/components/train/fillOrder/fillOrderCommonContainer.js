import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './fillOrder.scss';


import SessionServer from '../../../server/session/index';
import TokenServer from '../../../server/token/index';
import trainModel from '../../../http/train/index';
import userModel from '../../../http/user/index';


import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';
import ModalDialog from '../../../components/modal/Dialog';

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
            insurance:false,
            treatyChecked: true,
            contacts: false,
        }
        this.contactsChange = this.contactsChange.bind(this);
        this.insuranceChange = this.insuranceChange.bind(this);
        this.treatyChange = this.treatyChange.bind(this);
        this.passengersChange = this.passengersChange.bind(this);
        this.handleBuyTicketSubmit = this.handleBuyTicketSubmit.bind(this);
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

    //更新保险和联系人
    //查询是否登录12306
    //查询是否提交成功
    //查询是否取消成功
    //查询错误
    componentWillReceiveProps(nextProps){
        const { userInfo ,insuranceInfo  ,orderNo ,Login12306 ,cancelFlag ,actions } = nextProps;
        const { insurance ,contacts } = this.state;

        if(Login12306){
            TokenServer.set12306();
            this.handleBuyTicketSubmit();
            return false;
        }

        if(cancelFlag){
            //这里取消订单在下单有延时加300MS延时在提交订单
            var self = this;
            setTimeout(function(){
                console.log('dddddddd');
                self.handleBuyTicketSubmit();
            },300);
            return false;
        }

        if(!contacts || !insurance){
            let localContacts = SessionServer.get('fillorderContacts');
            if(insuranceInfo){
                this.setState({
                    insurance:insuranceInfo.insurances[0],
                });
            }
            if(userInfo && !contacts){
                let setContacts; 
                if(localContacts){
                    setContacts = localContacts;
                }else{
                    setContacts ={
                        name: userInfo.realName,
                        mobile: userInfo.mobile,
                    }
                }
                this.setState({
                    contacts: setContacts,
                });
            }
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

    //乘客改变
    passengersChange(){
        const { actions } = this.props;
        actions.initTrainPassenger( this.initPassenger() );
    }

    //联系人修改
    contactsChange(contacts){
        this.setState({
            contacts: contacts,
        });
        SessionServer.set('fillorderContacts',contacts);
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

    //判断按钮是否可以提交
    isDisable(){
        const { treatyChecked ,contacts } = this.state;
        const { passengerInfo } = this.props;

        if(!passengerInfo || !treatyChecked ||!contacts  || !contacts.name || !contacts.mobile ){
            return true 
        }

        return false;
    }

    //购票提交
    handleBuyTicketSubmit(user12306){
        const { actions ,token ,trainInfo ,passengerInfo } = this.props;
        const { insurance ,contacts } = this.state;
        if(user12306){
            user12306.access_token = token.access_token;
            actions.request12306Login(userModel.login12306,user12306);
            return false;
        }
        let tokens = TokenServer.getToken();
        var submitData ={
            deptStationCode: trainInfo.deptStationCode,
            arrStationCode: trainInfo.arrStationCode,
            trainCode: trainInfo.trainCode,
            deptDate: trainInfo.deptDate,
            seatPrice: trainInfo.checkedSeat.seatPrice,
            runTime: trainInfo.runTime,
            deptTime: trainInfo.deptTime,
            usingTrainAccount: tokens.access_12306? true : false,
            trainZWCode: trainInfo.checkedSeat.seatCode,
            source: trainInfo.source,
        };
        submitData.contactsInfo={
            contactEmail: '',
            contactMobile: contacts.mobile,
            contactName: contacts.name,
            contactPassportNo: '',
            contactPassportType: '1',
        };
        submitData.passengers=[];
        passengerInfo.forEach(function(item){
            let buff = {};
            if(item.childer){
                buff.passengerName = item.userName;
                buff.passportNo= item.adult.passportId;
                buff.trainTicketType = '2';
                buff.birthday = item.birthday;
            }else{
                buff.passengerName = item.userName;
                buff.passportNo= item.passportId;
                buff.trainTicketType = '1';
                buff.birthday = null;
            }
            buff.passengerMobile = null;
            buff.passportTypeId = '1';
            buff.isPassengerSave = false;
            buff.sex = 'M';
            if(insurance){
                buff.policyProductNo = insurance.productNo ;
                buff.insurancePrice = insurance.price ;
            }
            submitData.passengers.push(buff);
        });

        actions.requestSubmit(trainModel.trainBuyTicket,{
            token: token.access_token,
            data: submitData,
        });
    }


    //去支付未支付订单
    handlePayPrevOrder(order){
        console.log(order,'跳转订单详情');
    }


    //重新下单
    handleResetSubmit(orderNo){
        const { actions ,token } = this.props;
        actions.requestCancelOrder(trainModel.trainCancelOrder,{
            access_token: token.access_token,
            orderNo: orderNo,
        });
    }


    //错误显示组件
    getErrorComponent(){
        const { error ,errorCode ,errorOrder ,actions } = this.props;
        if(!error){
            return null;
        }
        if(errorCode === '00005'){
            return  <ModalDialog 
                        isVisible={true} 
                        title="提示" 
                        content={error}  
                        leftText="去支付此订单"
                        rightText="重新下单"
                        leftClick={ this.handlePayPrevOrder.bind(this,errorOrder) }
                        rightClick={ this.handleResetSubmit.bind(this,errorOrder) }
                    />
        }else{
            return <ModalDialog 
                        isVisible={true} 
                        title="提示" 
                        content={error}  
                        buttonText="确定"
                        buttonClick={actions.resetError}
                    />
        }
    }



    render(){
        const { insuranceInfo, userInfo, trainInfo ,passengerInfo ,push ,type ,loading  } = this.props;
        const { insurance ,treatyChecked ,contacts } =this.state;

        return (
            <div styleName="root-container">
                <TrainfillOrderPublicHeader trainInfo={trainInfo} />
                <div styleName="train-fill-order-container">
                    <TrainfillOrderPublicPassenger
                                    onPassengerChange={this.passengersChange}  
                                    passengerInfo={passengerInfo} 
                                    push={push}
                    />
                    <TrainfillOrderPublicContactsMessage 
                                    contacts={contacts}
                                    onContactsChange={this.contactsChange}
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
                <TrainfillOrderPublicFooter
                                    isDisable={this.isDisable()}
                                    loading={loading}
                                    type={type}
                                    passengerInfo={passengerInfo} 
                                    insurance={insurance}  
                                    ticketPrice={trainInfo? trainInfo.checkedSeat.seatPrice : trainInfo}
                                    onBuySubmit={this.handleBuyTicketSubmit}
                                    
                />
                <ModalLoading isVisible={!insuranceInfo || !userInfo} textContent="正在为您加载"  />
                {this.getErrorComponent()}
            </div>
        );
    }

}





export default CommonTrainFillOrder;




