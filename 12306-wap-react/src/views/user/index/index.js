import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CSSModules from 'react-css-modules';
import styles from './index.scss';


import { actions } from './indexRedux';
import SearchFooter from '../../../layouts/footer/searchFooter';
import UserIndexContainer from '../../../components/user/index/indexContainer';



@CSSModules(styles,{allowMultiple: true})
class UserIndex extends Component {

    render(){
        const { index, indexAction, push } = this.props;
        return(
            <div styleName='index-container'>
                <UserIndexContainer action={indexAction} push={push} {...index} />
                <SearchFooter Model='user' />
            </div>
        );
    }
}









export default connect( state =>{
    return{
        index : state.user.index.index,
    };
},dispatch =>{
    return{
        indexAction : bindActionCreators(actions , dispatch),
        push : bindActionCreators(push , dispatch),
    }
})(UserIndex);




