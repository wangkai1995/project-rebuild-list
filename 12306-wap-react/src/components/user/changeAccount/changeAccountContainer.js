import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changeAccount.scss';

import TokenServer from '../../../server/token/index';
import userModel from '../../../http/user/index';

import ModalAlert from '../../../components/modal/Alert';
import ModalLoading from '../../../components/modal/loading';


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
        let token = TokenServer.getToken();
        actions.requestUserInfo(userModel.userInfo,{
            access_token : token.access_token,
        });
        
    }


    componentWillReceiveProps(nextProps){
        const { changeFlat ,error ,actions } = nextProps;
        if(changeFlat){
            ModalAlert.show({
                content: '编辑个人资料成功!',
                onClick:function(){
                    ModalAlert.hide();
                    window.history.back();
                }
            });
        }
        if(error){
            ModalAlert.show({
                content: error,
                onClick:function(){
                    ModalAlert.hide();
                    actions.resetError();
                }
            })
        }
    }
    

    handleSubmit(params){
        const { actions } = this.props;
        var token = TokenServer.getToken();
        actions.requestChangeUserInfo(userModel.updateUserInfo,{
            token: token.access_token,
            formData:params
        })
    }


    render(){
        const { userInfo ,loading } = this.props;
        return(
            <div styleName='container'>
                <ChangeAccountForm  userInfo={userInfo} onSubmits={this.handleSubmit} />
                <ModalLoading isVisible={loading} textContent="正在为您加载信息" />
            </div>
        );
    }
}





export default ChangeAccountContainer;





