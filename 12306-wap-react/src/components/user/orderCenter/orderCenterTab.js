import React,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './orderCenter.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class OrderCenterTab extends Component{

    constructor(props){
        super(props);
    }

    handleTabClick(tab){
        const { onTabChange } = this.props;
        onTabChange(tab);
    }
    
    render(){
        const { tabActive } = this.props;
        const tab1Class= classnames({
            'tab-item':true,
            'active': tabActive === 'tab-order-1'
        });
        const tab2Class= classnames({
            'tab-item':true,
            'active': tabActive === 'tab-order-2'
        });
        const tab3Class= classnames({
            'tab-item':true,
            'active': tabActive === 'tab-order-3'
        });
        
        return(
            <div styleName="tab-container" >
                <a styleName={tab1Class} onClick={this.handleTabClick.bind(this,'tab-order-1')} >
                    全部订单
                </a>
                <a styleName={tab2Class} onClick={this.handleTabClick.bind(this,'tab-order-2')}  >
                    待支付
                </a>
                <a styleName={tab3Class} onClick={this.handleTabClick.bind(this,'tab-order-3')}  >
                    未出行
                </a>
            </div>
        );
    }

}






export default OrderCenterTab


