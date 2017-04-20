import React,{ Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './passengers.scss';
import icon from '../../../styles/sprite.css';




@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class PassengersButton extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <ul styleName="button-container" > 
                <Link styleName="add-button">
                    <i styleName="cicon icon-icon-add-white"></i>
                    新增旅客
                </Link>

                <Link styleName="add-button">
                    <i styleName="cicon icon-icon-add-white"></i>
                    导入12306乘客
                </Link>
            </ul>
        )
    }



}






export default PassengersButton