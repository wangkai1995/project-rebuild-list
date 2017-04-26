import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './agreementList.scss';

import { actions } from './agreementListRedux';

import Header from '../../../layouts/header/header';
import AgreementListContainer from '../../../components/public/agreementList/agreementListContainer';



@CSSModules(styles,{allowMultiple : true})
class AgreementList extends Component{

	render(){
        const { agreementList, agreementListAction } = this.props;
		return(
			<div styleName="container">
				<Header title="协议条款" />
				<AgreementListContainer {...agreementList}  actions={agreementListAction} />
			</div>
		)
	}
}



export default connect( state =>{
    return{
        agreementList : state.publics.agreementList.agreementList,
    };
},dispatch =>{
    return{
        agreementListAction : bindActionCreators(actions , dispatch),
    }
})(AgreementList);




