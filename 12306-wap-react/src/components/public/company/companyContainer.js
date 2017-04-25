import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './company.scss';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class CompanyContainer extends Component{
    constructor(props){
        super(props);
    }


	render(){
		return(
			<div styleName="container">
				 
			</div>
		)
	}
}



export default CompanyContainer;


