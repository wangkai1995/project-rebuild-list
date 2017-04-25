import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './company.scss';

import { actions } from './companyRedux';

import Header from '../../../layouts/header/header';
import CompanyContainer from '../../../components/public/company/companyContainer';



@CSSModules(styles,{allowMultiple : true})
class Company extends Component{

	render(){
        const{ company ,companyAction } = this.props;
		return(
			<div styleName="container">
				<Header title="公司简介" />
				<CompanyContainer  {...company} actions={companyAction} />
			</div>
		)
	}
}


export default connect( state =>{
    return{
        company : state.publics.company.company,
    };
},dispatch =>{
    return{
        companyAction : bindActionCreators(actions , dispatch),
    }
})(Company);

