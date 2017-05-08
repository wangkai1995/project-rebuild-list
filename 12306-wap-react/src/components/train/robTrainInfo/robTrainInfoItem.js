import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './robTrainInfo.scss';
import icon from '../../../styles/sprite.css';

import * as DateFilter from '../../../filter/Date';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class RobTrainInfoItem extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(){
        const { onSelect } = this.props;
        onSelect(this.props);
    }


    getSeat(){
        const { seatList } =  this.props;
        return seatList.map(function(item){
            return (
                <span>
                    {item.seatName}:&nbsp;
                    <em>{item.showButton !== 3? item.seatNum: '未开售'}</em>&nbsp;
                    {
                        ( item.seatNum === '' || item.seatNum === '0' || item.showButton === 3 )?
                        <span styleName="rob">(抢)</span> : null
                    }  
                </span>
            )
        });
    }


    render(){
        const { trainCode, runTime, deptTime, deptStationName, arrTime, arrStationName, minPrice ,checked }  = this.props;
        const checkBoxClass = classnames({
            'cicon':true,
            'icon-cho-pre':checked,
            'icon-cho-nor': !checked,
        });
        return(
            <div styleName="rob-trainInfo-item">
                <div styleName="trainInfo">
                    <div styleName="date">
                        <span>{trainCode}</span>
                        <span>{DateFilter.runTime(runTime)}</span>
                    </div>
                    <div styleName="from">
                        <span>{deptTime}</span>
                        <span>{deptStationName}</span> 
                        <span>
                            <i>&yen;</i>
                            <span styleName="price">{minPrice}</span> 
                            <em>起</em>
                        </span> 
                        <div styleName="checkbox-select" onClick={this.handleSelect} >
                            <input type="checkBox" /> 
                            <label styleName={checkBoxClass} />    
                        </div>
                    </div>
                    <div styleName="to">
                        <span>{arrTime}</span>
                        <span>{arrStationName}</span>
                    </div>
                </div>
                <div styleName="trainSeat">
                    {this.getSeat()}
                </div>
            </div>
        );
    }
}






export default RobTrainInfoItem;


