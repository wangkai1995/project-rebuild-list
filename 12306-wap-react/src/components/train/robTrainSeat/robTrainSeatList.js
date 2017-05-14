import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainSeat.scss';

import ModalAlert from '../../../components/modal/Alert';

import RobTrainSeatItem from './robTrainSeatItem';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainSeatList extends Component{
    constructor(props){
        super(props);
        this.handleFirstSelect = this.handleFirstSelect.bind(this);
        this.handleStandbySelect = this.handleStandbySelect.bind(this);
    }
        
    //车次价格修正
    seatPriceValida(train,seat){
        //如果是硬卧
        if(seat.seatCode === '3' || seat.seatName === '硬卧'){
            seat.seatPrice = train.ywXiaPrice;
        }

        //如果是软卧
        if(seat.seatCode === '4' || seat.seatName === '软卧'){
             seat.seatPrice = train.rwXiaPrice;
        }
        return seat;
    }
    

    getFirstList(){
        const self = this;
        const { firstSeat ,trainInfo } = this.props;
        const { firstTrain } = trainInfo;
        if(firstTrain){
            return firstTrain.seatList.map(function(item){
                var num = isNaN(parseInt(item.seatNum)) ? 0 : parseInt(item.seatNum);
                var checked = false;
                //首选可以抢票车次
                if(num === 0 || item.showButton === 3){
                    //价格修正
                    let seat = self.seatPriceValida(firstTrain,item);  
                    if(firstSeat.seatCode == seat.seatCode){
                        checked = true;
                    }
                    return <RobTrainSeatItem  {...seat} checked={checked} onSelect={self.handleFirstSelect} /> 
                }
            })
        }
    }


    getStandbyList(){
        const self = this;
        const { standbySeat ,trainInfo } = this.props;
        const { standbyTrain } = trainInfo;
        if(Array.isArray(standbyTrain) && standbyTrain.length > 0){
            //获取全部坐席并且坐席去重以及修正价格
            let render = [];
            let seatBuff = {};
            for(let i=0; i<standbyTrain.length ;i++){
                standbyTrain[i].seatList.forEach(function(item){
                    var seat =  self.seatPriceValida(standbyTrain[i],item);
                    if(!seatBuff[seat.seatCode]){
                        seatBuff[seat.seatCode] = seat;
                    }else{
                        //取价格最高的
                        let prevPrice = isNaN(parseFloat(seatBuff[seat.seatCode].seatPrice)) ? 0 : parseFloat(seatBuff[seat.seatCode].seatPrice);
                        let currPrice = isNaN(parseFloat(seat.seatPrice)) ? 0 : parseFloat(seat.seatPrice);
                        if(currPrice > prevPrice){
                            seatBuff[seat.seatCode] = seat;
                        }
                    }
                })
            }
            //得到正确的坐席渲染数据
            for(let key in seatBuff){
                render.push(seatBuff[key]);
            }
            //减少查询损耗
            let standby = [];
            for(let i=0; i<standbySeat.length ;i++){
                standby.push(standbySeat[i].seatCode);
            }
            return render.map(function(item){
                var checked = false;
                if(standby.indexOf(item.seatCode) > -1){
                    checked = true;
                }
                return <RobTrainSeatItem  {...item} checked={checked} onSelect={self.handleStandbySelect} /> 
            })
        }
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


    handleFirstSelect(seat){
        const { onFirstSelect } = this.props;
        onFirstSelect(seat);
    }



    handleStandbySelect(seat){
        const { onStandbySelect ,standbySeat } = this.props;
        let nowFlag = true;
        for(let i=0; i<standbySeat.length; i++){
            if(seat.seatCode === standbySeat[i].seatCode){
                nowFlag = false;
                break;
            }
        }
        if(nowFlag && standbySeat.length +1 > 8){
            return ModalAlert.show({
                content:'最多只能选择8个备选坐席',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        onStandbySelect(seat);
    }


    render(){
        const { firstSeat } = this.props;
        const listClass=classnames({
            'rob-trainseat-list': true,
            'code-list': firstSeat,
        })
        return(
            <div styleName={listClass} >
                    {this.getList()}
            </div>
        );
    }

}





export default RobTrainSeatList;


