import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';


import * as CalendarServer from './server';
import CalendarHeader from './header';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class Calendar extends Component{


	constructor(props){
		super(props);
		this.state={
            template: this.initTemplate(),
            config: this.initConfig(),
            callBack: this.initCallBack(),
		}
	}
	
	componentDidMount(){
		this.initDate();
		this.state.callBack.onInit();
	}
	
	//初始化模板数据
	initTemplate(){
		var template ={
			//选中的元素
            check: '',
            checkActive : false,
            //年：月：日期数组
            year : '',
            month: '',
            date : []
		}
	}
	
	//初始化配置数据
	initConfig(){
		//设置参数
        var confg = {
          //默认日期
          default:  this.props.default? this.props.default : new Date(),
          //选中日期
          check: this.props.default? this.props.default : new Date(),
          //最大日期
          maxDate: this.props.maxDate? this.props.maxDate : null,
          //最小日期
          minDate: this.props.minDate? this.props.minDate : null,
          //输出格式化
          outFormat : this.props.outFormat? this.props.outFormat : 'yyyy-MM-dd',
          //年份是否可调 默认可调
          changeYear: this.props.changeYear? this.props.changeYear : true,
          //月份是否可调 默认可调
          changeMonth: this.props.changeMonth ? this.props.changeMonth : true,
          //点击元素是否立即改变 默认改变
          clickDateFlag: this.props.clickDateFlag? this.props.clickDateFlag : true,
          //选择元素之后是否关闭 默认关闭 
          clickDateHide: this.props.clickDateHide? this.props.clickDateHide : true,
        };
	}

	//初始化回调
	initCallBack(){
	  //初始化回调
      onInit: this.props.onInit? this.props.onInit : neep,
      //模板显示回调
      onShow: this.props.onShow? this.props.onShow : neep,
      //模板关闭回调
      onHide: this.props.onHide? this.props.onHide : neep,
      //点击元素回调 回传选中日期
      onClickDate: this.props.onClickDate? this.props.onClickDate : neep,
      //日期改变回调 回传改变日期
      onChangeDate: this.props.onChangeDate? this.props.onChangeDate : neep
	}

	//生成日期数据
	initDate(){
		let { confg ,template } = this.state;
		var date = [],
	        year = confg.default.getFullYear(),
	        month = confg.default.getMonth()+1;

	        date = CalendarServer.setBeforeDate(date ,year ,month);
	        date = CalendarServer.setNowDate(date ,year ,month);
	        date = CalendarServer.setAtterDate(date, year ,month);
	          
	        template.year = year;
	        template.month = month;
	        template.date = date;
	    this.setState({
	    	template:template,
	    });
	}

	//年份改变
	onYearChange(date){
	}

	//月份改变
	onMonthChange(date){
	}


	render(){
		return (
			<div styleName="calendar-container">
				<CalendarHeader></CalendarHeader>
			</div>
		);
	}
}





export default Calendar;

