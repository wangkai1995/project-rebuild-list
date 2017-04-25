import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './feedback.scss';


import Header from '../../../layouts/header/header';
import FeedbackForm from './feedbackForm';
import ModalAlert from '../../../components/modal/Alert';

import userModel from '../../../http/user/index';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class FeedbackContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            content:'',
            phone:'',
            email:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormBlur = this.handleFormBlur.bind(this);
    }

    handleSubmit(){
        const { content } = this.state;
        if(!content){
            return ModalAlert.show({
                content:'内容不能为空',
                onClick:function(){
                    ModalAlert.hide();
                }
            });
        }
        userModel.complain(this.state).then(function(data){
            if(data.code === '00000'){
                ModalAlert.show({
                    content:'提交成功!',
                    onClick:function(){
                        ModalAlert.hide();
                        window.history.back();
                    }
                });
            }else{
                ModalAlert.show({
                    content:data.message,
                    onClick:function(){
                        ModalAlert.hide();
                    }
                });
            }
        })
    }


    handleFormBlur(data){
        const { content, phone, email } = data;
        this.setState({
            content : content,
            phone : phone,
            email : email,
        });
    }


    getSubmitButton(){
        return <input type="submit" onClick={this.handleSubmit} styleName="pull-input"  value="提交"  />        
    }


    render(){
        return(
            <div styleName="container">
                <Header title="投诉与建议" pullRight={this.getSubmitButton()} />
                <FeedbackForm onFormBlur={this.handleFormBlur} />
            </div>
        )
    }
}



export default FeedbackContainer;


