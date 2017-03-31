

//时间输出格式
function getFormat(date,format){
	if(!format || typeof format !== 'string'){
      console.log('format is undefiend or type is Error');
    }

    date = date instanceof Date? date : (typeof date === 'number'|| typeof date === 'string')? new Date(date): new Date();
    
    var formatReg = {
      'y+': date.getFullYear(),
      'M+': date.getMonth()+1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for(var reg in formatReg){
      if(new RegExp(reg).test(format)){
              var match = RegExp.lastMatch;
          format = format.replace(match, formatReg[reg].toString().slice(-match.length) );
      }
    }
    return format;
}



//时间星期
 function getWeek(date){
	 
    date = date instanceof Date? date : (typeof date === 'number'|| typeof date === 'string')? new Date(date): new Date();
   
    function formatFromWeek(week){
        switch(week) {
            case 1:
                return '周一';
            case 2:
                return '周二';
            case 3:
                return '周三';
            case 4:
                return '周四';
            case 5:
                return '周五';
            case 6:
                return '周六';
            case 0:
                return '周日';
        }
    }

    return formatFromWeek( date.getDay() );
}




export { getFormat,getWeek };


