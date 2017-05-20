import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './fillOrder.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainfillOrderRobInfo extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { trainInfo } = this.props;
        return(
            <div styleName="rob-info">
                <div styleName="rob-item">
                    <label>已选车次:&nbsp;</label>
                    <span>{trainInfo.trainShow}</span>
                </div>
                <div styleName="rob-item">
                    <label>已选坐席:&nbsp;</label>
                    <span>{trainInfo.seatShow}</span>
                </div>
            </div>
        );
    }
    
}




export default  TrainfillOrderRobInfo;


