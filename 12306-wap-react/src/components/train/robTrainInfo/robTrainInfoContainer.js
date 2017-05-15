import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainInfo.scss';


import trainModel from '../../../http/train/index';
import SessionServer from '../../../server/session/index'

import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';
import { showDialog ,hideDialog } from '../../../components/modal/Dialog';

import RobTrainInfoTab from './robTrainInfoTab';
import RobTrainInfoList from './robTrainInfoList';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainInfoContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            tabType: 0,
            firstTrain: false,
            standbyTrain: false,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleFirstSelect = this.handleFirstSelect.bind(this);
        this.handleStandbySelect = this.handleStandbySelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount(){
        const { actions ,params } = this.props; 
        const robTrainInfo = SessionServer.get('robTicketTrainInfo');
        actions.requestTrainInfo(trainModel.trainInfoList,{
            arrStationCode: params.toCityCode,
            deptStationCode: params.fromCityCode,
            deptDate: params.detpDate,
        });
        if(robTrainInfo){
            this.setState({
                firstTrain:robTrainInfo.firstTrain,
                standbyTrain: robTrainInfo.standbyTrain,
            })
        }
    }


    handleFirstSelect(train){
        const { firstTrain } = this.state;
        //初选
        if(!firstTrain){
            this.setState({
                firstTrain:train,
            });
            return false;
        }
        //反选
        if(firstTrain && firstTrain.trainCode === train.trainCode && train.checked ){
            this.setState({
                firstTrain:false,
            });
            return false;
        }
        //换选
        if(firstTrain && firstTrain.trainCode !== train.trainCode){
            this.setState({
                firstTrain:train,
            });
            return false;
        }
    }


    handleStandbySelect(train){
        let { standbyTrain } = this.state;
        let newFlag = true;
        //初选
        if(!standbyTrain){
            standbyTrain = [];
            standbyTrain.push(train);
            this.setState({
                standbyTrain:standbyTrain,
            });
            return false;
        }
        //反选和累加
        standbyTrain = standbyTrain.filter(function(item){
            if(item.trainCode === train.trainCode){
                newFlag = false;
                return false;
            }
            return item;
        })
        if(newFlag){
            standbyTrain.push(train);
        }
        if(Array.isArray(standbyTrain) && standbyTrain.length === 0){
            standbyTrain = false;
        }
        this.setState({
            standbyTrain:standbyTrain,
        });
    }


    handleTabChange(type){
        const { firstTrain } = this.state;
        if(!firstTrain && type === 1){
            return ModalAlert.show({
                content:'请先选择首选车次',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        this.setState({
            tabType: type,
        });

    }


    handleSubmit(){
        const self = this;
        const { firstTrain ,standbyTrain } = this.state;
        const { push ,params } = this.props;
        const robTrain = {
            firstTrain: firstTrain,
            standbyTrain: standbyTrain,
        };
        if(!standbyTrain){
            return showDialog({
                title:'提示',
                content:'建议您去选择备选车次,可提升抢票成功率',
                leftText:'暂不需要',
                leftClick:function(){
                    hideDialog();
                    SessionServer.set('robTicketTrainInfo',robTrain);
                    push('/train/setRobTicket/'+params.detpDate);
                },
                rightText:'去选择',
                rightClick:function(){
                    hideDialog();
                    self.setState({
                        tabType: 1,
                    });
                },
            });
        }
        SessionServer.set('robTicketTrainInfo',robTrain);
        push('/train/setRobTicket/'+params.detpDate);
    }


    getSelectTrainCode(){
        const { firstTrain, standbyTrain } = this.state;
        if(!firstTrain){
            return null;
        }
        let firstCode = firstTrain.trainCode+'(首选)';
        let standbyCode = [];
        for(let i=0; i<standbyTrain.length ;i++){
            standbyCode.push(standbyTrain[i].trainCode);
        }
        return(
            <div styleName="rob-trainCode">
                已选车次:&nbsp;
                <span>{firstCode}</span>&nbsp;
                {
                    standbyCode.map(function(item){
                        return <span>{item}&nbsp;</span>
                    }) 
                }  
            </div>
        )
    }


    render(){
        const { trainInfo ,loading } = this.props;
        const { tabType ,firstTrain ,standbyTrain }  = this.state;
        const submitClass=classnames({
            'submit':true,
            'submit-disabled': !firstTrain,
        });
        return(
            <div styleName="container">
                <RobTrainInfoTab 
                        onTabChange={this.handleTabChange} 
                        tabType={tabType} 
                />
                <RobTrainInfoList 
                        trainInfo={trainInfo.trainInfos} 
                        tabType={tabType} 
                        firstTrain={firstTrain}
                        standbyTrain={standbyTrain}
                        onFirstSelect={this.handleFirstSelect}
                        onStandbySelect={this.handleStandbySelect}
                />
                { this.getSelectTrainCode() }

                <button onClick={this.handleSubmit} styleName={submitClass}>确认</button>
                <ModalLoading isVisible={loading} textContent="正在为您加载车次" />
            </div>
        )
    }
}




export default RobTrainInfoContainer;



