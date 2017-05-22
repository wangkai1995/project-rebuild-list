import React ,{ Component , PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './list.scss';
import icon from '../../../styles/sprite.css';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class BusFilter extends Component{
	
	constructor(props){
		super(props);

	}



	render(){
			return(
				<div styleName="filter-footer busList-footer">
					<div>
						<i styleName="cicon icon-tab-choice-n"></i>
						<span>筛选</span>
					</div>
					<div>
						<i styleName="cicon icon-tab-time-n"></i>
						<span>从早到晚</span>
					</div>
					<div>
						<i styleName="cicon icon-tab-money-n"></i>
						<span>价格从低到高</span>
					</div>
				</div>
			)
	}

}


export default BusFilter;
