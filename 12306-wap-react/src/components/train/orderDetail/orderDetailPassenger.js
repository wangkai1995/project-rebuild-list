import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './orderDetail.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderDetailPassenger extends Component{
    
    constructor(props){
        super(props);
    }


    getPassengerItem(){
        const { passengerInfo } = this.props;
        if(Array.isArray(passengerInfo) && passengerInfo.length >0){
            var reg = /^(.{6})(?:\d+)(.{4})$/;
            return passengerInfo.map(function(item){
                
                if(item.ticketType === '1'){
                    item.passportNo = item.passportNo.replace(reg,"$1********$2");
                    return(
                        <li styleName="passenger-item">
                            <p>{item.passengerName}</p>
                            <p>身份证&nbsp;{item.passportNo}</p>
                            <p>{item.seatName}&nbsp;&yen;{item.seatPrice}</p>
                            <p>{item.seatNo}</p>
                        </li>
                    )
                }

            });
        }
    }

    
    render(){
        const { passengerInfo ,contactMobile } = this.props;
        if(!passengerInfo){
            return null;
        }

        return (
            <div styleName="detail-passenger"> 
                <div styleName="passenger-container">
                    <div styleName="passenger-title">乘车人</div>
                    <div styleName="passenger-list">
                        <ul>
                            {this.getPassengerItem()}
                        </ul>
                    </div>
                </div>
                <div styleName="passenger-title">联系人/手机</div>
                <p styleName="passenger-list">{contactMobile}</p>
            </div>
        );
    }

}





export default OrderDetailPassenger;

