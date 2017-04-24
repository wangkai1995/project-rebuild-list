import React ,{ Component , PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './changePassengers.scss';

import ChangePassengersSubmit from './changePassengersSubmit';


const passportIdValidate = values =>{
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){
        console.log('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15){
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
 
        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay)
        {
            console.log('输入的身份证号里出生日期不对！');
            return false;
        }
        else
        {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for(i = 0; i < 17; i ++)
                {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
                return true;
        }
    }
    if (len == 18){
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
 
        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay){
            console.log('输入的身份证号里出生日期不对！');
            return false;
        }else{
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for(i = 0; i < 17; i ++)
            {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1))
            {
                console.log('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return true;
        }
    }
    return false;
}

const passengersValidate = values => {
    const phoneReg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    const nameReg = /^[\u4e00-\u9fa5]{2,10}$/;
    var error = {};
    const { name, phone ,passportId } = values;
    
    if(!name){
        error._error = '请输入乘客姓名';
        return error;
    }

    if(!nameReg.test(name)){
        error._error = '姓名不正确,请输入2-10位中文';
        return error;
    }

    if(!phone){
        error._error = '请输入乘客联系电话';
        return error;
    }

    if(!phoneReg.test(name)){
        error._error = '手机号码不正确';
        return error;
    }


    if(!passportId){
        error._error = '请输入乘客证件号码';
        return error;
    }

    
    if(!passportIdValidate(passportId)){
        error._error = '证件号码不正确';
        return error;
    }

    return error;
}



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class ChangePassengersForm extends Component{

    constructor(props){
        super(props);
    }
    
    handleOnSubmit(data){
        console.log(data);
    }

    render(){
        const { handleSubmit ,error ,invalid ,pristine ,model } = this.props;   
        return(
            <form>
                <div styleName="input-list">
                    <label styleName="input-item">
                        <span styleName="input-label">姓名</span>
                        <Field name="name" type="text" component="input"  placeholder="与旅客证件姓名保持一致" />
                    </label>
                    <label styleName="input-item">
                        <span styleName="input-label">手机号码</span>
                        <Field name="phone" type="text" component="input"  placeholder="请输入正确手机号码" />
                    </label>
                    <label styleName="input-item">
                        <span styleName="input-label">证件号码</span>
                        <Field namne="passportId" type="text" component="input"  placeholder="请输入正确身份证号码" />
                    </label>
                </div>
                <ChangePassengersSubmit 
                        handleSubmit={ handleSubmit( this.handleOnSubmit.bind(this) ) } 
                        disabled={ invalid || pristine || loading } 
                        error={error}
                        model={model}
                />
            </form>
        );
    }

}





export default reduxForm({
  form: 'changePassengersForm',                 //redux-form的特殊标记，必填项
  validate: passengersValidate,
})(ChangePassengersForm)   



