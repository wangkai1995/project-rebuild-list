import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';

import OrderCenterItem from './orderCenterItem';

// @immutableRenderDecorator 为了解决删除问题
@CSSModules(styles,{allowMultiple: true})
class OrderCenterList extends Component{

    constructor(props){
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    getOrderItem(){
        const { orderList ,push ,onDelete } = this.props;
        if(Array.isArray(orderList) && orderList.length > 0 ){
            return orderList.map(function(item,index){
                return <OrderCenterItem 
                            index={index}
                            key={item.orderNo} 
                            push={push}
                            onDelete={onDelete}
                            {...item} 
                />
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


