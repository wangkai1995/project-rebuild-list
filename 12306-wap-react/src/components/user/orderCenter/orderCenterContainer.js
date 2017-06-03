import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';
import trainModel from '../../../http/train/index';

import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';

import OrderCenterTab from './orderCenterTab';
import OrderCenterList from './orderCenterList'



// @immutableRenderDecorator 为了解决删除问题
@CSSModules(styles,{allowMultiple: true})
class OrderCenterContainer extends Component{

    constructor(props){
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleAddPage = this.handleAddPage.bind(this);
        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
    }


    handleTabChange(tab){
        const { actions ,page } = this.props;
        let token = TokenServer.getToken();
        actions.changeTab(tab);
        actions.requestOrderCenter(userModel.orderInfo,{
            access_token : token.access_token,
            tabType: tab,
            page: page,
            limit: 10,
        });
    }


    handleAddPage(page){
        const { actions ,type } = this.props;
        let token = TokenServer.getToken();
        actions.changePage(page);
        actions.requestOrderCenter(userModel.orderInfo,{
            access_token : token.access_token,
            tabType: type,
            page: page,
            limit: 10,
        });
    }
    

    handleDeleteOrder(index){
        const token = TokenServer.getToken();
        let{ actions ,orderList } = this.props;
        let params = {
            orderNo:orderList[index].orderNo,
            token:token.access_token,
        };        
        switch(orderList[index].orderType){
            case '1':
                trainModel.trainDeleteOrder(params).then(function(result){
                    if(result.code === '00000'){
                        actions.deleteOrder(index);
                    }else{
                        ModalAlert.show({
                            content: result.message,
                            onClick:function(){
                                ModalAlert.hide();
                            }
                        });
                    }
                });
                break;
            case '3':
                //bus
                break;
            default:
                ModalAlert.show({
                    content: '错误的订单',
                    onClick:function(){
                        ModalAlert.hide();
                    }
                })
                break;
        }
    }


    componentDidMount(){
        const { actions ,push ,type ,page } = this.props; 
        let token = TokenServer.getToken();
        if( token ){
            actions.requestOrderCenter(userModel.orderInfo,{
                access_token : token.access_token,
                tabType : type,
                page: page,
                limit: 10,
            });
        }else{
            push('/user/login');
        }
    }
    

    render(){
        const { type ,page ,orderInfo ,orderList ,push } = this.props;
        return(
            <div styleName="container" >
                <OrderCenterTab onTabChange={this.handleTabChange} tabActive={type} />
                <OrderCenterList 
                        orderInfo={orderInfo} 
                        orderList={orderList} 
                        onAdd={this.handleAddPage}
                        onDelete={this.handleDeleteOrder} 
                        page={page} 
                        push={push} 
                />
            </div>
        )
    }


}






export default OrderCenterContainer


