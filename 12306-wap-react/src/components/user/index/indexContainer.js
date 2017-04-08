import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './index.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import UserHeader from './indexHeader';
import UserContent from './indexContent';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserIndexContainer extends Component{

    constructor(props){
        super(props);
        this.handleGoLogin = this.handleGoLogin.bind(this);
    }

    handleGoLogin(){
        this.props.push('/user/login');
    }


    componentDidMount(){
        const { action } = this.props; 
        let token = TokenServer.queryToken();
        if( token ){
            action.requestUserInfo(userModel,userInfo,{
                access_token : token.access_token,
            });
        }
    }
    

    render(){
        const { userInfo } = this.props;
        return(
            <div>
                <UserHeader onLogin={this.handleGoLogin} userInfo={userInfo} />
                <UserContent />
            </div>
        );
    }


}






export default UserIndexContainer;



