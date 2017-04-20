import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';


import TrainfillOrderCommonModal from './fillOrderCommonModal';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderPublicFooter extends Component {
	
	constructor(props){
		super(props);
		this.state={
			isModal:false,
		}
	}


	handleClickDetail(flag){
		this.setState({
			isModal:flag,
		});
	}
	

	render(){
		const { isModal } = this.state;
		const iconClass = classnames({
			'cicon':true,
			'icon-up-icon':!isModal,
			'icon-down-icon':isModal,
		})
		return(
			<div styleName="order-footer">
				<span styleName="footer-price">
					&yen;&nbsp;&nbsp;
					<span styleName="pirce">0</span>
				</span>
				<input type="submit" styleName="footer-submit" value="提交订单" />	
				<span styleName="footer-detail" onClick={ this.handleClickDetail.bind(this,!isModal) }>
					明细&nbsp;
					<i styleName={iconClass}></i>
				</span>
				<TrainfillOrderCommonModal isModal={isModal} />
			</div>
		);
	}
	
}



export default  TrainfillOrderPublicFooter;


