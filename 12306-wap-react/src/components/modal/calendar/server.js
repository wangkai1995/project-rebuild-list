

//星期转数字 数字转星期
var weekOrNumber  = {
   'Monday' : 1,
   'Tuesday' : 2,
   'Wednesday' : 3,
   'Thursday' : 4,
   'Friday' : 5,
   'Saturday' : 6,
   'Sunday' : 7
};
var numberOrWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];



//空函数
export function neep(){
	return false;
}

/************************内部使用的函数***********************************/


//判断是否是Date类型
function validDate(obj){
 if(obj instanceof Date){
    return true;
 }else{
  setError('不是时间类型');
 }
};

//抛出错误信息
function setError(message){
  console.log(message);
  return false;
};

//获取设定月份
//@date 当前时间戳
//@number为正向上加月份，为负向下减月份
//返回 设置月份的时间戳
function getConfgMonth(date,number){
  if( validDate(date) ){
      var year = date.getFullYear(),
          month = date.getMonth()+number,
          day = date.getDate();
    return new Date(year,month,day);
  }
};

//获取设定天
//@date 当前时间戳
//@number为日期
//返回 设置日期的时间戳
function getConfgDay(date,number){
  if( validDate(date) ){
    if(number !== 0 && number > 0 && number <31){
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = number;
            return new Date(year,month,day);
    }else{
        setError('设置的日期有错误，不能小于等于0 不能大于31');
    }
  }
};

//获取输入月有多少天
//date = 输入月
//currDate 当前月
function getMonthIsDay(date,currDate){
	var day = 0;
    if( validDate(date) ){
       var year = date.getFullYear(),
           month = date.getMonth()+1;
           if(currDate){
                //如果当前月是三月
               var twoMonth  = /^.{5}(\d+).+$/.exec( currDate.toLocaleDateString() );
               if( Array.isArray(twoMonth) && twoMonth.length >1 && twoMonth[1] === '3' ){
                    return  getTwoMonthIsDay(year);     
               }
           }
        day = new Date(year,month,0).getDate();
    }
    return day;
};

//获取二月份有多少天
function getTwoMonthIsDay(year){
    return new Date(year,2,0).getDate();
}

//获取星期
function getWeek(date){
  var week = '';
  if( validDate(date) ){
       switch( date.getDay() ){
         case 1:
              week = 'Monday';break;
         case 2:
              week = 'Tuesday';break;
         case 3:
              week = 'Wednesday';break;
         case 4:
              week = 'Thursday';break;
         case 5:
              week = 'Friday';break;
         case 6:
              week = 'Saturday';break;
         case 0:
              week = 'Sunday';break;
       }            
    return week;
  }    
};

//检测日期是否可用
//@@如果存在最小天数，则不能小于最小天数 否则不可用
//@@如果存在最大天数，则不能超过最大天数 否则不可用
function validDateActive(date,config){
 if(config.minDate && validDate(config.minDate) ){
    if(date < config.minDate){
      return false;
    }
 }
 if(config.maxDate && validDate(config.maxDate) ){
    if(date > config.maxDate){
      return false;
    }
 }

 return true;
};



//计算上个月的天数
export function setBeforeDate(date, year, month,config){
	var beforeMonthDayNumber = getMonthIsDay( getConfgMonth(config.default,-1) , config.default ),
        oneDay_week = weekOrNumber[ getWeek( getConfgDay(config.default,1) ) ];

   //向前补上个月的天数
    for(var i = oneDay_week-1,j = 0; i>0; i--,j++){
       var buff = {};
       buff.monthFlag = "before";
       buff.week = numberOrWeek[i-1];
       if(i === oneDay_week ){
        buff.value = beforeMonthDayNumber;
        buff.date = new Date(year,month-2,beforeMonthDayNumber-j);
       }else{
         buff.value = beforeMonthDayNumber-j;
         buff.date = new Date(year,month-2,beforeMonthDayNumber-j);
       }
       //检测是否可用
       buff.active =  validDateActive(buff.date,config);
       date.push(buff);
    }
    //上个月的数据是反的 所以需要翻转一下
    date.reverse();

    return date;
};

//计算这个月的天数
export function setNowDate(date, year, month,config,template){
    var monthDayNumber = getMonthIsDay(config.default),
        oneDay_week = weekOrNumber[ getWeek( getConfgDay(config.default,1) ) ];
      //计算这个月
      var count = oneDay_week; //星期的转换计数器
      var now = config.default.getDate(); //获取当天
      for(var i =0; i<monthDayNumber; i++){
        var buff = {};
        if(i === 0){
        }else{
           count++;
          if(count > 7){
            count = 1;
          }
        }
        buff.monthFlag = 'now';
        buff.week = numberOrWeek[count];
        buff.value = i+1;
        buff.date = new Date(year,month-1,i+1);
        if(i+1 === now){
          buff.now = true;
          //判断是否和选中日期相等
          if(config.check.getTime() === buff.date.getTime()){
              template.check = buff.date;
          }
        }
        //检测是否可用
        buff.active =  validDateActive(buff.date,config);
        date.push(buff);
      }

      return date;
};

//向后补下个月的天数
export function setAtterDate(date, year ,month,config){
 //向后补下个月的天数
  var atterMonth = getConfgMonth(config.default,1),
      atterDay_week = weekOrNumber[ getWeek( getConfgDay(atterMonth,1) )  ],
      len = date.length;
  for(var i = len,j = 0; i<42 ;i++,j++){
       var buff = {};
         if(i !== len){
            atterDay_week++;
            if(atterDay_week > 7){
              atterDay_week = 1;
            } 
         }
      buff.monthFlag = 'atter';
      buff.week = numberOrWeek[atterDay_week];
      buff.value = j+1;
      buff.date = new Date(year,month,j+1);
      //检测是否可用
      buff.active =  validDateActive(buff.date,config);
      date.push(buff);
  }
  return date;
};








