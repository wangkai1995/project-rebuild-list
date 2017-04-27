import React,{ Component } from 'react';


class Train extends Component {
	render(){
		return(
			<div>
				{this.props.children}
			</div>
		);
	}
}




export default  Train;