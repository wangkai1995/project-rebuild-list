import React,{ Component } from 'react';


class Pubilc extends Component {
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}



export default  Pubilc;

