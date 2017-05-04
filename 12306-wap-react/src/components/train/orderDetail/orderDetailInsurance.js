import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './orderDetail.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderDetailInsurance extends Component{
    
    constructor(props){
        super(props);
    }


    getInsuranceItem(){
        const { insuranceInfo } = this.props;
        if(Array.isArray(insuranceInfo) && insuranceInfo.length >0){

            return insuranceInfo.map(function(item){
                return(
                    <li styleName="passenger-item">
                        <p>{item.passengerName}</p>
                        <p>{item.insuranceName}</p>
                    </li>
                )
            });
        }
    }

    
    render(){
        const { insuranceInfo } = this.props;
        if(!insuranceInfo || !Array.isArray(insuranceInfo) || insuranceInfo.length === 0 ){
            return null;
        }

        return (
            <div styleName="detail-passenger"> 
                <div styleName="passenger-container">
                    <div styleName="passenger-title">保险</div>
                    <div styleName="passenger-list">
                        <ul>
                            {this.getInsuranceItem()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}





export default OrderDetailInsurance;

