import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import busModel from '../../../http/bus/index';

import SessionServer from '../../../server/session/index';
import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusfillOrderPublicInsurance extends Component {
    
    constructor(props){
        super(props);
        this.state={
            messageShow:false,
        }
    }

    componentDidMount(){
        const { actions} = this.props;
        actions.requestInsuranceInfo(busModel.busInsurance);
    }

    componentWillReceiveProps(nextProps){

        const { insurances } = nextProps.insuranceInfo;
        const { messageShow } = this.state;
        if(  Array.isArray(insurances) && insurances.length > 0 && !messageShow){
            var buff = [];
            for( var i=0; i<insurances.length; i++){
                buff[i] = false;
            };
            this.setState({
                messageShow: buff,
            });
        }
    }

    handleMessageShow(flag,index){
        let { messageShow } = this.state;
        messageShow[index] = flag;
        this.setState({
            messageShow: messageShow,
        });
    }

    handleInsuranceChecked(item,el){
        const { onInsuranceChange } = this.props;
        const checked = el.target.checked ;
        if(checked){
            onInsuranceChange(item);
        }else{
            onInsuranceChange(false);
        }   
    }

    getInsuranceItem(){
        const self = this;
        const { insurances } = this.props.insuranceInfo;
        const { checkedInsurance } = this.props;
        const { messageShow } = this.state;
        if( Array.isArray(insurances) && insurances.length > 0){
            /********分割线********/
            return insurances.map(function(item,index){
                let checked = item.insuranceId === (checkedInsurance? checkedInsurance.insuranceId : false);
                const checkClass= classnames({
                    'check-select' : true,
                    'cicon': true,
                    'icon-att-icon': checked,
                    'icon-order-choice-n': !checked,
                });
                const messageIconClass= classnames({
                    'cicon': true,
                    'icon-pul-icon': !messageShow[index],
                    'icon-upw-icon': messageShow[index],
                });
                const messageDetailClass = classnames({
                    'insurance-message-detail': true,
                    'show': messageShow[index],
                    'hide':!messageShow[index],
                });

                /*渲染*/
                return(
                    <li styleName="insurance-item" key={item.insuranceId}>
                        <div styleName="insurance-message">
                            {item.name}
                            <span>{item.price}x0份</span>
                        </div>
                        <div styleName="insurance-check">
                            <i styleName={messageIconClass} onClick={ self.handleMessageShow.bind(self,!messageShow[index],index) }></i>
                            <label styleName={checkClass}>
                                <input checked={checked}  type="checkBox" onClick={ self.handleInsuranceChecked.bind(self,item) } />   
                            </label>
                        </div>
                        <div styleName={messageDetailClass}>
                            <p>1.{item.name}</p>
                            <p>2.{item.description}</p>
                            <p styleName="small">详情请查看&nbsp;<Link to={`/public/agreement/${23}`}>交通意外险说明</Link></p>
                        </div>
                    </li>
                )
            });
        }
    }

    render(){
       
        return(
           <div styleName="insurance-container">
                <ul styleName="insurance-list">
                    { this.getInsuranceItem() }
                </ul>
            </div>
        )
    }
    
}



export default BusfillOrderPublicInsurance;



