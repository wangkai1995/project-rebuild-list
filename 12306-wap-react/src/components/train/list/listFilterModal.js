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
		const { trainDept ,trainArr ,filterSeach ,filterSeachAction } = this.props;
		
		if(!filterSeach){
			//搜索条件
			var Seach={
				trainType: initTrainType(),
				trainTime: initTrainDetpTime(),
				trainStation: initTrainDetp(trainDept,trainArr),
			}
			this.state ={
			 	filterSeach : Seach,
			}
			filterSeachAction(Seach);
		}else{
			this.state ={
			 	filterSeach :filterSeach,
			}
		}
		

		this.handleCancelCheck = this.handleCancelCheck.bind(this);
		this.handleSeachFilter = this.handleSeachFilter.bind(this);
	}
	
	
	//筛选改变
	handleSeachChange(model,index){
		let filterSeach = this.state.filterSeach;
		var seach = filterSeach[model];
		seach[index].checked = !seach[index].checked;
		filterSeach[model] = seach;
		this.setState({
			filterSeach : filterSeach,
		});
	}

	//清空筛选
	handleCancelCheck(){
		let filterSeach = this.state.filterSeach;
		for(var i=0; i<filterSeach.trainType.length; i++ ){
			filterSeach.trainType[i].checked = false;	
		}
		for(var i=0; i<filterSeach.trainTime.length; i++ ){
			filterSeach.trainTime[i].checked = false;	
		}
		for(var i=0; i<filterSeach.trainStation.length; i++ ){
			filterSeach.trainStation[i].checked = false;	
		}
		this.setState({
			filterSeach : filterSeach,
		});
	}

	//选择筛选
	handleSeachFilter(){
		var buff = [];
		const { trainInfo ,trainArr, trainDept ,onSeachFilter ,onHide } = this.props;
		const { trainType,trainTime,trainStation } = this.state.filterSeach;
		
		if(trainInfo.length > 0){
			trainInfo.map(function(item){
				var screen;
	            screen = typeScreen( item, trainType );
	            screen = timeScreen( item, screen, trainTime );
	            screen = stationScreen( item, screen, trainStation );
	            if(screen){
	                buff.push(screen);
	            }
			});
		}
		
		onSeachFilter(buff);
		onHide();
	}


	render(){
		const { filterSeach } = this.state;
		return(
			<Popup>
				<div styleName="filter-popup">
					<div styleName="filter-popup-tab">
						<a  onClick={this.props.onHide} >取消</a>
						<a  onClick={this.handleCancelCheck} >
							<i styleName="cicon icon-icon-dustbin"></i>
							清空筛选
						</a>
						<a onClick={this.handleSeachFilter}>确定</a>
					</div>
					<TrainFilterContent onSeachChange ={this.handleSeachChange.bind(this)}  filterSeach={ filterSeach } />
				</div>
			</Popup>
		);
	}
}



//车次类型筛选
//@data = 原始数据
//@trainType = 过滤条件
//#返回符合条件的过滤数据
function typeScreen(data,trainType){
    var flag = false;
    var type = trainType;

    if(!data){
        return null;
    }

    for(var i = 0; i<type.length ;i++ ){
        if( type[i].checked ){
            flag = true;
            var trainTypes = type[i].exec.split('/');
            var chat = data.trainCode.charAt(0);
            if( trainTypes.indexOf(chat) > -1){
                return data;
            }
        }
    }

    if(flag){
        return null;
    }

    return data;
}

//开车时间筛选
//@data = 原始数据
//@curr = 过滤数据
//@trainTime = 过滤条件
//#返回符合条件的过滤数据
function timeScreen(data,curr,trainTime){
    var flag = false;
    var time = trainTime;

    if(!data || !curr){
        return null;
    }

    for(var i = 0; i<time.length ;i++ ){
        if(time[i].checked ){
            flag = true;
            var str;
            var buff;

            str = time[i].exec.split('-');
            str[0] = parseInt(str[0].replace(':',''));
            str[1] = parseInt(str[1].replace(':',''));

            buff = parseInt(data.deptTime.replace(':',''));

            if(buff >= str[0] && buff <= str[1] ){
                        return curr;
            }
        }
    }

    if(flag){
        return null;
    }

    return curr;
}

//出发/到达车站筛选
//@data = 原始数据
//@curr = 过滤数据
//@trainStation = 过滤条件
//#返回符合条件的过滤数据
function stationScreen(data,curr,trainStation){
    var flag = false;

    if(!data || !curr){
        return null;
    }

    //出发车站
    for(var i = 0; i<trainStation.length ;i++ ){
        if( trainStation[i].checked ){
            flag = true;

            if( data.deptStationName === trainStation[i].exec ){
                return curr;
            }
            if( data.arrStationName === trainStation[i].exec ){
                return curr;
            }
        }
    }

    if(flag){
        return null;
    }

    return curr;
}



export default TrainFilterModal;


