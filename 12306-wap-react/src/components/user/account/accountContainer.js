import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './account.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import AccountPhoto from './accountPhoto';
import AccountInfo from './accountInfo';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class AccountContainer extends Component{

    constructor(props){
        super(props);
        this.handleExit = this.handleExit.bind(this);
    }

    componentDidMount(){
        const { action } = this.props; 
        let token = TokenServer.getToken();
        if( token ){
            action.requestUserInfo(userModel.userInfo,{
                access_token : token.access_token,
            });
        }
    }

    handleExit(){
        TokenServer.removeToken();
        this.props.push('/user');
    }

    render(){
        const { headPic } = this.props.userInfo;
        return(
            <div styleName='container'>
                <AccountPhoto photo={headPic} />    
                <AccountInfo userInfo={this.props.userInfo} />
                <div styleName="btn-exit-container">
                    <button onClick={this.handleExit} styleName="btn-exit">退出登录</button> 
                </div>
            </div>
        );
    }


}





export default AccountContainer;


