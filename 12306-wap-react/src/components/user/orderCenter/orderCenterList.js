import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';

import OrderCenterItem from './orderCenterItem';

@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderCenterList extends Component{

    constructor(props){
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    getOrderItem(){
        const { orderList } = this.props;
        if(Array.isArray(orderList) && orderList.length > 0 ){
            return orderList.map(function(item){
                return <OrderCenterItem key={item.orderNo} {...item} />
            });
        }
    }

    handleAddClick(){
        const { page ,onAdd } = this.props;
        onAdd(page+1);
    }

    render(){
        const { orderInfo } = this.props;
        const refreshClass = classnames({
            'load-refresh' :true,
            'hide': orderInfo.pageNo === orderInfo.pageCount,
        })
        return(
            <div styleName="order-list" >
                {this.getOrderItem()}
                <div styleName={refreshClass} onClick={this.handleAddClick} >
                    加载更多
                </div>
            </div>
        );
    }

}






export default OrderCenterList


