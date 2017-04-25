import React,{ Component } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from './feedback.scss';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple : true})
class FeedbackForm extends Component{
    constructor(props){
        super(props);
        this.state={
            content:'',
            phone:'',
            email:'',
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.hanbleBlur = this.hanbleBlur.bind(this);
    }

    handlePhoneChange(el){
        const value = el.target.value;
        this.setState({
            phone:value,
        });
    }

    handleEmailChange(el){
        const value = el.target.value;
        this.setState({
            email:value,
        });
    }

    handleContentChange(el){
        const value = el.target.value;
        this.setState({
            content:value,
        });
    }

    hanbleBlur(){
        const { onFormBlur } = this.props;
        onFormBlur(this.state);
    }

    render(){
        const { content,phone,email } = this.state;
        return(
            <div styleName="form-container">
                <textarea 
                        styleName="form-content"
                        placeholder='您留下的每个字都将帮助我们改善产品,期待您的反馈!(必填)'
                        onChange={this.handleContentChange} 
                        onBlur={this.hanbleBlur}
                        value={content} 
                />  
                <div styleName="suggestions-list">
                    <label styleName="suggestions-item">
                        <input 
                                type="text"
                                placeholder="请输入手机号码(选填)" 
                                onChange={this.handlePhoneChange} 
                                onBlur={this.hanbleBlur}
                                value={phone} 
                        />
                    </label>
                     <label styleName="suggestions-item">
                        <input  
                                type="text" 
                                placeholder="请输入邮件(选填)" 
                                onChange={this.handleEmailChange}
                                onBlur={this.hanbleBlur} 
                                value={email} 
                        />
                    </label>
                </div>  
            </div>
        )
    }
}



export default FeedbackForm;

