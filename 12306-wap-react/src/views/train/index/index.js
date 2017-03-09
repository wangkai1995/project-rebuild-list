import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


class trainIndex extends Component {

	render(){
		return(
			<div>
				train_index
			</div>
		);
	}
}

export default trainIndex;



// export default connect( state => {
// 	return {
// 		list : state.home.list,
// 	};
// },dispatch => {
// 	return {
// 		listActions : bindActionCreators(actions , dispatch),
// 		push : bindActionCreators(push , dispatch),
// 	};
// })(Home);