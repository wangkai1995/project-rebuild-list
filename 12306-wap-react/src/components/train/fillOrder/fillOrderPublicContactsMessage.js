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
        this.state = {
            name:'',
            mobile: '',
        }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleMobileInput = this.handleMobileInput.bind(this);
        this.handleBlure = this.handleBlure.bind(this);
    }

    componentDidMount(){
        const { contacts } = this.props;
        if(contacts){
            this.setState({
                name:contacts.name,
                mobile: contacts.mobile,
            })
        }
    }


    componentWillReceiveProps(nextProps){
        const { contacts } = nextProps;
        if(contacts){
            this.setState({
                name:contacts.name,
                mobile: contacts.mobile,
            })
        }
    }


    handleBlure(){
        const { onContactsChange } = this.props;
        onContactsChange(this.state);
    }


    
    handleNameInput(el){
        const value = el.target.value;
        this.setState({
            name:value,
        })
    }

    handleMobileInput(el){
        const value = el.target.value;
        this.setState({
            mobile:value,
        })
    }


    render(){
        const { name,mobile } = this.state;
        return(
            <div styleName="contacts-container" >
                <div styleName="contacts-list">
                    <label>联系人</label>
                    <input type="text" onBlur={this.handleBlure} onChange={this.handleNameInput} value={name} placeholder="请输入联系人姓名" />   
                </div>
                <div styleName="contacts-list">
                    <label>电话</label>
                    <input type="text" onBlur={this.handleBlure} onChange={this.handleMobileInput}  value={mobile} placeholder="请输入联系人电话" />   
                </div>
            </div>
        )
    }    
}




export default  TrainfillOrderPublicContactsMessage;

