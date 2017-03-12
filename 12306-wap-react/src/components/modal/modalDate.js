import React ,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';


import { Modal ,Calendar  } from 'antd';
import 'antd/dist/antd.css';


@immutableRenderDecorator
class ModalDate extends Component{
	constructor(props){
		super(props);
		this.onPanelChange = this.onPanelChange.bind(this);
	}

	onPanelChange(value) {
	  console.log(value);
	}

	render(){
		return (
			<Modal 	style={{ top: 30 }}
					title="请选择出发日期" 
					visible={this.props.visible}
					onCancel={ () =>{ this.props.cancel(); } }
        	>
	          	<Calendar fullscreen={false} onSelect={this.onPanelChange} />
	        </Modal>
		)
	}

}


export default ModalDate;