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
        const { userInfo } = this.props;
        this.state ={
            sex: 0,
            birthday: '',
            name: '',
            isVisible: false,
        };
        this.hideModalDate = this.hideModalDate.bind(this);
        this.showModaleDate = this.showModaleDate.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { userInfo } = nextProps;
        if(userInfo){
            this.setState({
                sex: userInfo.sex,
                birthday: userInfo.birthday,
                name: userInfo.username,
            });
        }
    }

    

    hideModalDate(){
        this.setState({
            isVisible: false,
        })
    }


    showModaleDate(){
        this.setState({
            isVisible: true,
        })
    }


    handleSexSelect(sex){
        this.setState({
            sex: sex,
        })
    }
    

    handleInputName(e){
        var name = e.target.value;
        this.setState({
            name: name,
        })
    }


    handleDateChange(date){
        this.setState({
            birthday: DateFilter.getFormat(date,'yyyy-MM-dd'),
        })
    }


    handleSubmit(){
        const { name, birthday,sex } = this.state;
        const { onSubmits } = this.props;
        const NameRex = /^[\u4e00-\u9fa5]{2,10}$/;
        let params = {
            name:name,
            sex: sex,
            birthday: birthday,
        }
        if(!NameRex.test(name)){
            delete params.name;
        }
        if(!birthday){
            delete params.birthday;
        }
        onSubmits(params);
    }


    render(){
        const { sex, birthday ,name ,isVisible } = this.state;
        const defaultBirthday = birthday? new Date(birthday) : new Date();
        const mSexClass=classnames({
            'sex-select':true,
            'active': sex === 0 || sex === 1
        })
        const wsexClass=classnames({
            'sex-select':true,
            'last-child':true,
            'active': sex === 2
        })
        const sexPopupClas = classnames({
            'select-popup':true,
            'active': sex === 2
        })
        return(
            <div>
                <div styleName="list">
                    <label styleName="item">
                        <span styleName="item-label">姓名</span>
                        <input onChange={this.handleInputName} value={name} placeholder="请输入姓名" type="text"/>
                    </label>
                    <label styleName="item item-sex">
                        <span styleName="item-label">性别</span>
                        <span styleName={mSexClass} onClick={this.handleSexSelect.bind(this,1)}>男</span>
                        <span styleName={wsexClass} onClick={this.handleSexSelect.bind(this,2)}>女</span>
                        <span styleName={sexPopupClas}>&nbsp;</span>
                    </label>
                    <label styleName="item">
                        <span styleName="item-label">出生日期</span>
                        <span onClick={this.showModaleDate}>
                            { birthday? birthday :'请选择出生日期' }
                        </span>
                    </label>
                </div>
                <button onClick={this.handleSubmit} styleName="button">保存</button>
                <ModalCalendar
                        maxDate={new Date()}
                        default={defaultBirthday}
                        onHide={this.hideModalDate}
                        onChangeDate={this.handleDateChange}    
                        isVisible={isVisible}
                />
            </div>
        );
    }
}








export default ChangeAccountForm;





