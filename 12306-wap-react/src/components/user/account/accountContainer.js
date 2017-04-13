import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './account.scss';


import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserAccountContainer extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { action } = this.props; 
        let token = TokenServer.queryToken();
        if( token ){
            action.requestUserInfo(userModel.userInfo,{
                access_token : token.access_token,
            });
        }
    }

    render(){
        const { userInfo } = this.props;
        return(
            <div>
                
            </div>
        );
    }


}



export default UserAccountContainer;


