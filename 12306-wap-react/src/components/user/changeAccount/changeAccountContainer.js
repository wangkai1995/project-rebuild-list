import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changeAccount.scss';

import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ChangeAccountForm from './changeAccountForm';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangeAccountContainer extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { actions } = this.props; 

    }


    handleSubmit(){

    }


    render(){
        let { userInfo } = this.props;
        return(
            <div styleName='container'>
                <ChangeAccountForm  userInfo={userInfo} onSubmits={this.handleSubmit} />
            </div>
        );
    }


}





export default ChangeAccountContainer;





