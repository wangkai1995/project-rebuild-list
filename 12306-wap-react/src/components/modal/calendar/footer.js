import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CalendarFooter extends Component{


	constructor(props){
		super(props);
	}

	render(){
		const { onOk,onCancel } = this.props;
		return (
			<div styleName="calendar-footer">
				<p onClick={onCancel} >取消</p>
				<p onClick={onOk} >确定</p>
			</div>
		);
	}
	
}






export default CalendarFooter