'use strict';


module.exports=
	function(){
		return function(input) {
		      var time = new Date(input).Format("mm:ss:SS");
		      console.log(time);
		      time = time.substr(0,8);
		      return time;
	    };
	};

	Date.prototype.Format = function(fmt) {
		    var o = {
		      "M+": this.getMonth() + 1, //月份
		      "d+": this.getDate(), //日
		      "H+": this.getHours(), //小时
		      "m+": this.getMinutes(), //分
		      "s+": this.getSeconds(), //秒
		      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
		      "SS": this.getMilliseconds() //毫秒
		    };
		    if (/(y+)/.test(fmt)) {
		      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    }
		    for (var k in o)
		    	//判断输入字符串 ‘m’'m'':'s''s'':''SS' 如果长度===1 表示是个位 在前面+0
		      if (new RegExp("(" + k + ")").test(fmt)) {
		        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		      }
		    return fmt;
  	};


