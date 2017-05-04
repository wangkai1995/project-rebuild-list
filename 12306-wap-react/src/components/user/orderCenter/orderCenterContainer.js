import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';
import ModalLoading from '../../../components/modal/loading';
import ModalAlert from '../../../components/modal/Alert';

import OrderCenterTab from './orderCenterTab';
import OrderCenterList from './orderCenterList'



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderCenterContainer extends Component{

    constructor(props){
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleAddPage = this.handleAddPage.bind(this);
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
        const { orderConter ,type ,page ,orderInfo ,orderList ,push } = this.props;
        return(
            <div styleName="container" >
                <OrderCenterTab onTabChange={this.handleTabChange} tabActive={type} />
                <OrderCenterList orderInfo={orderInfo} orderList={orderList} onAdd={this.handleAddPage} page={page} push={push} />
            </div>
        )
    }


}






export default OrderCenterContainer


