import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';


import styles from './orderDetail.scss';
import { actions } from './orderDetailRedux';


import Header from '../../../layouts/header/header';
import TrainOrderDetailContainer from '../../../components/train/orderDetail/orderDetailContainer';



@CSSModules(styles,{allowMultiple: true})
class TrainOrderDetail extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const { params, orderDetail, orderDetailAction  }= this.props;

        return(
            <div styleName="container" >
                <Header title="订单详情" />
                <TrainOrderDetailContainer params={params} actions={orderDetailAction} {...orderDetail} />
            </div>
        );
    }
}




export default connect( state =>{
    return{
        orderDetail : state.train.orderDetail.orderDetail,
    };
},dispatch =>{
    return{
        orderDetailAction : bindActionCreators(actions , dispatch),
    };
})(TrainOrderDetail);


