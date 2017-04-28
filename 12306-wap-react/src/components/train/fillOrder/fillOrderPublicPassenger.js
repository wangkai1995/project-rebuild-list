import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainfillOrderPublicPassenger extends Component {
    
    constructor(props){
        super(props);
    }
    

    render(){
        const { passengerInfo } = this.props;
        if(passengerInfo){

            
        }else{
            return  <Link to="/user/passenger/train" styleName="add-passenger">
                        <i styleName="cicon icon-icon-add-passenger"></i>&nbsp;
                        添加乘客(成人/儿童)
                    </Link>
        }
    }
    
}



export default  TrainfillOrderPublicPassenger;



