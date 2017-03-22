import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';


import styles from './list.scss';
import { actions } from './listRedux';

import TrainInfoContainer from '../../../components/train/list/listContainer';


@CSSModules(styles,{allowMultiple: true})
class TrainList extends Component {
	
	constructor(props){
		super(props);
	}


	render(){
		// console.log(this.props);
		const { params ,list, listAction ,push }= this.props;
		
		return(
			<div styleName='search-list-container'>
				<TrainInfoContainer params={params} actions={listAction} push={push}  {...list}  />
			</div>
		);
	}
}



export default connect( state =>{
	return{
		list : state.train.list.list,
	};
},dispatch =>{
	return{
		listAction : bindActionCreators(actions , dispatch),
		push : bindActionCreators(push , dispatch),
	}
})(TrainList);
