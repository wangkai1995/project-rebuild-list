import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './robTrainSeat.scss';
import icon from '../../../styles/sprite.css';




@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class RobTrainSeatItem extends Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleSelect(){
        const { onSelect } = this.props;
        onSelect(this.props);
    }




    render(){
        const {  seatName , seatPrice ,checked }  = this.props;
        const checkBoxClass = classnames({
            'cicon':true,
            'icon-cho-pre':checked,
            'icon-cho-nor': !checked,
        });
        return(
            <div styleName="rob-trainSeat-item">
                <div styleName="seat-container clear-fixed">
                    <div styleName="seat-item">{seatName}</div>
                    <div styleName="seat-item">
                        <i>&yen;</i>
                        <span styleName="price">{seatPrice}</span>
                        <em>起</em>
                    </div>
                    <div styleName="checkbox-select" onClick={this.handleSelect} >
                        <input type="checkBox" /> 
                        <label styleName={checkBoxClass} />    
                    </div>
                </div>
            </div>
        );
    }
}






export default RobTrainSeatItem;


