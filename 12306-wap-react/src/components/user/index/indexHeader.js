import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './index.scss';


import defaultPhoto from '../../../images/about-us-logo.png';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class UserHeader extends Component{

    constructor(props){
        super(props);
    }


    getUserName(){
        const { userInfo ,onLogin } = this.props;
        if(userInfo){
            return <span>{userInfo.realName}</span>
        }
        return <button onClick={onLogin} >登录/注册</button>
    }


    render(){
        const { userInfo } =this.props; 
        const userPhoto = userInfo? userInfo.headPic : defaultPhoto
        return(
            <div styleName="personal-center-bar">
                <div styleName="personal-photo">
                    <div styleName="user-photo">
                        <img src={userPhoto} />
                    </div>
                    { this.getUserName() }
                </div>
            </div>
        );
    }


}






export default UserHeader;

