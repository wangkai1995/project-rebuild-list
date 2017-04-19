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
class TrainfillOrderPublicTreaty extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        const checkClass = classnames({
            'cicon':true,
            'icon-icon-che-icon-sel': true,
            'icon-icon-che-icon-nor': false,
        });
        return(
            <div styleName="train-treaty">
                <div styleName="checkbox-select">
                        <input type="checkBox" id='train-treaty' />
                        <label for='train-treaty' styleName={checkClass}></label>
                </div>
                同意&nbsp;
                <Link>国内火车票代购协议</Link>
            </div>
        );
    }
    
}




export default  TrainfillOrderPublicTreaty;


