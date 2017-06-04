import React ,{ Component , PropTypes } from 'react';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changeAccount.scss';


import ModalCalendar from '../../../components/modal/Calendar';
import * as DateFilter from '../../../filter/Date';


@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangeAccountForm extends Component{

    constructor(props){
        super(props);
        this.state ={
            userInfo:this.props.userInfo,
        } 
    }

    handleSexSelect(sex){
        let { userInfo } = this.state;
        userInfo.sex = sex;
        this.setState({
            userInfo: userInfo,
        })
    }


    render(){
        const { userInfo } = this.state;
        const mSexClass=classnames({
            'sex-select':true,
            'active': userInfo.sex === 0 || userInfo.sex === 1
        })
        const wsexClass=classnames({
            'sex-select':true,
            'last-child':true,
            'active': userInfo.sex === 2
        })
        const sexPopupClas = classnames({
            'select-popup':true,
            'active': userInfo.sex === 2
        })
        return(
            <div>
                <div styleName="list">
                    <label styleName="item">
                        <span styleName="item-label">姓名</span>
                        <input placeholder="请输入姓名" type="text"/>
                    </label>
                    <label styleName="item item-sex">
                        <span styleName="item-label">性别</span>
                        <span styleName={mSexClass} onClick={this.handleSexSelect.bind(this,1)}>男</span>
                        <span styleName={wsexClass} onClick={this.handleSexSelect.bind(this,2)}>女</span>
                        <span styleName={sexPopupClas}>&nbsp;</span>
                    </label>
                    <label styleName="item">
                        <span styleName="item-label">出生日期</span>
                    </label>
                </div>
                <button styleName="button">保存</button>
            </div>
        );
    }


}






export default ChangeAccountForm;


