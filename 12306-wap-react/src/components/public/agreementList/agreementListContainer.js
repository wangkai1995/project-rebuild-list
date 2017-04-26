import React,{ Component } from 'react';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './agreementList.scss';
import _ from 'lodash';
import icon from '../../../styles/sprite.css';

import articleModel from '../../../http/article/index';

@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class AgreementListContainer extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { actions } = this.props; 
        actions.requestArticle(articleModel.agreementList);
    }

    getAgreementItem(){
        const { article } = this.props;
        if(Array.isArray(article) && article.length > 0){
            return article.map(function(item){
                return  <Link to={`/public/agreement/${item.articleId}`} styleName="item">
                            <span>{item.title}</span>
                            <i styleName="cicon icon-right-icon"></i>
                        </Link>
            });
        }
    }


	render(){
        console.log(this.props);
		return(
			<div styleName="container">
				<div styleName="list">
                    {this.getAgreementItem()}
                </div>
			</div>
		)
	}
}



export default AgreementListContainer;



