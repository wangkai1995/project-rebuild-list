import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './aboutUs.scss';

import Header from '../../../layouts/header/header';
import AboutUsContainer from '../../../components/public/aboutUs/aboutUsContainer';



@CSSModules(styles,{allowMultiple : true})
class AboutUs extends Component{

	render(){
		return(
			<div styleName="container">
				<Header title="关于点点出行" />
				<AboutUsContainer />
			</div>
		)
	}
}



export default 	AboutUs


