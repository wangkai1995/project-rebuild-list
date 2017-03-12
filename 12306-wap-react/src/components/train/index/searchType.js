import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './searchType.scss';
import icon from '../../../styles/sprite.css';
import { Switch } from 'antd';
import 'antd/dist/antd.css';


@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class SearchType extends Component{

	render(){
		return (
			<label styleName="label-item">
				<div styleName="train-find">
					<p>只查高铁/动车</p>
					<Switch styleName='switch' />
				</div>
			</label>
		)
	}

}


export default SearchType;