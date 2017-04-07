import React ,{ Component, PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './searchType.scss';
import icon from '../../../styles/sprite.css';
import { Switch } from 'antd';
import 'antd/dist/antd.css';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class SearchType extends Component{
	static propTypes = {
		findGD: PropTypes.bool,
		onChangeFind: PropTypes.func
	};

	constructor(props){
		super(props);
		this.handleFindChange = this.handleFindChange.bind(this);
	}

	handleFindChange(bool){
		this.props.onChangeFind(bool);
	}

	render(){
		const { findGD } = this.props;
		return (
			<label styleName="label-item">
				<div styleName="train-find">
					<p>只查高铁/动车</p>
					<Switch checked={findGD} 
							styleName='switch' 
							onChange={this.handleFindChange}
					/>
				</div>
			</label>
		)
	}

}


export default SearchType;