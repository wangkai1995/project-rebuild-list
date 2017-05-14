import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainSeat.scss';


import SessionServer from '../../../server/session/index'

import ModalAlert from '../../../components/modal/Alert';

import RobTrainSeatTab from './robTrainSeatTab';
import RobTrainSeatList from './robTrainSeatList';




@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainSeatContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            tabType: 0,
            robTrainInfo: false,
            firstSeat: false,
            standbySeat: false,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleFirstSelect = this.handleFirstSelect.bind(this);
        this.handleStandbySelect = this.handleStandbySelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount(){
        let robTrainInfo = SessionServer.get('robTicketTrainInfo');
        if(robTrainInfo){
            this.setState({
                robTrainInfo: robTrainInfo,
            })
        }else{
             ModalAlert.show({
                content:'请先选择抢票车次',
                onClick:function(){
                    ModalAlert.hide();
                    window.history.back();
                }
            });
        }
    }
    


    handleTabChange(type){
        const { firstSeat } = this.state;
        if(!firstSeat && type === 1){
            return ModalAlert.show({
                content:'请先选择首选坐席',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        this.setState({
            tabType: type,
        });
    }


    handleFirstSelect(seat){
        const { firstSeat } = this.state;
        //初选
        if(!firstSeat){
            this.setState({
                firstSeat:seat,
            });
            return false;
        }
        //反选
        if(firstSeat && firstSeat.seatCode === seat.seatCode && seat.checked ){
            this.setState({
                firstSeat:false,
            });
            return false;
        }
        //换选
        if(firstSeat && firstSeat.seatCode !== seat.seatCode){
            this.setState({
                firstSeat:seat,
            });
            return false;
        }
    }


    handleStandbySelect(seat){
        let { standbySeat} = this.state;
        let newFlag = true;
        //初选
        if(!standbySeat){
            standbySeat = [];
            standbySeat.push(seat);
            this.setState({
                standbySeat:standbySeat,
            });
            return false;
        }
        //反选和累加
        standbySeat = standbySeat.filter(function(item){
            if(item.seatCode === seat.seatCode){
                newFlag = false;
                return false;
            }
            return item;
        })
        if(newFlag){
            standbySeat.push(seat);
        }
        if(Array.isArray(standbySeat) && standbySeat.length === 0){
            standbySeat = false;
        }
        this.setState({
            standbySeat:standbySeat,
        });
    }


    handleSubmit(){
        const { firstSeat ,standbySeat } = this.state;
        const { push } = this.props;
        const robSeat = {
            firstSeat: firstSeat,
            standbySeat: standbySeat,
        };
        SessionServer.set('robTicketSeatInfo',robSeat);
        window.history.back();
    }


    getSelectSeatName(){
        const { firstSeat, standbySeat } = this.state;
        if(!firstSeat){
            return null;
        }
        let firstName = firstSeat.seatName+'(首选)';
        let standbyName = [];
        for(let i=0; i<standbySeat.length ;i++){
            standbyName.push(standbySeat[i].seatName);
        }
        return(
            <div styleName="rob-SeatCode">
                已选车次:&nbsp;
                <span>{firstName}</span>&nbsp;
                {
                    standbyName.map(function(item){
                        return <span>{item}&nbsp;</span>
                    }) 
                }  
            </div>
        )
    }


    render(){
        const { tabType ,robTrainInfo ,firstSeat,standbySeat }  = this.state;
         const submitClass=classnames({
            'submit':true,
            'submit-disabled': !firstSeat,
        });
        return(
            <div styleName="container">
                <RobTrainSeatTab 
                        onTabChange={this.handleTabChange} 
                        tabType={tabType} 
                />
                <RobTrainSeatList 
                        trainInfo={robTrainInfo} 
                        tabType={tabType} 
                        firstSeat={firstSeat}
                        standbySeat={standbySeat}
                        onFirstSelect={this.handleFirstSelect}
                        onStandbySelect={this.handleStandbySelect}
                />
                { this.getSelectSeatName() }
                <button onClick={this.handleSubmit} styleName={submitClass}>确认</button>
            </div>
        )
    }
}






export default RobTrainSeatContainer;




