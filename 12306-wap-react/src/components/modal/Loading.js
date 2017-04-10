import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './modal.scss';

import Popup from './Popup';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ModalLoading extends Component{
	static propTypes = {
		textContent:  PropTypes.string,
		isVisible: PropTypes.bool,
	};

	constructor(props){
		super(props);
		const { isVisible,textContent} = this.props;
		this.state = {
			isVisible: isVisible,
			textContent: textContent,
		}
	}
	
	
	componentWillReceiveProps(nextProps){
		this.setState({
			isVisible : nextProps.isVisible,
		});
	}	


	render(){
		if(this.state.isVisible){
			return (
				<Popup>
						<div styleName="popup-loading">
							<p>{this.state.textContent}</p>
							<div styleName="loading-bg"></div>
						</div>
				</Popup>
			);
		}else{
			return null;
		}
	}	
}



export default ModalLoading;


