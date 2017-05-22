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
class BusfillOrderPublicTreaty extends Component {
    
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(el){
        const { onTreatyChange } = this.props;
        const checked = el.target.checked;
        onTreatyChange(checked);
    }

    render(){
        const { treatyChecked } = this.props;
        const checkClass = classnames({
            'cicon':true,
            'icon-icon-che-icon-sel': treatyChecked,
            'icon-icon-che-icon-nor': !treatyChecked,
        });
        return(
            <div styleName="train-treaty">
                <div styleName="checkbox-select">
                        <input type="checkBox" checked={treatyChecked} onChange={this.handleCheck} id='train-treaty' />
                        <label for='train-treaty' styleName={checkClass}></label>
                </div>
                同意&nbsp;
                <Link to={`/public/agreement/${24}`}>国内火车票代购协议</Link>
            </div>
        );
    }
    
}




export default  BusfillOrderPublicTreaty;


