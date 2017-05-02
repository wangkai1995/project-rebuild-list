import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './addChilder.scss';


import SessionServer from '../../../server/session/index';
import Popup from '../../modal/Popup';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class SelectAdultModal extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			adult:false,
		}
	}
	

	componentDidMount(){
        var passneger = SessionServer.get('trainPassenger');
        var adult = passneger.filter(function(item){
        	if(!item.childer && !item.adult){
        		return item;
        	}
        	return false;
        });
        this.setState({
            adult : adult,
        });
    }


	handleSelectAdult(adult){
		const { onCancel , onSelect} = this.props;
		if(!adult.userId && !adult.passportId){
			onCancel();
			return false;
		}
		onSelect(adult);
	}


	getAdultPassneger(){
		const self = this;
		let { adult } = this.state;
		adult = adult.filter(function(item){
			if(item.userId && item.passportId){
        		return item;
        	}
        	return false;
		})
		adult.push({
			userName:'取消',
			userId:false,
		})
		return adult.map(function(item){
			var itemClass = classnames({
				'adult-item':true,
				'close':!item.userId,
			});
			return <div styleName={itemClass} onClick={self.handleSelectAdult.bind(self,item)} >
				{item.userName}
			</div>
		});
	}


	render(){
		const { isVisibile } = this.props;
		if(isVisibile){
			return(
				<Popup>
					<div styleName="popup-adult">
						{this.getAdultPassneger()}
					</div>
				</Popup>
			);
		}else{
			return null;
		}
	}
}






export default SelectAdultModal;


