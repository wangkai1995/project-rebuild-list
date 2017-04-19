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
class TrainfillOrderPublicFooter extends Component {
	
	constructor(props){
		super(props);
	}
	

	render(){
		return(
			<div styleName="order-footer">
				
			</div>
		);
	}
	
}



export default  TrainfillOrderPublicFooter;

