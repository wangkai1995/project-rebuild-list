import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

import styles from './city.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class CityAnchor extends Component{
		constructor(props){
			super(props);

			this.handleClickAnchor = this.handleClickAnchor.bind(this);
		}

		handleClickAnchor(e){
			var scrollTop = anchorServer.getAnchor( e.target.text );
			this.props.clickAnchor(scrollTop);
		}

		render(){
			return(
				<div styleName='city-anchor'>
					<a onClick={this.handleClickAnchor} >A</a>
					<a onClick={this.handleClickAnchor} >B</a>
					<a onClick={this.handleClickAnchor} >C</a>
					<a onClick={this.handleClickAnchor} >D</a>
					<a onClick={this.handleClickAnchor} >E</a>
					<a onClick={this.handleClickAnchor} >F</a>
					<a onClick={this.handleClickAnchor} >G</a>
					<a onClick={this.handleClickAnchor} >H</a>
					<a onClick={this.handleClickAnchor} >I</a>
					<a onClick={this.handleClickAnchor} >J</a>
					<a onClick={this.handleClickAnchor} >K</a>
					<a onClick={this.handleClickAnchor} >L</a>
					<a onClick={this.handleClickAnchor} >M</a>
					<a onClick={this.handleClickAnchor} >N</a>
					<a onClick={this.handleClickAnchor} >O</a>
					<a onClick={this.handleClickAnchor} >P</a>
					<a onClick={this.handleClickAnchor} >Q</a>
					<a onClick={this.handleClickAnchor} >R</a>
					<a onClick={this.handleClickAnchor} >S</a>
					<a onClick={this.handleClickAnchor} >T</a>
					<a onClick={this.handleClickAnchor} >U</a>
					<a onClick={this.handleClickAnchor} >V</a>
					<a onClick={this.handleClickAnchor} >W</a>
					<a onClick={this.handleClickAnchor} >X</a>
					<a onClick={this.handleClickAnchor} >Y</a>
					<a onClick={this.handleClickAnchor} >Z</a>
				</div>
			)
		}
}


//全局闭包用来记录瞄点scrollTop信息
var anchorServer = (function(){
	var anchor = {};
	return{
		//设置瞄点信息 在cityItem中记录
		setAnchor : function(index,scollTop){
			anchor[index] = scollTop;
		},
		//获取瞄点位置
		getAnchor:function(index){
			if( anchor[index] ){
				return anchor[index];
			}
			return false;
		},
	}
})();


export default CityAnchor;
export { anchorServer };