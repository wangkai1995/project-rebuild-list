import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './aboutUs.scss';

import AboutUsLogo from './aboutUsLogo';
import AboutUsContent from './aboutUsContent';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class AboutUsContainer extends Component{

	render(){
		return(
			<div styleName="container">
                <AboutUsLogo />
                <AboutUsContent />
			</div>
		)
	}
}



export default 	AboutUsContainer;


