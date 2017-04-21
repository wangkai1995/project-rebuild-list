import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './changePassengers.scss';


import { actions } from './changePassengersRedux';
import Header from '../../../layouts/header/header'


@CSSModules(styles,{allowMultiple: true})
class UserChangePassengers extends Component {

    render(){
        const { changePassengers, changePassengersAction, push ,params } = this.props;
        return(
            <div styleName='container'>
                <Header title="常用旅客"/>
            </div>
        );
    }
}







export default connect( state =>{
    return{
        changePassengers : state.user.changePassengers.changePassengers,
    };
},dispatch =>{
    return{
        changePassengersAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserChangePassengers);




