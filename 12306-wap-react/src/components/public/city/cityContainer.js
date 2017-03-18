import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {Motion ,spring} from 'react-motion';
import _ from 'lodash';
import styles from './city.scss';

import CityAnchor from './cityAnchor';
import CityInput from './cityInput';
import CityCurrent from './cityCurrent';
import CityHotList from './cityHot';
import CityList from './cityList';

import trainModel from '../../../http/train/index';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityContainer extends Component{
		
		constructor(props){
			super(props);
			this.state={
				scrollTop:0,
			};

			this.goCityAnchor = this.goCityAnchor.bind(this);
		}

		componentDidMount(){
			this.props.requestTrainCity(trainModel.trainCity);
			this.props.requestHotCity(trainModel.trainHotCity);
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

			return hotCity;
		}

		//瞄点跳转
		goCityAnchor(scrollTop){
			if(scrollTop){
				this.setState({
					scrollTop: scrollTop
				})
			}
		}


		render(){
			//还缺历史选择城市没有做
			// console.log(this.props);

			const { citys, hotCitys} = this.props;
			//过滤热门城市中的code
			const validHotCitys = this.filterHotCityCode(hotCitys,citys);
		
			return(
				<div ref='anchorContainer'>
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
					<CityInput/>
					<CityCurrent/>
					<CityHotList cityList={validHotCitys} />
					<CityList citys={citys} />
				</div>	
			);
		}

}





export default CityContainer;


