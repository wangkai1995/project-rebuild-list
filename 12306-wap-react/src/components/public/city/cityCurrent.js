import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityCurrent extends Component{
		static propTypes = {
			onClickCity: PropTypes.func,
			citys: PropTypes.arrayOf( PropTypes.object ),
		};

		constructor(props){
			super(props);
			this.state={
				cityName:'正在定位',
				city:false,
			};
		}
		
		componentDidMount(){
			const { citys } = this.props;
			const self = this;

			if (navigator.geolocation){ 
				var name,city;
                navigator.geolocation.getCurrentPosition(function (position) {
	                var lat = position.coords.latitude;
	                var lon = position.coords.longitude;
	                var point = new BMap.Point(lon, lat);  // 创建坐标点
	                // 根据坐标得到地址描述
	                var myGeo = new BMap.Geocoder();
	                myGeo.getLocation(point, function (result) {
		                 var city = result.addressComponents.city;
		                name = city.replace('市','');
		            	city = _.filter(citys, {'cityName': name });
		            	if(city.length > 0){
							self.setState({
			            		cityName:name,
			            		city:city[0],
			            	});
		            	}else{
		            		self.setState({
			            		cityName:'定位失败',
			            	});
		            	}
                    });			
                });
            }else{
            	this.setState({
            		cityName:'定位失败',
            	});
            }
		}

		handleClick(city){
			if(city){
				this.props.onClickCity(city);
			}
		}

		render(){
			return(
				<div>
					<h2 styleName="title">当前城市</h2>
					<div styleName="inline-block-container">
						<div styleName="citys">
							<a onClick={ this.handleClick.bind(this,this.state.city) } >
								{this.state.cityName}
							</a>
						</div>
					</div>
				</div>
			);
		}
}


export default CityCurrent;