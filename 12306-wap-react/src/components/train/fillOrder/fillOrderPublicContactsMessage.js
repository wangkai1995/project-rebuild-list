import React,{ Component } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import { Link } from 'react-router';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import _ from 'lodash';
import styles from './fillOrder.scss';
import icon from '../../../styles/sprite.css';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class TrainfillOrderPublicContactsMessage extends Component {
    
    constructor(props){
        super(props);
        this.state={
            name : '',
            mobile : '',
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleMobileInput = this.handleMobileInput.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        const { contacts } = nextProps;
        if(contacts){
            this.setState({
                name: contacts.realName,
                mobile: contacts.mobile,
            });
        }
    }


    handleNameInput(el){
        const { onNameChange } = this.props;
        const value = el.target.value;
        var nameReg = /^[\u4e00-\u9fa5]{2,10}$/;
        if(nameReg.test(value)){
            onNameChange(value);
        }
        this.setState({
            name:value,
        });
    }

    handleMobileInput(el){
        const { onMobileChange } = this.props;
        const value = el.target.value;
        var mobileReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
        if(mobileReg.test(value)){
            onMobileChange(value);
        }
        this.setState({
            mobile:value,
        });
    }


    render(){
        const { name,mobile } = this.state;
        return(
            <div styleName="contacts-container" >
                <div styleName="contacts-list">
                    <label>联系人</label>
                    <input type="text" onChange={this.handleNameInput} value={name} placeholder="请输入联系人姓名" />   
                </div>
                <div styleName="contacts-list">
                    <label>电话</label>
                    <input type="text" onChange={this.handleMobileInput}  value={mobile} placeholder="请输入联系人电话" />   
                </div>
            </div>
        )
    }    
}




export default  TrainfillOrderPublicContactsMessage;

