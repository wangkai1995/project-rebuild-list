import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './robPack.scss';
import icon from '../../../styles/sprite.css';


import Header from '../../../layouts/header/header';

import SessionServer from '../../../server/session/index'


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class TrainRobPackContainer extends Component{
	
	constructor(props){
		super(props);
		const localPack  = SessionServer.get('trainRobPack');
		this.state={
			list: localPack.list,
			checked: localPack.checked,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}



	handleSubmit(){
		SessionServer.set('trainRobPack',this.state);
		window.history.back();
	}



	handleClickPack(pack){
		this.setState({
			checked:pack,
		})
	}



	getAccelerateList(){
		const self = this;
		const { list ,checked } = this.state;
		return list.map(function(item){
			const iconClass=classnames({
				'cicon':true,
				'icon-rig-cho-icon': true,
				'icon-confim': (checked.packId === item.packId),
			});
			return(
				<div styleName="accelerate-item" onClick={self.handleClickPack.bind(self,item)}>
					<label>{item.packName}</label>
					<i styleName={iconClass}></i>
				</div>
			)
		});
	}


	getSubmitButton(){
        return <input type="submit" onClick={this.handleSubmit} styleName="pull-input"  value="确定"  />        
    }



	render(){	
		return(
			<div styleName="container">
				<Header title="套餐选择" pullRight={this.getSubmitButton()} />
				<div styleName="accelerate-container">
					{this.getAccelerateList()}
				</div>
			</div>
		);
	}

}






export default TrainRobPackContainer;



