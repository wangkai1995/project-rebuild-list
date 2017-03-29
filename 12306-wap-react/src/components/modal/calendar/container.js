import React ,{ Component,PropTypes } from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules'
import styles from './calendar.scss';


import * as CalendarServer from './server';
import CalendarHeader from './header';
import CalendarContent from './content';
import CalendarFooter from './footer';



@immutableRenderDecorator
@CSSModules(styles,{allowMultiple: true})
class Calendar extends Component{
	static propTypes = {
		default:  PropTypes.instanceOf(Date),
		check: PropTypes.instanceOf(Date),
		maxDate: PropTypes.instanceOf(Date),
		minDate: PropTypes.instanceOf(Date),
		isYearChange: PropTypes.bool,
		isMonthChange: PropTypes.bool,
		clickDateFlag: PropTypes.bool,
		clickDateHide: PropTypes.bool,
		onInit: PropTypes.func,
		onHide: PropTypes.func,
		onClickDate: PropTypes.func,
		onChangeDate: PropTypes.func,
		setCalendarHide: PropTypes.func,
	};
	
	
	constructor(props){
		super(props);
		this.state={
            template: this.initTemplate(),
            config: this.initConfig(),
            callBack: this.initCallBack(),
		}
		this.onYearAsMonthChange = this.onYearAsMonthChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onOk= this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}
	
	componentDidMount(){
		this.initDate( this.state.config.default );
		this.state.callBack.onInit();
	}
	
	//初始化模板数据
	initTemplate(){
		var template ={
			//选中的元素
            check: this.props.default? this.props.default: new Date( new Date().toLocaleDateString() ),
            //年：月：日期数组
            year : '',
            month: '',
            date : []
		}
		return template;
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
          //年份是否可调 默认可调
          isYearChange: (typeof this.props.isYearChange !== 'undefiend')? this.props.isYearChange : true,
          //月份是否可调 默认可调
          isMonthChange: (typeof this.props.isMonthChange !== 'undefiend')? this.props.isMonthChange : true,
          //点击元素是否立即改变 默认改变
          clickDateFlag: (typeof this.props.clickDateFlag !== 'undefiend')? this.props.clickDateFlag : true,
          //选择元素之后是否关闭 默认关闭 
          clickDateHide: (typeof this.props.clickDateHide !== 'undefiend')? this.props.clickDateHide : true,
        };
        return confg;
	}

	//初始化回调
	initCallBack(){
		var callBack={
			//初始化回调
	      onInit: this.props.onInit? this.props.onInit : CalendarServer.neep,
	      //模板关闭回调
	      onHide: this.props.onHide? this.props.onHide : CalendarServer.neep,
	      //点击元素回调 回传选中日期
	      onClickDate: this.props.onClickDate? this.props.onClickDate : CalendarServer.neep,
	      //日期改变回调 回传改变日期
	      onChangeDate: this.props.onChangeDate? this.props.onChangeDate : CalendarServer.neep
		}
	  return callBack;
	}

	//生成日期数据
	//根据date生成日期
	initDate(newDate,checkedDate){
		let { config ,template } = this.state;
		var date = [],
	        year = newDate.getFullYear(),
	        month = newDate.getMonth()+1;

			config.default = newDate;
	        date = CalendarServer.setBeforeDate(date ,year ,month ,config);
	        date = CalendarServer.setNowDate(date ,year ,month ,config ,template);
	        date = CalendarServer.setAtterDate(date, year ,month ,config);
	          
	        template.year = year;
	        template.month = month;
	        template.date = date;
	        if(checkedDate){
	        	template.check = checkedDate
	        }
	    this.setState({
	    	template:template,
	    	config: config,
	    });
	}

	//日期改变
	onYearAsMonthChange(date){

		this.initDate(date);
	}

	//选择日期
	onDateChange(date){
		var { callBack ,config } = this.state;
		this.initDate(date,date);
		callBack.onClickDate(date);
		//是否执行改变回调
		if(config.clickDateFlag){
			callBack.onChangeDate(date);
		}
		//是否立即关闭
		if(config.clickDateHide){
			//执行立即关闭回调
			callBack.onHide();
			this.props.setCalendarHide();
		}
	}


	onOk(){
		var { callBack ,config } = this.state;
		callBack.onChangeDate(this.template.check);	
		//执行关闭回调
		callBack.onHide();
		this.props.setCalendarHide();
	}


	onCancel(){
		var { callBack } = this.state;
		//执行关闭回调
		callBack.onHide();
		this.props.setCalendarHide();
	}


	render(){
		const { template ,config } = this.state;
		return (
			<div styleName="calendar-container">
				<CalendarHeader
						isYearChange={config.isYearChange}
						isMonthChange={config.isMonthChange} 
						defaults={config.default} 
						year={ template.year } 
						month={ template.month }
						onDateChange={this.onYearAsMonthChange}
				/>
				<CalendarContent 
							onCheckDate={this.onDateChange} 
							checked={template.check} 
							dateList={ template.date } 
				/>
				<CalendarFooter onOk={this.onOk} onCancel={this.onCancel} />
			</div>
		);
	}

}





export default Calendar;

