import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './fillOrder.scss';
import { actions } from './fillOrderRedux';


import TokenServer from '../../../server/token/index';

import ModalAlert from '../../../components/modal/Alert';
import CommonTrainFillOrder from '../../../components/train/fillOrder/fillOrderContainer';



@CSSModules(styles,{allowMultiple: true})
class TrainFillOrder extends Component {
    
    constructor(props){
        super(props);
    }
    
    
    getTrainFillOrderContainer(){
        const { fillOrder, fillOrderAction, params ,push }= this.props;
        const token = TokenServer.getToken();
        if(!token){
            return push('/user/login');
        }
        //正常订单
        if(params.type === "common"){
            return <CommonTrainFillOrder 
                            {...fillOrder}
                            token={token}  
                            push={push} 
                            actions={fillOrderAction}
                     />
        }else if(params.type === "rob"){
        //抢票订单
            return null;
        }
        ModalAlert.show({
            content:'无效的订单类型',
            onClick:function(){
                ModalAlert.hide();
                window.history.back();
            }
        });
    }


    render(){
        return(
            <div styleName="container">
                { this.getTrainFillOrderContainer() }
            </div>
        );
    }
}




export default connect( state =>{
    return{
        fillOrder : state.train.fillOrder.fillOrder,
    };
},dispatch =>{
    return{
        fillOrderAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    };
})(TrainFillOrder);

