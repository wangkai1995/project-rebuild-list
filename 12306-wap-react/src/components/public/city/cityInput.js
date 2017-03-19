import React,{ Component,PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './city.scss';

import CitySearch from './citySearch';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityInput extends Component{
		constructor(props){
			super(props);
			this.state={
				value:'',
				search: [],
			};
			this.handleChangeInput = this.handleChangeInput.bind(this);
		}

		handleChangeInput(e){
			let { citys } = this.props;
			let reg = /^([A-Z]+)|([a-z]+)|([\u4e00-\u9fa5]+)/g,
                len = citys.length,
                buff = [],
                text = reg.exec(e.target.value);

                 if(text){
                     if( typeof text[1] !== 'undefined'){
                        buff = _.filter(citys, {'cityIndex': text[1].charAt(0)});
                    }else if(typeof text[2] !== 'undefined'){
                        for(var i=0; i<len; i++){
                            if( citys[i].cityFullPinyin.indexOf(text[2]) !== -1 ){
                                buff.push(citys[i]);
                            }
                        }
                    }else if(typeof text[3] !== 'undefined'){
                        for(var i=0; i<len; i++){
                            if( citys[i].cityName.indexOf(text[3]) !== -1 ){
                                buff.push(citys[i]);
                            }
                        }
                    }
                }
			if( buff.length > 0 ){
				this.setState({
	            	search: buff,
	            	value: e.target.value,
	            });
			}else{
				this.setState({
	            	search: [],
	            	value: e.target.value,
	            });
			}
		}

		render(){
			const {onClickCity} = this.props;

			return(
				<div styleName='city-input'>
					<label styleName="city-input-label">
						<input 	styleName="input" 
								type="text" 
								value={this.state.value}
								placeholder="中文/拼音/首字母"
								onChange={this.handleChangeInput}
						/>
					</label>
					<CitySearch onCheckCity={onClickCity} searchCity={this.state.search} />
				</div>
			);
		}
}


export default CityInput;