import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './robTrainInfo.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class RobTrainInfoTab extends Component{
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
            <div styleName="train-info-tab">
                <h3>可以选择一个首选车次和8个备选车次,多选可增加成功率</h3>
                <div styleName="tab-info">
                    <a styleName={firstClass} onClick={ ()=>{onTabChange(0)} } >首选车次</a>
                    <a styleName={standbyClass} onClick={ ()=>{onTabChange(1)} } >备选车次</a>
                    <p styleName={borderClass} ></p>
                </div>
            </div>
        );
    }
}









export default RobTrainInfoTab;


