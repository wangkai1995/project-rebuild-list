import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainFilterCheckBox extends Component{
	
	constructor(props){
		super(props);
		this.state={
		 	checkBoxList : this.props.checkBoxList,
		};
	}
	
	handleCheck(index,e){
		let { model ,onCheck } = this.props;
		onCheck(model,index);
	}

	getCheckBox(){
		var self = this;
		const { checkBoxList } = this.state;
		if(checkBoxList){
			return checkBoxList.map(function(item,index){
				const checkClass = classnames({
					'checked-icon-on' : item.checked,
					'checked-icon-off' : !item.checked,
				});	

				return(
					<li>
						 <div styleName="checkbox-select">
						 	<input type="checkBox" id={`${item.exec}-checkBox`} onChange={ self.handleCheck.bind(self,index) }  />
						 	<label for={`${item.exec}-checkBox`} styleName={checkClass}></label>
						 </div>
						 <label styleName="popup-ul-value">{item.name}</label>
					</li>
				);
			});
		}
	}

	render(){
		return(
			<ul styleName="filter-popup-ul">
				{this.getCheckBox()}
			</ul>	
		)
	}

}






export default TrainFilterCheckBox;