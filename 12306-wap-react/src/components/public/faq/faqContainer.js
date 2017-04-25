import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './faq.scss';

import Constant from '../../../constant/config';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class FaqContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            url: Constant.host+'/v1/faq'
        }
    }


	render(){
        const { url } = this.state;
		return(
			<div styleName="container">
				<iframe styleName="iframe-container" frameborder="0" src={url} />  
			</div>
		)
	}
}



export default FaqContainer;


