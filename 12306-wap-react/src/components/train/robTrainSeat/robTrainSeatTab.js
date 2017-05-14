import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainSeat.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainSeatTab extends Component{
    constructor(props){
        super(props);
    }



    render(){
        const { tabType ,onTabChange } = this.props;
        const firstClass=classnames({
            'active': tabType === 0,
        });
        const standbyClass=classnames({
            'active': tabType === 1,
        });
        const borderClass=classnames({
            'tab-border' : true,
            'standby': tabType === 1,
        });
        return(
            <div styleName="train-seat-tab">
                <div styleName="title">
                    <span>多选可增加抢票成功率,先按照价格最高的坐席收费,出票后按实际情况退还差额,</span>
                </div>
                <div styleName="tab-info">
                    <a styleName={firstClass} onClick={ ()=>{onTabChange(0)} } >首选坐席</a>
                    <a styleName={standbyClass} onClick={ ()=>{onTabChange(1)} } >备选坐席</a>
                    <p styleName={borderClass} ></p>
                </div>
            </div>
        );
    }
}









export default RobTrainSeatTab;


