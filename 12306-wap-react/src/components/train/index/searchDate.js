import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './searchDate.scss';
import icon from '../../../styles/sprite.css';

import ModalDate from '../../modal/modalDate';


@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class SearchDate extends Component{
	constructor(props){
		super(props);
		this.state = {
			visible: false,
		};

		this.handleTestClick = this.handleTestClick.bind(this);
		this.handleTestCancel = this.handleTestCancel.bind(this);
	}


	handleTestClick(){
		this.setState({
			visible: true
		});
	}
	handleTestCancel(){
		this.setState({
			visible: false
		});
	}


	render(){
		return (
			<label styleName="label-item">
				<div styleName='form-date' onClick={this.handleTestClick}>
					<div styleName='labe-form-date'>
						<i styleName='cicon icon-rili-ico'></i>&nbsp;&nbsp;出发日期
					</div>
					<div styleName='form-date-selct'>
						<input type="text" value="03月13日" styleName="date-input"/>
						<span styleName="date-week">周一</span>
					</div>
				</div>
				<div styleName='border'></div>

				<ModalDate 	cancel={this.handleTestCancel} 
							visible={this.state.visible}
				/>
			</label>
		)
	}

}


export default SearchDate;