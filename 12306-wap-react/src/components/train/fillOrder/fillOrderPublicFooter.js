import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';


import TokenServer from '../../../server/token/index';

import TrainfillOrderCommonModal from './fillOrderCommonModal';
import TrainfillOrderBuy12306Modal from './fillOrderPublic12306Buy';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderPublicFooter extends Component {
	
	constructor(props){
		super(props);
		this.state={
			isModal: false,
            isBuyModal: false,
			ticketPrice:0,
			totalfee: 0,
			insurance: 0,
			adultLen: 0,
			childrenLen: 0,
		}
        this.handleBuyModalShow = this.handleBuyModalShow.bind(this);
        this.handleBuyModalHide = this.handleBuyModalHide.bind(this);
	}

    //处理展示数据
	componentWillReceiveProps(nextProps){
        let { insurance ,passengerInfo ,ticketPrice } = nextProps;
        let totalfee = 0;
        let insurancePrice = 0;
        let adult = [];
        let children = [];
        if(ticketPrice){
        	ticketPrice = parseFloat(ticketPrice); 
            if(passengerInfo){
                passengerInfo.forEach(function(item){
                    if(item.childer){
                        children.push(item);
                        return false;
                    }
                    adult.push(item);
                    return false;
                });
            }else{
                passengerInfo = [];
            }
            insurancePrice = insurance? insurance.price : 0;
        	totalfee = (passengerInfo.length * ticketPrice) + ( passengerInfo.length * insurancePrice)

        	this.setState({
        		totalfee: totalfee,
        		ticketPrice: ticketPrice,
        		insurance: insurance,
        		adultLen: adult.length,
        		childrenLen: children.length,
        	});
        }
    }


	handleClickDetail(flag){
		this.setState({
			isModal:flag,
		});
	}


    handleBuyModalShow(){
        let token = TokenServer.getToken();
        if(token.access_12306){
            this.props.onBuySubmit();
            return false;
        }
        this.setState({
            isBuyModal:true,
        })
    }


    handleBuyModalHide(){
        this.setState({
            isBuyModal:false,
        })
    }


    getFeeDetailModel(){
        const { ticketPrice ,insurance ,adultLen ,childrenLen ,isModal } = this.state;
        const { type } = this.props;
        if(type === 'common'){
            return <TrainfillOrderCommonModal 
                        ticketPrice={ticketPrice}
                        insurancePrice={insurance? insurance.price : 0}
                        adultLen={adultLen}
                        childrenLen={childrenLen}
                        isModal={isModal} 
                    />
        }
    }
	

	render(){
		const { totalfee  ,isModal ,isBuyModal } = this.state;
        const { onBuySubmit ,loading ,isDisable } = this.props;
		const iconClass = classnames({
			'cicon':true,
			'icon-up-icon':!isModal,
			'icon-down-icon':isModal,
		});
        const submitClass=classnames({
            'footer-submit':true,
            'footer-submit-disabled': isDisable,
        });
		return(
			<div styleName="order-footer">
				<span styleName="footer-price">
					&yen;&nbsp;&nbsp;
					<span styleName="pirce">{totalfee}</span>
				</span>
				<input type="submit" styleName={submitClass} value="提交订单"  onClick={this.handleBuyModalShow} />	
				<span styleName="footer-detail" onClick={ this.handleClickDetail.bind(this,!isModal) }>
					明细&nbsp;
					<i styleName={iconClass}></i>
				</span>

				{this.getFeeDetailModel()}

                <TrainfillOrderBuy12306Modal loading={loading} onBuySubmit={onBuySubmit} onCancel={this.handleBuyModalHide} isBuyModal={isBuyModal}  />
			</div>
		);
	}	
}





export default  TrainfillOrderPublicFooter;


