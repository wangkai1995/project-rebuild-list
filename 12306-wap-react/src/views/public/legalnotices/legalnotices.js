import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './legalnotices.scss';

import { actions } from './legalnoticesRedux';

import Header from '../../../layouts/header/header';
import LegalnoticesContainer from '../../../components/public/legalnotices/legalnoticesContainer';



@CSSModules(styles,{allowMultiple : true})
class Legalnotices extends Component{

	render(){
        const{ legalnotices ,legalnoticesAction } = this.props;
		return(
			<div styleName="container">
				<Header title="法律声明" />
				<LegalnoticesContainer  {...legalnotices} actions={legalnoticesAction} />
			</div>
		)
	}
}


export default connect( state =>{
    return{
        legalnotices : state.publics.legalnotices.legalnotices,
    };
},dispatch =>{
    return{
        legalnoticesAction : bindActionCreators(actions , dispatch),
    }
})(Legalnotices);

