import React,{ Component } from 'react';


class Bus extends Component {
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}


export default  Bus;