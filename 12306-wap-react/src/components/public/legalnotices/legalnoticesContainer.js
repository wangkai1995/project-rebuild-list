import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './legalnotices.scss';

import articleModel from '../../../http/article/index';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class LegalnoticesContainer extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { actions } = this.props; 
        actions.requestArticle(articleModel.legalnotices);
    }


    getArticleContent(){
        const { article } = this.props;
        if(article){
            return { __html: article[0].content};
        }
    }


	render(){
        
        
		return(
			<div styleName="container" dangerouslySetInnerHTML={this.getArticleContent()} >
			</div>
		)
	}
}




export default LegalnoticesContainer;


