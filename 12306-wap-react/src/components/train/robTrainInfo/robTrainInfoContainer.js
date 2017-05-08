import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainInfo.scss';


import trainModel from '../../../http/train/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';


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
    }


    componentDidMount(){
        const { actions ,params } = this.props; 
        actions.requestTrainInfo(trainModel.trainInfoList,{
            arrStationCode: params.toCityCode,
            deptStationCode: params.fromCityCode,
            deptDate: params.detpDate,
        });
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

                <button styleName={submitClass}>确认</button>
                <ModalLoading isVisible={loading} textContent="正在为您加载车次" />
            </div>
        )
    }
}




export default RobTrainInfoContainer;



