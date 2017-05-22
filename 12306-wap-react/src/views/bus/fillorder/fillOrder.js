import React , {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './fillOrder.scss';
import { actions } from './fillOrderRedux';

import TokenServer from '../../../server/token/index';
import BusFillOrderContainer from '../../../components/bus/fillOrder/fillOrderBusContainer';



@CSSModules(styles,{allowMultiple:true})
class BusFillOrder extends Component{

	constructor(props){
		super(props)
		
	}

	getBusFillOrderContainer(){
		const { fillOrder, fillOrderAction,push}= this.props;
		const token = TokenServer.getToken();
		if(!token){
			return push('user/login');
		}else{
			return <BusFillOrderContainer 
                        {...fillOrder}
                        token={token}  
                        push={push} 
                        actions={fillOrderAction}
                     />
		}
	}

	render(){
		return(
			<div styleName="container">
               {this.getBusFillOrderContainer()}
            </div>
		)
	}
} 


export default connect( state =>{
    return{
        fillOrder : state.bus.fillOrder.fillOrder,
    };
},dispatch =>{
    return{
        fillOrderAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    };
})(BusFillOrder);


