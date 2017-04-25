import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './aboutUs.scss';

import aboutUsPhoto from '../../../images/about-us-logo.png';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class AboutUsLogo extends Component{

    render(){
        return(
            <div styleName="about-title">
                <img src={aboutUsPhoto} /> 
                <span>点点出行1.1.0</span>
            </div>
        )
    }
}



export default  AboutUsLogo;

