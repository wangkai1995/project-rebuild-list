import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';

import SessionServer from '../../../server/session/index';
import ModalAlert from '../../../components/modal/Alert';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusfillOrderPublicContacts extends Component {
    
    constructor(props){
        super(props);
    }



    render(){
        const busInfo = SessionServer.get('FillOrderBusInfo');
        return(
           <Link styleName="add-passenger" to="/user/passenger/bus">
             <i styleName="cicon icon-icon-add-passenger iconBus"></i>&nbsp;
             乘客信息<span>(最多可以添加<span styleName="red">3</span>人)</span>        
           </Link>
        )
    }
    
}



export default BusfillOrderPublicContacts;



