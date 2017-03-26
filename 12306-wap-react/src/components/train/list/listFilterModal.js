import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './list.scss';
import icon from '../../../styles/sprite.css';

import Popup from '../../modal/Popup';
import TrainFilterContent from './listFilterContent';


function initTrainType(){
	var GC= { name:'高铁(G/C)', exec: 'G/C', checked:false };
	var D = { name:'动车(D)' ,exec: 'D', checked:false };
	var ZTK={ name:'普通(Z/T/K)' ,exec:'Z/T/K', checked:false };
	var LY= { name:'其他(L/Y/等)' , exec: 'LY', checked:false };

	return [ GC,D,ZTK,LY ];
}



function initTrainDetpTime(){
	var _0_6 = {  name:'00:00-06:00', exec:'00:00-06:00',checked:false };
	var _6_12 = {  name:'06:00-12:00', exec:'06:00-12:00',checked:false };
	var _12_18 = {  name:'12:00-18:00', exec:'12:00-18:00',checked:false };
	var _18_24 = {  name:'18:00-24:00', exec:'18:00-24:00',checked:false };

	return [ _0_6, _6_12, _12_18, _18_24 ];
}



function initTrainDetp(detpStations,arrStations){
	var stations = [];

	for(var i=0; i<detpStations.length ;i++){
		var buff = {};
		buff.name = detpStations[i].cityName;
		buff.exec = detpStations[i].cityName;
		buff.checked = false;
		stations.push(buff);
	}

	for(var i=0; i<arrStations.length ;i++){
		var buff = {};
		buff.name = arrStations[i].cityName;
		buff.exec = arrStations[i].cityName;
		buff.checked = false;
		stations.push(buff);
	}

	return stations;
}



@immutableRenderDecorator
@CSSModules(Object.assign({},styles,icon),{allowMultiple: true})
class TrainFilterModal extends Component{
	
	constructor(props){
		super(props);
		const { trainDept ,trainArr } = this.props;
		//搜索条件
		var filterSeach={
			trainType: initTrainType(),
			trainTime: initTrainDetpTime(),
			trainStation: initTrainDetp(trainDept,trainArr),
		}
		this.state = {
			filterSeach : filterSeach,
		}
	}

	handleSeachChange(model,index){
		let filterSeach = this.state.filterSeach;
		var seach = filterSeach[model];
		seach[index].checked = !seach[index].checked;
		filterSeach[model] = seach;
		this.setState({
			filterSeach : filterSeach,
		});
	}

	render(){
		console.log(this.props);
		return(
			<Popup>
				<div styleName="filter-popup">
					<div styleName="filter-popup-tab">
						<a>取消</a>
						<a>
							<i styleName="cicon icon-icon-dustbin"></i>
							清空筛选
						</a>
						<a>确定</a>
					</div>
					<TrainFilterContent onSeachChange ={this.handleSeachChange}  filterSeach={ this.state.filterSeach} />
				</div>
			</Popup>
		);
	}

}





export default TrainFilterModal;


