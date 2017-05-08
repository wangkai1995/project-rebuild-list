import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainInfo.scss';

import ModalAlert from '../../../components/modal/Alert';

import RobTrainInfoItem from './robTrainInfoItem';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainInfoList extends Component{
    constructor(props){
        super(props);
        this.handleFirstSelect = this.handleFirstSelect.bind(this);
        this.handleStandbySelect = this.handleStandbySelect.bind(this);
    }


    handleFirstSelect(train){
        const { seatList } = train;
        const { onFirstSelect } = this.props;
        let flag = false;
        for(let i=0 ;i<seatList.length ; i++){
            if( seatList[i].seatNum === '' || seatList[i].seatNum === '0' || seatList[i].showButton === 3 ){
                flag = true;
                break;
            }
        }
        if(!flag){
            return ModalAlert.show({
                    content:'首选车次必须选择允许抢票的车次',
                    onClick:function(){
                        ModalAlert.hide();
                    }
                });
        }
        onFirstSelect(train);
    }


    handleStandbySelect(train){
        const { onStandbySelect ,standbyTrain } = this.props;
        let nowFlag = true;
        for(let i=0; i<standbyTrain.length; i++){
            if(train.trainCode === standbyTrain[i].trainCode){
                nowFlag = false;
                break;
            }
        }
        if(nowFlag && standbyTrain.length +1 > 8){
            return ModalAlert.show({
                content:'最多只能选择8个备选车次',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        onStandbySelect(train);
    }


    getFirstList(){
        const { trainInfo ,firstTrain ,standbyTrain } = this.props;
        const self = this;
        //减少查询损耗
        let standby = [];
        for(let i=0; i<standbyTrain.length ;i++){
            standby.push(standbyTrain[i].trainCode);
        }
        return trainInfo.map(function(item){
            let checked = false;
            //排除备选
            if(standby.indexOf(item.trainCode) > -1){
                return null;
            }
            if(firstTrain && firstTrain.trainCode === item.trainCode){
                checked = true;
            }
            return <RobTrainInfoItem {...item} checked={checked} onSelect={self.handleFirstSelect} />
        });
    }


    getStandbyList(){
        const { trainInfo ,firstTrain ,standbyTrain } = this.props;
        const self = this;
        //减少查询损耗
        let standby = [];
        for(let i=0; i<standbyTrain.length ;i++){
            standby.push(standbyTrain[i].trainCode);
        }
        return trainInfo.map(function(item){
            let checked = false;
            //排除首选
            if(item.trainCode === firstTrain.trainCode){
                return null;
            }
            if(standby.indexOf(item.trainCode) > -1){
                checked = true;
            }
            return <RobTrainInfoItem {...item} checked={checked} onSelect={self.handleStandbySelect} />
        });
    }



    getList(){
        const { tabType ,trainInfo } = this.props;
        if(trainInfo){
            switch(tabType){
                case 0:
                    return this.getFirstList();
                case 1:
                    return this.getStandbyList();
                default:
                    return null;
            }
        }
    }



    render(){
        const { firstTrain } = this.props;
        const listClass=classnames({
            'rob-trainInfo-list': true,
            'code-list': firstTrain,
        })
        return(
            <div styleName={listClass} >
                    {this.getList()}
            </div>
        );
    }

}





export default RobTrainInfoList;


