import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';


import { actions } from './orderCenterRedux';


import Header from '../../../layouts/header/header'
import OrderCenterContainer from '../../../components/user/orderCenter/orderCenterContainer';


@CSSModules(styles,{allowMultiple: true})
class UserOrderCenter extends Component {

    render(){
        const { orderCenter, orderCenterAction, push } = this.props;
        return(
            <div styleName='container'>
                <Header title="我的订单"/>
                <OrderCenterContainer  {...orderCenter} actions={orderCenterAction} push={push} />
            </div>
        );
    }
}





export default connect( state =>{
    return{
        orderCenter : state.user.orderCenter.orderCenter,
    };
},dispatch =>{
    return{
        orderCenterAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserOrderCenter);






