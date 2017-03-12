import React ,{ Component } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './footer.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class SearchFooter extends Component{

	render(){
		
	}
}