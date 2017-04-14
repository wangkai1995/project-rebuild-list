import React ,{ Component , PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import _ from 'lodash';
import styles from './account.scss';
import icon from '../../../styles/sprite.css';

import defaultPhoto from '../../../images/about-us-logo.png';


@immutableRenderDecorator
@CSSModules(_.merge({},styles,icon),{allowMultiple: true})
class AccountPhoto extends Component{

    constructor(props){
        super(props);
    }


    render(){
        const { photo } = this.props;
        return(
            <div styleName="account-photo">
                <Link styleName="photo">
                    <img  src={photo? photo :defaultPhoto} alt="photo" />
                    <span>
                        <i styleName="cicon icon-right-icon"></i>
                        完善个人资料
                    </span>
                </Link>    
            </div>
        );
    }


}



export default AccountPhoto;

