import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './agreement.scss';

import { actions } from './agreementRedux';

import Header from '../../../layouts/header/header';
import AgreementContainer from '../../../components/public/agreement/agreementContainer';



@CSSModules(styles,{allowMultiple : true})
class Agreement extends Component{

    getTitle(){
        const { article } = this.props.agreement;
        if(article){
            return article.title;
        }
    }

	render(){
        const{ agreement ,agreementAction ,params } = this.props;
		return(
			<div styleName="container">
				<Header title={this.getTitle()} />
				<AgreementContainer  {...agreement} actions={agreementAction} params={params} />
			</div>
		)
	}
}


export default connect( state =>{
    return{
        agreement : state.publics.agreement.agreement,
    };
},dispatch =>{
    return{
        agreementAction : bindActionCreators(actions , dispatch),
    }
})(Agreement);

