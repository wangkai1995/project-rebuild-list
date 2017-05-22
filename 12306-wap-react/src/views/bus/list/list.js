import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';

import styles from './list.scss';
import { actions } from './listRedux';

import BusInfoContainer from '../../../components/bus/list/listContainer';

@CSSModules(styles,{allowMultiple:true})

class BusList extends Component{

	constructor(props){
		super(props);
	}
	render(){

		const { params ,list, listAction ,push }= this.props;
		return(
			<div styleName='search-list-container'>
				<BusInfoContainer params={params} actions={listAction} push={push}  {...list}  />
			</div>
		);
	}
}


export default connect( state =>{
	return{
		list : state.bus.list.list,
	};
},dispatch =>{
	return{
		listAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(BusList);