import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './faq.scss';

import Header from '../../../layouts/header/header';
import FaqContainer from '../../../components/public/faq/faqContainer';



@CSSModules(styles,{allowMultiple : true})
class Faq extends Component{

	render(){
		return(
			<div styleName="container">
				<Header title="帮助中心" />
				<FaqContainer />
			</div>
		)
	}
}



export default 	Faq


