import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {Motion ,spring} from 'react-motion';
import { Seq } from 'immutable';
import _ from 'lodash';
import styles from './city.scss';

import CityAnchor from './cityAnchor';
import CityInput from './cityInput';
import CityCurrent from './cityCurrent';
import CityHotList from './cityHot';
import CityHistory from './cityHistory';
import CityList from './cityList';

import trainModel from '../../../http/train/index';
import seesionServer from '../../../server/session/index';
import localServer from '../../../server/local/index';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityContainer extends Component{
		static propTypes = {
			citys: PropTypes.arrayOf( PropTypes.object ),
			hotCitys: PropTypes.arrayOf( PropTypes.object ),
			error: PropTypes.bool,
			loading: PropTypes.bool,
			push: PropTypes.func,
			requestHotCity: PropTypes.func,
			requestTrainCity: PropTypes.func,
			routeParams: PropTypes.object,
		};

		constructor(props){
			super(props);
			this.state={
				scrollTop:0,
				trainHistory:[],
				historyCity: localServer.get('historyCity')? localServer.get('historyCity') : [],
			};
			this.goCityAnchor = this.goCityAnchor.bind(this);
			this.checkCity = this.checkCity.bind(this);
		}

		componentDidMount(){
			const model = this.props.routeParams.model;
			switch(model){
				case 'train':
					return this.initTrainCity();
				case 'bus':
					return this.initBusCity();
				default:
					return console.log('错误的模式');
			}
		}

		initTrainCity(){
			this.props.requestTrainCity(trainModel.trainCity);
			this.props.requestHotCity(trainModel.trainHotCity);
		}

		initBusCity(){

		}
		
		//过滤热门城市中的code
		filterHotCityCode(hotCity, citys){
			hotCity = hotCity.map( (item) =>{
				var city = _.filter(citys,{
					'cityName': item.cityName,
				});
				if(city.length >0){
					item = city[0];
				}
				return item;
			});
            //转换程immutable
            let $$hotCitys = Seq(hotCity);
			return $$hotCitys;
		}

		//瞄点跳转
		goCityAnchor(scrollTop){
			if(scrollTop){
				this.setState({
					scrollTop: scrollTop
				})
			}
		}

		//存历史城市缓存
		setHistoryCity(city){
			var buff = city,
                flag = true,
                cityArray = [];
            const { citys } = this.props;


			if(!city){
				return false;
			}
			//存缓存
			if( !localServer.get('historyCity') ){
                        cityArray.push(buff);
                        localServer.set('historyCity',cityArray);
            }else{
                cityArray = localServer.get('historyCity');
                for(var i=0,len=citys.length;i<len;i++){
                    if(buff.cityCode === citys[i].cityCode){
                        flag = false;
                    }
                }
                for(var i=0,len=cityArray.length;i<len;i++){
                    if(buff.cityCode === cityArray[i].cityCode){
                        flag = true;
                    }
                }

                if(!flag){
                    if(cityArray.length < 6){
                        cityArray.push(buff);
                    }else{
                        cityArray.shift();
                        cityArray.push(buff);
                    }
                }
                
                localServer.set('historyCity',cityArray);
            }
		}
		
		//点击城市
		checkCity(city){
			var model = this.props.routeParams.model;
			var direction = this.props.routeParams.direction;
			this.setHistoryCity(city);
			localServer.set(model+'.'+direction+'City',city);
			window.history.back();
		}

		render(){
			// console.log(this.props);
			const { citys, hotCitys} = this.props;
			//过滤热门城市中的code
			const validHotCitys = this.filterHotCityCode(hotCitys,citys);
			
			return(
				<div>
					<Motion style={ {scrollTop: spring(this.state.scrollTop)} }>
						{  ( {scrollTop} ) => {
								//控制滚动条
								//44是header高度
								document.body.scrollTop = scrollTop-44;
								return <div/>
							}	
						}
					</Motion>
					<CityAnchor clickAnchor={this.goCityAnchor}/>
					<CityInput onClickCity={this.checkCity} citys={citys} />
					<CityCurrent onClickCity={this.checkCity} citys={citys}  />
					<CityHistory onClickCity={this.checkCity} cityList={this.state.historyCity} />
					<CityHotList onClickCity={this.checkCity} $$cityList={validHotCitys} />
					<CityList onClickCity={this.checkCity} citys={citys} />
				</div>	
			);
		}

}







export default CityContainer;


