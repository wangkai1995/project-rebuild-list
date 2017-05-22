import React,{Component} from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './fillOrder.scss';

import SessionServer from '../../../server/session/index';
import TokenServer from '../../../server/token/index';
import busModel from '../../../http/bus/index';
import userModel from '../../../http/user/index';

import BusfillOrderPublicHeader from './fillOrderPublicHeader';
import BusfillOrderPublicPassenger from './fillOrderPublicPassenger';
import BusfillOrderPublicContacts from './fillOrderPublicContacts';
import BusfillOrderPublicContactsMessage from './fillOrderPublicContactsMessage';
import BusfillOrderPublicInsurance from './fillOrderPublicInsurance';
import BusfillOrderPublicTreaty from './fillOrderPublicTreaty';
import BusfillOrderPublicFooter from './fillOrderPublicFooter';

import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';
import ModalDialog from '../../../components/modal/Dialog';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple:true})
class BusFillOrderContainer extends Component{

	constructor(props){
        super(props);
        this.state={
            insurance:false,
            treatyChecked: true,
            contacts: false,
        }
        this.insuranceChange = this.insuranceChange.bind(this);
        this.treatyChange = this.treatyChange.bind(this);
    }

    //选择保险
    insuranceChange(insurance){
        this.setState({
            insurance: insurance,
        });
    }

    //协议改变
    treatyChange(Checked){
        this.setState({
            treatyChecked: Checked,
        });
    }


	render(){
        const {actions,insuranceInfo,serviceInfo} = this.props;
        const { insurance,treatyChecked} =this.state;
		return(
			<div styleName="root-container">
				<BusfillOrderPublicHeader/>
                <div styleName="train-fill-order-container busFillOrder">                   
                    <BusfillOrderPublicPassenger actions={actions} serviceInfo={serviceInfo}/>
                    <BusfillOrderPublicContacts/>
                    <BusfillOrderPublicContactsMessage />
                    <BusfillOrderPublicInsurance actions={actions} insuranceInfo= {insuranceInfo} onInsuranceChange={this.insuranceChange}
                                    checkedInsurance={insurance} />
                    <BusfillOrderPublicTreaty 
                                    onTreatyChange={this.treatyChange} 
                                    treatyChecked={treatyChecked} 
                    />
                    <BusfillOrderPublicFooter/>
                </div>
			</div>
		)
	}
}

export default BusFillOrderContainer;
