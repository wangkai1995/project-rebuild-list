import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './passengers.scss';


import { actions } from './passengersRedux';


import Header from '../../../layouts/header/header'
import PassengersContainer from '../../../components/user/passengers/passengersContainer';


@CSSModules(styles,{allowMultiple: true})
class UserPassengers extends Component {

    render(){
        const { passengers, passengersAction, push ,params } = this.props;
        return(
            <div styleName='container'>
                <Header title="常用旅客"/>
                <PassengersContainer  {...passengers} actions={passengersAction} push={push} params={params} />
            </div>
        );
    }
}





export default connect( state =>{
    return{
        passengers : state.user.passengers.passengers,
    };
},dispatch =>{
    return{
        passengersAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserPassengers);






