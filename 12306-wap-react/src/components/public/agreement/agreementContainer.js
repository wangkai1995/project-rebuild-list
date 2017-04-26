import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './agreement.scss';

import articleModel from '../../../http/article/index';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class AgreementContainer extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { actions ,params } = this.props; 
        actions.requestArticle(articleModel.agreement,{
            id:params.id
        });
    }


    getArticleContent(){
        const { article } = this.props;
        if(article){
            return { __html: article.content};
        }
    }


	render(){
        
		return(
			<div styleName="container" dangerouslySetInnerHTML={this.getArticleContent()} >
			</div>
		)
	}
}




export default AgreementContainer;


