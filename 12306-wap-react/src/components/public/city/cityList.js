import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';

import styles from './city.scss';
import CityItem from './cityItem';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityList extends Component{

		//城市按照索引首字母分类
		filterCityIndex(citys){
			var list = {};			
			list.A = _.filter(citys,{
				'cityIndex' : 'A',
			});
			list.B = _.filter(citys,{
				'cityIndex' : 'B',
			});
			list.C = _.filter(citys,{
				'cityIndex' : 'C',
			});
			list.D = _.filter(citys,{
				'cityIndex' : 'D',
			});
			list.E = _.filter(citys,{
				'cityIndex' : 'E',
			});
			list.F = _.filter(citys,{
				'cityIndex' : 'F',
			});
			list.G = _.filter(citys,{
				'cityIndex' : 'G',
			});
			list.H = _.filter(citys,{
				'cityIndex' : 'H',
			});
			list.I = _.filter(citys,{
				'cityIndex' : 'I',
			});
			list.J = _.filter(citys,{
				'cityIndex' : 'J',
			});
			list.K = _.filter(citys,{
				'cityIndex' : 'K',
			});
			list.L = _.filter(citys,{
				'cityIndex' : 'L',
			});
			list.M = _.filter(citys,{
				'cityIndex' : 'M',
			});
			list.N = _.filter(citys,{
				'cityIndex' : 'N',
			});
			list.O = _.filter(citys,{
				'cityIndex' : 'O',
			});
			list.P = _.filter(citys,{
				'cityIndex' : 'P',
			});
			list.Q = _.filter(citys,{
				'cityIndex' : 'Q',
			});
			list.R = _.filter(citys,{
				'cityIndex' : 'R',
			});
			list.S = _.filter(citys,{
				'cityIndex' : 'S',
			});
			list.T = _.filter(citys,{
				'cityIndex' : 'T',
			});
			list.U = _.filter(citys,{
				'cityIndex' : 'U',
			});
			list.V = _.filter(citys,{
				'cityIndex' : 'V',
			});
			list.W = _.filter(citys,{
				'cityIndex' : 'W',
			});
			list.X = _.filter(citys,{
				'cityIndex' : 'X',
			});
			list.Y = _.filter(citys,{
				'cityIndex' : 'Y',
			});
			list.Z = _.filter(citys,{
				'cityIndex' : 'Z',
			});
			return list;
		}
		
		//渲染城市
		//citys = 分类后的城市数据 是object类型
		getCityItem(citys){
			let cityList = [];
			let key = Object.keys(citys);

			if(key.length > 0){
				for( let i=0; i<key.length; i++){
					if( Array.isArray(citys[ key[i] ]) &&  citys[ key[i] ].length > 0 ){
						cityList.push(
							<CityItem title={key[i]}  citys={citys[key [i] ]} />
						);
					}
				}
			}
			
			return cityList;
		}


		render(){
			const { citys }  = this.props;
			const citybuff = this.filterCityIndex(citys) 

			return(
				<div>
					{ this.getCityItem(citybuff) }				
				</div>
			);
		}

}


export default CityList;

