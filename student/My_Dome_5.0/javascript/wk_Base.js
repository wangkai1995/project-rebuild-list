/********************************************************************************************
 *
 *配合封装库的
 *功能函数的的实现
 *
 ********************************************************************************************
*/

/*
 *识别浏览器 自动启动
 *
 *
 *加载脚本的时候自动启动
 *
 *返回window.sys对象
 *
 *IE = sys.ie = 版本号
 *火狐 = sys.firefox = 版本号
 *谷歌 = sys.chrome = 版本号
 *opera = sys.opera = 版本号
 *苹果 = sys.safari = 版本号
 *
 *
*/

(function(){

    window.sys = {};
    var ua =navigator.userAgent.toLowerCase();
    var s;

     (s = ua.match(/msie ([\d.]+)/))? sys.ie = s[1]:
     (s = ua.match(/firefox\/([\d.]+)/))? sys.firefox = s[1]:
     (s = ua.match(/chrome\/([\d.]+)/))? sys.chrome = s[1]:
     (s = ua.match(/opera\/.*version\/([\d.]+)/))? sys.opera = s[1]:
     (s = ua.match(/version\/([\d.]+).*safari/))? sys.safari = s[1]:0;
})();


/*
 *检测class是否存在
 *@返回 1或0
 */
function hasClass(Element,Class){
	return Element.className.match(new RegExp('(\\s|^)'+Class+'(\\s|$)'));
};

/*
 *兼容方式获取计算后的style值
 *
 *@返回Style的值
 */
function getStyle(Element,Style){
	if(typeof window.getComputedStyle !== 'undefined')
	{
		return window.getComputedStyle(Element,null)[Style];

	}else if(typeof Element.currentStyle !== 'undefined'){

		return Element.currentStyle[Style];
	}
};

/*
 *兼容方式获取浏览器窗口大小
 *
 *@返回getlnner 对象 width属性=长度 heigth属性=高度
 */
function Getinner(){

	if(typeof window.innerWidth !== 'undefined'){   //w3c

		return{
			width: window.innerWidth,
			height: window.innerHeight
		}

	}else{

		return{
			width: document.body.clientWidth,     //IE
			height: document.body.clientHeigt
		}


	}
	
};


/*
 *兼容方式获取浏览器窗口大小
 *
 *@返回getScroll 对象 top属性=高度 left属性=左边
 */
 function Getscroll(){

 	return{
 		top: document.documentElement.scrollTop || document.body.scrollTop,

 		left: document.documentElement.scrollLeft  || document.body.scrollLeft
 	}
 }




/*
 *兼容方式阻止默认行为
 *
 *无返回
 */
function preDef(event){
	var e = event || window.event;
	if(typeof e.preventDefault !== 'undefined'){

		e.preventDefault();

	}else{

		e.returnValue = false;
	}
};


/*
 *去除首尾空格
 *
 *@str 输入字符串
 *
 *返回字符串
 */
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
};



/* 兼容方式添加事件绑定
 *
 *@Obj  需要绑定的对象
 *@type 绑定的事件
 *@fn   事件处理函数
 *@flag 是否取消事件冒泡 flas不取消 true改为捕获 不输入默认为flase  不支持W3C的浏览器 ture为取消冒泡 flase为不取消
 *
 *无返回
*/
function addEvent(obj,type,fn,flag){
     
    if(typeof flag === 'boolean'){
       addEvent.flag = flag;
    }
     

	if(typeof obj.addEventListener !== 'undefined'){      //W3C
       
       if(typeof flag === 'boolean' && flag === true ){
       	  obj.addEventListener(type,fn,true);
       }else{
          obj.addEventListener(type,fn,false);  
       }

	}else{                                                //IE
      //建立事件哈希表
      if(!obj.Event) obj.Event=[];

      //存第一个事件
      if(!obj.Event[type]){

      	 obj.Event[type] = [];
      	 //如果这个事件存在
         if(obj['on'+type]){
         	obj.Event[type][0] = fn;
         }
      }
      //对同一事件进行屏蔽
      for(i in obj.Event[type]){
      	if(obj.Event[type][i] === fn){return false;}
      }
       
      //通过事件计数器累加
      obj.Event[type][addEvent.id++] = fn;

      //处理函数绑定
      obj['on'+type] = addEvent.exec;
      
	}
};



/* 兼容方式移除事件绑定
 *
 *@Obj  需要绑定的对象
 *@type 绑定的事件
 *@fn   事件处理函数
 *
 *无返回
*/
function removeEvent(obj,type,fn){

	if(typeof obj.removeEventListener !== 'undefined'){

		obj.removeEventListener(type,fn,false);

	}else{
		if(obj.Event){
      
	      for(i in obj.Event[type]){
	      	 if(obj.Event[type][i] === fn){delete obj.Event[type][i];}
	      }
       }
	}
};


/* addEvent对象 事件处理方法
 *
 *@event 事件对象
 *
 *
 *无返回
*/
addEvent.exec = function(event){
	var e = event || addEvent.IeEvent(window.event);
	var es = this.Event[e.type];
	for(i in es){
		es[i].call(this,e);
	}
};


/* addEvent对象IE配对浏览器方法
 *
 *@event 事件对象
 *@addEvent.fiag 为true则取消默认冒泡
 *
 *
 *无返回
*/
addEvent.IeEvent = function(event){
	if(typeof addEvent.flag === 'boolean' && addEvent.flag === 'true'){

        event.cancelBubble = true;

	}

	return event;
};




/*
 *模拟触发事件  目前只支持模拟鼠标事件  2016.5.23  //注意 所有的浏览器都会阻止默认行为
 *
 *@ obj    document对象
 *
 *@ type   事件的类型 如'click'
 *
 *@ flag   是否冒泡 ture = 冒泡 false = 不冒泡 不输入则默认冒泡
 *
 *无返回
*/
function startEvent(obj,type,flag){

    if(navigator.userAgent.indexOf('MSIE 6.0')>0 ||  navigator.userAgent.indexOf('MSIE 7.0')>0 || navigator.userAgent.indexOf('MSIE 8.0')>0){   //IE 678

    	var evt = document.createEventObject();
        obj.fireEvent('on'+type,evt);
            
    }else {  //非IE 678
        
        var evt = document.createEvent('MouseEvents');
        evt.initEvent(type,flag,true);
        obj.dispatchEvent(evt);

    }
};


/*
 *浏览器预先加载， 不用等图像和外部文件加载完成就可以触发 DOM完成触发 
 *
 *！！注意一些W3C特别老的浏览器没有做兼容
 *
 *@ fn =需要执行的函数
 *
 *无返回
*/
function Domload(fn){

	var timer = null;

	if(typeof document.addEventListener !== 'undefined'){        //W3C
          addEvent(document,'DOMContentLoaded',function(){
          	fn();
          	removeEvent(document,'DOMContentLoaded',arguments.callse) //arguments.callse获得传入的函数 可以获得匿名函数
          });

	} else{   //IE 678
       
       timer = setInterval(function(){
       	if(document && document.getElementById && document.getElementsByTagName && document.body){
            fn();
            clearInterval(timer);
            return ;
       	}
       },1);
	}
}


/*
 *创建cookie
 *
 *
 *@name cookie名 @value cookit值
 *
 *@time cookit存在时间  @path cookie文件下  @domain 域名
 *
 *@https 是否加密
 *
 *
 *返回编码后文本  字符串形式 &用作连接符
*/
function setCookie (name,value,time,path,domain,https){
  var CookieText  = encodeURIComponent(name)+'='+encodeURIComponent(value);

  if(time instanceof Date){
    CookieText += '; expires='+time;
  }

  if(path){
    CookieText += ';path='+path;
  }else{
    CookieText += ';path=/';
  }

  if(domain){
    CookieText += ';domain='+domain;
  }
  
  if(https){
    CookieText += ';secure';
  }

  document.cookie = CookieText;

}




/*
 *获取cookie
 *
 *
 *@name cookie名
 *
 *
 *
 *返回对应cookie名的值
*/

function getCookie(name){
  var CookieName = encodeURIComponent(name) +'=';
  var CookieStart = document.cookie.indexOf(CookieName);
  var CookieValue = null;

  if(CookieStart > -1){
    var CookieEnd = document.cookie.indexOf(';',CookieStart);
    if(CookieEnd === -1){
      CookieEnd = document.cookie.length;
    }
    CookieValue  = decodeURIComponent(document.cookie.substring(CookieStart+CookieName.length,CookieEnd));
  }

  return CookieValue;

}



/*
 *删除cookie
 *
 *
 *@name cookie名
 *
 *
 *
 *无返回
*/
function deleteCookie(name){
 document.cookie = name +"=; expires ="+new Date(0)+" ; path=/";

}




/*
 *设置cookie失效天数
 *
 *
 *@day 输入天数
 *
 *
 *
 *返回设置的Date 对象
*/
function setCookieDate(day){
  if(typeof day === 'number' && day>0){
    var date = new Date();
    date.setDate(date.getDate()+day);
  }else{
    throw new Error('设置天数 输入类型不正确');
  }

  return date;
}





/*
 *对象字符串编码  用来给Ajax提供编码
 *
 *
 *@对象，内容是字符串
 *
 *
 *返回编码后文本  字符串形式 &用作连接符
*/
function codeURI(data){
	var code = [];

	for( i in data){
		code.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
	}

	return code.join('&');

}




/*
 *兼容方式创建Ajax对象 
 *
 *
 *返回AJax对象
*/
function CreateAjax(){
	if(typeof XMLHttpRequest !== 'undefined'){
		return new XMLHttpRequest();

	}else if(typeof ActiveXObject !== 'undefined'){

		var buff = [
		             'MSXML2.XMLHTTP.6.0',
		             'MSXML2.XMLHTTP.5.0',
                 'MSXML2.XMLHTTP.4.0',
                 'MSXML2.XMLHTTP.3.0',
                 'MSXML2.XMLHTTP',
                 'Microsoft.XMLHTTP'

		           ];

		for(var i =0; i<buff.length; i++){

		    try{
              
              return new ActiveXObject(buff[i]);

			}catch(e){

			}

		}
		
	}else{
		throw new Error('浏览器环境不支持Ajax');
	}
}



/*Ajax对象封装
 *
 *@传入对象obj
 *
 *
 *obj.type = POST还是GER方式   obj.url = 发送地址  obj.data对象 = 发送数据  obj.flag = 是否异步发送 fasle是同步发送
 *
 *提供一个发送成功回调方法 .success(text)   text为接收内容  如果出错则alert错误信息
 *
 *
 *返回AJax对象
*/
function Ajax(obj){

	var ajax = CreateAjax();
	//obj.url = obj.url+'rand?'+Math.random();
	obj.data = codeURI(obj.data);
 
  //GET
	if(obj.type === 'get'){
		obj.url += obj.url.indexOf('?') == -1 ? '?'+obj.data : '&'+obj.data;
	}

  //回调
	ajax.onreadystatechange = function(){
		if(ajax.readyState === 4 ){
			if(ajax.status === 200){
				obj.success(ajax.responseText);
			}else{
				alert('错误代码'+ajax.status+'错误信息:'+ajax.statusText);
			}
		}

	}

  //POST  
   ajax.open(obj.type , obj.url , obj.flag ) ;

   if(obj.type === 'post'){
   	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded charset=utf-8");
   	ajax.send(obj.data);
   }else{
    ajax.send(null);
   }

   //同步
   if(obj.flag === false){

			if(ajax.status === 200){
				obj.success(ajax.responseText);
			}else{
				alert('错误代码'+ajax.status+'错误信息:'+ajax.statusText);
			}

   }

}




/*JSON解析器  为了IE6 7等低版本不兼容JSON用的   
 *
 *
 *@输入JSON文本 text   例如'[{"name":"wk"},{"age":100}]' 等等 
 *
 *
 * 返回处理后的对象
*/

function json_parse (source){

	var index,   //字符索引
	    ch,      //当前字符
      value,   //值函数声明
	//特殊字符
	escapee = {
		'"' : '"',
		'\\' : '\\',
		'/' : '/',
		b : 'b',
		f : '\f',
		n : '\n',
		r : '\r',
		t : '\t'
	},
	//json文本
	text,
    //错误提示
    error = function(message){
     throw{
     	name :'解析出错',
     	message : message,
     	index : index,
     	text : text
     };

    },
    //配对查找下一个字符，如果没有返回空字符
    next = function(c){
    	if(c && c!== ch){
    		error('错误字符'+c+"不匹配"+ch);
    	}

    	ch = text.charAt(index);
    	index += 1;
    	return ch;
    },

    //跳过空白
    white = function(){
      while(ch && ch <= ' '){
        next();
      }
    },

    //解析数字
    number = function(){
    	var number,
    	    string = ' ';
          //如果是负的
    	    if(ch === '-'){
    	       string = '-';
             next('-');	
    	    }

          while(ch >= '0' && ch <= '9'){
            string += ch;
            next();
          }
          //如果是小数
          if( ch === '.'){
            string += '.';
            while(next() && ch >= '0' && ch <= '9'){
              string += ch ;
            }
          }
         //指数
         if( ch === 'e' || ch === 'E'){
          string += ch;
          next();
          if(ch === '-' || ch === '+'){
            string += ch;
            next();
          }
         }

         number = +string;
         //如果不正确
         if(isNaN(number)){
          error('错误的数字');
         }else{
          return number;
         }

    },

    //解析字符串

    string = function(){

      var hex,
          i,
          string = '',
          //字符16进制编码
          uffff;
          
          //找到"和\字符

          if(ch === '"'){
            while(next()){
              if(ch === '"'){ //空字符串
                next();
                return string;
              }else if(ch === '\\'){    //查找是否有\符号特殊字符  
                next();
                if(ch === 'u'){
                  uffff = 0;
                  for(i = 0; i<4 ; i++){
                    hex = parseInt(next(),16);
                    if(! isFinite(hex)){
                      break;
                    }
                    uffff = uffff*16 +hex;
                  }
                  string += String.fromCharCode(uffff); //转码
                }else if(typeof escapee[ch] === 'string'){   //检查特殊字符
                  string += escapee[ch];

                }else{
                  break;
                  }

              }else{
                string += ch;
              }
            }
          }
          error('不是字符串');

    },

    //解析 true false null
    word = function(){
      switch(ch){

        case 't':
         next('t');
         next('r');
         next('u');
         next('e');
         return true;

         case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return false;

         case 'n':
         next('n');
         next('u');
         next('l');
         next('l');
         return null;
      }
      error('错误的字符'+ch);

    },


    //数组和对象  循环递归降序
    //解析数组值

    array = function(){
      var array = [];
      if(ch === '['){
        next('[');
        white();
      //空数组
      if(ch === ']'){
        next(']');
        return array;
      }
      
      while(ch){
        array.push(value());    //递归继续解析下一层
        white();
        if(ch === ']'){
          next(']');
          return array;
        }
        next(',');
        white();
      }
    }
    error('错误的数组');
  },

  //解析一个对象
  object = function(){
    var key,
    object = {};

    if(ch === '{'){
      next('{');
      white();
      //空对象
      if(ch === '}'){
        next('}');
        return object;
      }

      while(ch){
        key = string();
        white();
        next(':');
        object[key] = value();  //递归继续解析下一层
        white();
        if(ch === '}'){
          next('}');
          return object;
        }
        next(',');
        white();

      }
    }
    error('错误的对象');
  },

  //解析一个JSON值， 数字 字符串 数组 词  在数组和对象里面递归调用降序
value = function(){
  white();
  switch(ch){
    case '{':
    return object();
    case '[':
    return array();
    case '"':
    return string();
    case '-':
    return number();
    default:
      return ch >= '0' && ch<= '9'? number() : word();
  }
};

//返回json_parse函数
return function(source){

  var result;
  text = source;
  index = 0;
  ch = ' ';
  result = value();
  white();

  if(ch){
    error('输入值错误');
  }
  return result;

 }(source);

};





/**********************************************************************************************************************************
 *
 *我的封装库
 *
 *最后修改时间2016.6.9
 *
 *
 *   注意动画队列那里有问题待解决~主要是队列全部集中在window下的Queue中了 如果标题栏和轮播都使用队列 那么会有延时影响的问题
                                    
                                   如果把队列绑定在$wk_Base下面 那么会出现间隔执行的问题 比如标题栏抖动
                           
                                   目前思路 由于定时器是绑定在this.Elemenet[0].time属性上 可以使用wk('#advertisement img').nodeOf(index).returnElement(0).time访问到
 
                                   那么能不能按照JQuery的判断当前动画是否在执行原理 来处理间隔问题？  待尝试

                                   注意 6.5号尝试用类似JQuery的STOP方法来阻止动画队列失败~ 原因是还是有抖动问题 还有 STOP可能需要待判断当前动画是否在执行之后 在改进



                                   2016.6.4  遗留问题 待解决
 *
 *
 *
 *
 *@ tag如果是字符串 则按类CSS选择器方式解析 
 *@ 如果是对象则添加到this.Element[0]
 *@ 如果是函数 则加载到预加载DOMload()里面去
 *
 *
 *
 **********************************************************************************************************************************
*/
function $Wk_Base(tag){
 
   this.Element = []; //保存节点的数组

   //this.Time =[];     //保存定时器队列的数组

    
   if(typeof tag === 'string'){   // 传入的是字符串=类CSS选择器
      
       if(tag.indexOf(' ') !== -1 ){ //有空格 不是find方式
          
          var elements = tag.split(' '); //按空格分割
          var parent = [];               //暂存父节点 用于循环
          var Node = [];                 //选取的节点
          var temp = [];                 //中转数组

          for(var i =0; i<elements.length; i++){
          	  if(parent.length === 0){parent.push(document);}
               
               switch(elements[i].charAt(0)){

                   case '#':
                      Node = [];  //只要最后一次
                      Node.push(this.elementId(elements[i].substring(1)));
                      parent = Node;
                      break;

                   case '.':
                      Node = []; //只要最后一次 
                      for(var j =0; j<parent.length; j++){

                        temp = this.elementClass(elements[i].substring(1),parent[j]);

                      	for(var k = 0; k<temp.length; k++){
                           Node.push(temp[k]);
                      	}
                      }
                      parent = Node;  //第一次i循环保存 最后一次则和parent没关系了  
                      break;
                 
                   default:
                      Node = [];
                      for(var j=0; j<parent.length;j++){
                      	temp = this.elementTagName(elements[i],parent[j]);

                      	for(var k =0 ; k<temp.length; k++){
                      		Node.push(temp[k]);
                      	}
                      }
                      parent = Node; 

               }
             }
             this.Element = Node;
            
         }else{    //find方式
             
             switch(tag.charAt(0)){

             	case '#':
             	   this.Element.push(this.elementId(tag.substring(1)));
             	   break;
             	   
             	case '.':
             	   this.Element = this.elementClass(tag.substring(1));
             	   break;

             	default:
             	   this.Element = this.elementTagName(tag);       
             }
          }

       }else if(typeof tag === 'object'){          //传入的是对象
          if(tag !== undefined){
          	this.Element[0] = tag;
          }

       } else if(typeof tag === 'function'){          //传入的是函数
          Domload(tag);
       }   
   }



/********************************************************关于doucment 的一系列操作******************************************/

/*
 *从保存节点的数组里面返回节点
 *
 *@index 索引号 如果不输入index则返回this.Element[0]
 *
 *返回 document.Element类型节点
 */
$Wk_Base.prototype.returnElement = function(index){

    var index_num ;

    if(arguments.lengt == 0){

    	index_num = Math.round(index);
	    if(index_num < 0)
		{
			alert('索引不能小于0');
			return null;
		}

	    return this.Element[index_num];

    }else{
    	return this.Element[0];
    }
};



/*
 *从保存节点的数组里面返回首节点
 *
 *
 *
 *返回 document.Element类型节点
 */
$Wk_Base.prototype.first = function(){
	return this.Element[0];
}


/*
 *从保存节点的数组里面返回尾节点
 *
 *
 *
 *返回 document.Element类型节点
 */
$Wk_Base.prototype.last = function(){
	return this.Element[this.Element.length-1];
}



/*
 *按照id获取节点
 *
 *@ id节点ID
 *
 *返回this
 */
$Wk_Base.prototype.elementId = function(id){
	return document.getElementById(id);
};

/*
 *按照class获取节点数组
 *
 *@ id节点ID
 *@ classname类名
 *
 *返回this
 */
$Wk_Base.prototype.elementClass = function(classname,parent){
 	 var buff = [];
 	 var temp = [];
 	 var node;

 	 if(arguments.length === 0)
 	 {
 	 	alert('getClass 方法输入参数不能为空');
 	 	return temp;
 	 }


     if(parent !== undefined){ //parent是对象 不存在没有''
        node = parent;
     }else{
     	node = document;
     }

 	 buff = node.getElementsByTagName("*");

 	 for(var i=0, len = buff.length; i<len; i++){
 	 	if( (new RegExp('(\\s|^)'+classname+'(\\s|$)') ).test(buff[i].className)){
 	 	   temp.push(buff[i]);
 	 	}
 	 }

 	 return temp;
 };

 /*
 *按照节点名字获取节点数组
 *
 *@ id节点ID
 *@ classname类名
 *
 *返回this
 */
$Wk_Base.prototype.elementTagName = function(name,parent){
 	 var buff = [];
 	 var temp = [];
 	 var node;

 	 if(arguments.length === 0)
 	 {
 	 	alert('elementTagName 方法输入参数不能为空');
 	 	return temp;
 	 }

 	 if(parent !== undefined){
 	 	node = parent;
 	 }else{
 	 	node = document;
 	 }

 	 buff = node.getElementsByTagName(name);

 	 for(var i=0, len = buff.length; i<len; i++){
 	 	
 	 	 temp.push(buff[i]);

 	 }

 	 return temp;
 };



 /*
 *类CSS选择器的 子节点选择器
 *
 *@ str = 类似CSS风格 '#xxx'  '.xxxx' 'xxx'风格获取节点
 *@ str =  字符串文本
 *
 *返回this
 */
$Wk_Base.prototype.find = function(str){
	var childer = [];
	var temp = [];
	var len,

    len = this.Element.length;
	for(var i =0; i<len; i++){

		switch(str.charAt(0)){

			case '#':
			   childer.push(this.elementId(str.substring(1)));
			   break;

			case'.':
			   temp = this.elementClass(str.substring(1) , this.Element[i]);
			  for(var j =0; j<temp.length ;j++){
			  	childer.push(temp[j]);
			  }   
			  break;

			default:
			   temp = this.elementTagName(str , this.Element[i]);
			   for(var j =0; j<temp.length; j++){
			   	childer.push(temp[j]);
			   }
		}
	}

	this.Element = childer;
	return this;
};




/*
 *获取节点的全部子节点
 *
 *@ id节点ID PS如果id不输入 则查找this.Element[0]
 *
 *返回this
 */
$Wk_Base.prototype.childerNode = function(id){
    var father;
    var links;

    if(arguments.length === 0){

    	father = this.Element[0];
    	if(! father.hasChildNodes){

		     alert('该节点没有子节点');
		    
		}else{
		    links = father.childNodes;
		    this.Element = [];   //先清除子节点

		    for(var i =0, len = links.length; i<len; i++){

		        if(links[i].nodeType === 1){

		            this.Element.push(links[i]);
		        }
		    }
		}

    }else {

	    father = document.getElementById(id);
		if(! father.hasChildNodes){

		     alert('该节点没有子节点');
		    
		}else{
		    links = father.childNodes;
		    this.Element = [];   //先清除子节点

		    for(var i =0, len = links.length; i<len; i++){

		        if(links[i].nodeType === 1){

		            this.Element.push(links[i]);
		        }
		    }
		}	
    }

     return this;
 };


/*
 *选择集合中需要操作的节点
 *
 *@index是节点的索引
 *
 *！！使用这个函数之后this.Element[0]为选择的节点 数组只有一个节点之前的都舍弃了
 *
 *返回this
*/
$Wk_Base.prototype.nodeOf = function(index){

	var Element;

	if(Math.round(index)<0)
	{
		alert('索引不能小于0');
		return this;
	}

    Element = this.Element[Math.round(index)];
    this.Element = []; //数组清空
    this.Element[0] = Element;

    return this;

};


/*
 *获取选择节点的全部兄弟节点
 *
 *@index是节点的索引 如果输入参数为空 默认选择this.Element[0]
 *
 *@全部兄弟节点到this.Element数组
 *
 *返回this
*/
$Wk_Base.prototype.brotherNode = function(index){

    var links,
        Element,
        index_num;

        index_num = Math.round(index);


    if(arguments.length === 1){
	    if(index_num<0)
		{
	    	alert('brotherNode方法的索引不能小于0');
			return this;
		}
	     
		Element = this.Element[index_num];

		links = Element.parentNode.childNodes;

		this.Element = []; //清空一下节点保存数组

		for(var i=0 , len =links.length; i<len ;i++){

			if(links[i].nodeType == 1){

				if(links[i] !== Element){
					this.Element.push(links[i]);
				}
			}
		}

    }else{

    	Element = this.Element[0];

		links = Element.parentNode.childNodes;

		this.Element = []; //清空一下节点保存数组

		for(var i=0 , len =links.length; i<len ;i++){

			if(links[i].nodeType == 1){

				if(links[i] !== Element){
					this.Element.push(links[i]);
				}
			}
		}

    }

    

	return this;
};



/*
 *获取选择节点的下一个兄弟节点
 *
 *
 *@下一个兄弟节点重新装入this.Elemenet
 *
 *返回this
*/
$Wk_Base.prototype.next = function(){
	for(var i =0; i<this.Element.length;i++){
		this.Element[i] = this.Element[i].nextSibling;
		if(this.Element[i] == null) {throw new Error('没有下一个节点');}
		if(this.Element[i].nodeType == 3) {this.next();}

	}

	return this;
}



/*
 *获取选择节点的上一个兄弟节点
 *
 *
 *@上一个兄弟节点重新装入this.Elemenet
 *
 *返回this
*/
$Wk_Base.prototype.prev = function(){
	for(var i =0; i<this.Element.length;i++){
		this.Element[i] = this.Element[i].previousSibling;
		if(this.Element[i] == null) {throw new Error('没有上一个节点');}
		if(this.Element[i].nodeType == 3) {this.prev();}

	}

	return this;
}



/*
 *在节点元素后面插入一个新节点
 *
 *
 *New_Element @要插入的新节点   @index选择的节点索引 不输入默认选择this.Element[0];
 *
 *
 *返回this
*/
$Wk_Base.prototype.insert = function(newElemnt ,index){

  var Elemnt;

  if(arguments.length === 2){
    Elemnt = this.Element[index];
  }else{
    Elemnt = this.Element[0];
  }

  var Node = Elemnt.parentNode;
  if(Node.lastchild == newElemnt)
  {
    Node.appendChild(NewElemnt)
    }
    else
    {
      Node.insertBefore(newElemnt,Elemnt.nextSibling);
      }

      return this;
}






/*
 *显示和设置节点的html
 *
 *@Html不为空则设置 类似$WK_Base.html("<div></div>") 
 *@html为空则返回节点的html 
 *
 *输入参数为空返回节点的innerHTML 不为空返回this
 */
$Wk_Base.prototype.html = function(html){

	var returns;

	var Max = this.Element.length;

	if(Max === 0)
	{
		alert('元素节点不存在');
		return this;
	}

	if(typeof html !== 'undefined' && typeof html === 'string'){

		for(var i = 0; i<Max; i++){
		    this.Element[i].innerHTML = html;
		    
		}
         return this;
	}else{
		if(Max>1){
			returns = this.Element[0].innerHTML+"\n";
	     	for(var i = 1; i<Max; i++){
		       returns += this.Element[i].innerHTML+"\n" ;
	 	    }
	 	    return returns;
     	}else{
		    return this.Element[0].innerHTML;
	}

	}
};



/*
 *
 *显示和设置节点的TEXT   表单的value另外一个 这个是非表单的
 *
 *@HTML不为空则设置  类似$WK_Base.val('我是文本')
 *@val为空则返回节点的文本
 *
 *输入参数为空返回节点的innerTEXT 不为空返回this
*/
$Wk_Base.prototype.val = function(val){
    var returns;

	var Max = this.Element.length;

	if(Max === 0)
	{
		alert('元素节点不存在');
		return this;
	}

	if(typeof val !== 'undefined' && typeof val === 'string'){

		for(var i = 0; i<Max; i++){
		    this.Element[i].innerText = val;
		    
		}
         return this;
	}else{
		if(Max>1){
			returns = this.Element[0].innerText+"\n";
	     	for(var i = 1; i<Max; i++){
		       returns += this.Element[i].innerText+"\n" ;
	 	    }
	 	    return returns;
     	}else{
		    return this.Element[0].innerText;
	}

	}
};


/********************************************************关于css 的一系列操作******************************************/
/*
 *兼容方式获取计算后的style值
 *
 *@如果style参数不输入则返回计算后的Style
 *
 *@如果输入style参数则设置Element的sytle
 *
 *@如果this.Element是多个值，那么返回计算后的style集合数组 设置也同理
 *
 *返回this
 */
$Wk_Base.prototype.css = function(attr,value){

	var len = this.Element.length;

	var buff=[] ;

	if(len === 0)
	{
	    alert('元素节点不存在');
	    return this;
	}

	if(arguments.length === 1){
		for(var i=0;i<len;i++){

			if(typeof window.getComputedStyle !== 'undefined'){   //WC3

				buff.push(window.getComputedStyle(this.Element[i],null)[attr]);

			}else if(typeof this.Element[i].currentStyle !== 'undefined'){   //IE

				buff.push(this.Element[i].currentStyle[attr]);
			}
       }
       return buff;
	}else if(arguments.length === 2){
		for(var i=0;i<len;i++){
	       this.Element[i].style[attr] = value;
	    }

	}

	return this;
};

/*
 *获取节点属性值  index不输入默认选择this.Element[0]
 *
 *#name = 要查询的属性
 *
 *返回查询的属性的值
*/
$Wk_Base.prototype.getAttr = function(name,index){
	var index_num;
	
	if(arguments.length === 2){
		index_num = Math.round(index);
	}else{
		index_num = 0;
	}
	//console.log(this.Element[index_num]);
	
	return this.Element[index_num].getAttribute(name);
}


/*
 *设置节点属性值  index不输入默认选择this.Element[0]
 *
 *@name = 要设置的属性名
 *@value = 要设置的值
 *
 *返回查询的属性的值
*/
$Wk_Base.prototype.setAttr = function(name,value,index){
	var index_num;
	
	if(arguments.length === 3){
		index_num = Math.round(index);
	}else{
		index_num = 0;
	}
	//console.log(this.Element[index_num]);
	
	return this.Element[index_num].setAttribute(name,value);
}


/*
 *添加CSS样式
 *
 *@输入样式表名
 *
 *返回this
*/
$Wk_Base.prototype.addClass = function(classStyle){
	for(var i=0, len = this.Element.length; i<len ;i++){

        if(! this.Element[i].className.match(new RegExp('(\\s|^)'+classStyle+'(\\s|$)')) ){

        	this.Element[i].className += ' '+classStyle;
        }
	}

	return this;
}


/*
 *移除样式表名
 *
 *@输入样式表名
 *
 *返回this
*/
$Wk_Base.prototype.removeClass = function(classStyle){
	for(var i=0, len = this.Element.length; i<len ;i++){

        if( this.Element[i].className.match(new RegExp('(\\s|^)'+classStyle+'(\\s|$)')) ){

        	this.Element[i].className = this.Element[i].className.replace(new RegExp('(\\s|^)'+classStyle+'(\\s|$)') , ' ' );
        }
	}

	return this;
};


/*
 *添加外部style link规则
 *
 *@ num link标签索引
 *@ selectText 选择CSS文本
 *@ cssText 添加的css内容
 *@ post  CSS文本的位置索引
 *返回this
*/
$Wk_Base.prototype.addRule = function(num, selectText, cssText, post){
	var sheet = doucment.styleSheets[num];

	if(typeof sheet.insertRule !== 'undefined'){   //W3C

        sheet.insertRule(selectText+'{'+cssText+'}',post)

	} else if(typeof sheet.addRule !== 'undefined'){   //IE

		sheet.addRule(selectText,cssText,post);

	}
	return this;
}


/*
 *移除外部style link规则
 *
 *@ num link标签索引
 *@ post  CSS文本的位置索引
 *返回this
*/
$Wk_Base.prototype.removeRule = function(num, post){
	var sheet = doucment.styleSheets[num];

	if(typeof sheet.deleteRule !== 'undefined'){   //W3C

		sheet.deleteRule(index);

	}else if(typeof sheet.removeRule !== 'undefined'){   //IE

         sheet.removeRule(index);
    
	}

	return this;
};


/*
 *设置节点位置自适应居中
 *
 *@ index = 需要设置节点的索引，如果未输入 则设置全部this.Element
 *!!!!!!!!!注意 CSS必须设置position: absolute;
 *
 *返回this
*/
$Wk_Base.prototype.setCenter = function(index){
   
   var index_num;

   var top,
       left;

   if(arguments.length === 0){
       
       index_num = this.Element.length;
       for(var i =0 ;i<index_num; i++){
          


          top = ( Getinner().height - parseInt(getStyle(this.Element[i],'height')) )/2;
          left = ( Getinner().width - parseInt(getStyle(this.Element[i],'width')) )/2;

          this.Element[i].style.top = top+'px';
          this.Element[i].style.left = left+'px';
       }
     
   }else{

       index_num = Math.round(index);;
       
       top = ( Getinner().height - parseInt(getStyle(this.Element[i],'height')) )/2;
       left = ( Getinner().width - parseInt(getStyle(this.Element[i],'width')) )/2;

       this.Element[index_num].style.top = top+'px';
       this.Element[index_num].style.left = left+'px';
   }

   return this;
}


/*
 *设置隐藏
 *
 *@ index = 需要隐藏节点的索引，如果未输入 则隐藏全部this.Element
 *
 *返回this
*/
$Wk_Base.prototype.hide = function(index){
     
    var index_num;

    if(arguments.length === 0){
        
        index_num = this.Element.length;

        for(var i = 0; i<index_num; i++){
        	this.Element[i].style.display = 'none';
        }

    }else{

        index_num = Math.round(index);
        this.Element[index_num].style.display = 'none';
    }
	
    return this;
};


/*
 *设置显示
 *
 *@ index = 需要显示节点的索引，如果未输入 则显示全部this.Element
 *
 *返回this
*/
$Wk_Base.prototype.show = function(index){

	var index_num;

    if(arguments.length === 0){
        
        index_num = this.Element.length;

        for(var i = 0; i<index_num; i++){
        	this.Element[i].style.display = 'block';
        }

    }else{

        index_num = Math.round(index);
        this.Element[index_num].style.display = 'block';
    }
	
    return this;
}

/********************************************************关于事件 的一系列操作******************************************/



/*
 *鼠标点击事件
 *
 * @ index = 需要操作节点的索引，如果未输入 则操作全部this.Element
 *
 * @ fn =操作的函数；
 *
 *返回this
*/
$Wk_Base.prototype.click = function(fn,index){
	var index_num;

    if(arguments.length === 1){
        
        index_num = this.Element.length;

        for(var i = 0; i<index_num; i++){
            addEvent(this.Element[i],'click',fn);	
        }

    }else if(arguments.length === 2){

    	addEvent(this.Element[index.num],'click',fn);
        
    }
	
    return this;
}




/*
 *鼠标连续点击事件
 *
 * @输入FN函数  输入对象在argumnets里面获取
 *
 *返回this
*/
$Wk_Base.prototype.toggle = function(){
	for(var i =0; i<this.Element.length;i++){

		(function(element,arg){
			var count = 0;
				addEvent(element,'click',function(){

					arg[count].call(this);
				    count++;
				    if(count === arg.length){count =0;}
				});

		})(this.Element[i],arguments);
	}
}




/*
 *鼠标移入移出事件
 *
 *@over 鼠标移入事件
 *@out  鼠标移出事件
 *
 *！！！！！！！！！这里留一个可能会出现的坑 关于事件冒泡 如果子DIV设置了 那么鼠标移动到父DIV中会先触发out在触发over 待后期处理
 *！！！！！！！！！处理方法是out事件用setTimeout做延时发生 在over中clearTime()掉
 *
 *@ index = 需要设置节点的索引，如果未输入 则设置全部this.Element
 *
 *返回this
*/
$Wk_Base.prototype.hover = function(over,out,index){

	var index_num;

	if(typeof over !== 'function' || typeof out!== 'function'){
		alert('设置事件over out类型不为函数');
		 return this;
	}


    if(arguments.length === 3){
        
        index_num = Math.round(index);
       // this.Element[index_num].onmouseover = over;
       // this.Element[index_num].onmouseout = out;

        addEvent(this.Element[index_num],'mouseover',over);
        addEvent(this.Element[index_num],'mouseout',out);

    }else{

         index_num = this.Element.length;

        for(var i = 0; i<index_num; i++){
        	//this.Element[i].onmouseover = over;
            //this.Element[i].onmouseout = out;
            
            addEvent(this.Element[i],'mouseover',over);
            addEvent(this.Element[i],'mouseout',out);

        }
    }
	
    return this;
};



/*
 *物体拖拽
 *
 *注意：需要使用到该节点 onmouseDown onmouseUp onmouseMove事件
 *      CSS必须设置position: absolute;
 *
 *@ index = 需要处理节点的索引，如果未输入 则处理this.Element[0]
 *
 *
 *无返回
*/
$Wk_Base.prototype.drag = function(index){
	var index_num;
	var e,
	    obj;

	var diffx,
	    diffy,
	    //style
	    left,
	    top;

	if(arguments.length === 0){

		obj = this.Element[0];

		obj.onmousedown = function(e){    //如果用event||window.event 那么必须function(event)不能是e
            e = arguments[0]||window.event;

            //解决IE独有的鼠标超出浏览器不能获取的问题
            if(typeof this.setCapture !== 'undefined'){ obj.setCapture();}

			diffx = e.clientX - obj.offsetLeft;
			diffy = e.clientY - obj.offsetTop;
            
            document.onmousemove = function(e){
            	e = arguments[0]||window.event;
            	                 
                 left = e.clientX - diffx;
                 top = e.clientY - diffy;

                //防止左右超出
                if(left <0){
                	left = 0;
                }else if(left > Getinner().width - obj.offsetWidth){
                	left = Getinner().width - obj.offsetWidth;
                }

                //防止上下超出
                if(top <0){
                	top = 0;
                }else if(top > Getinner().height - obj.offsetHeight){
                	top = Getinner().height - obj.offsetHeight;
                }

                obj.style.left = left+'px';
                obj.style.top = top+'px';
            }


            document.onmouseup = function(){
            	  //解决IE独有的鼠标超出浏览器不能获取的问题
                if(typeof this.releaseCapture !== 'undefined'){ obj.releaseCapture();}

            	document.onmousemove = null;
            	document.onmouseup = null;
            }
			


		}

	} else{
		index_num = Math.round(index);

		obj = this.Element[index_num];

		obj.onmousedown = function(event){
            e = event||window.event;

            //解决IE独有的鼠标超出浏览器不能获取的问题
            if(typeof this.setCapture !== 'undefined'){ obj.setCapture();}

			diffx = e.clientX - obj.offsetLeft;
			diffy = e.clientY - obj.offsetTop;
            
            document.onmousemove = function(e){
            	e = event||window.event;
            	                 
                 left = e.clientX - diffx;
                 top = e.clientY - diffy;

                //防止左右超出
                if(left <0){
                	left = 0;
                }else if(left > Getinner().width - obj.offsetWidth){
                	left = Getinner().width - obj.offsetWidth;
                }

                //防止上下超出
                if(top <0){
                	top = 0;
                }else if(top > Getinner().height - obj.offsetHeight){
                	top = Getinner().height - obj.offsetHeight;
                }

                obj.style.left = left+'px';
                obj.style.top = top+'px';
            }


            document.onmouseup = function(){
            	  //解决IE独有的鼠标超出浏览器不能获取的问题
                if(typeof this.releaseCapture !== 'undefined'){ obj.releaseCapture();}

            	document.onmousemove = null;
            	document.onmouseup = null;
            }
	    }
    }
};





/*
 *
 *动画实现      ！！注意CSS需要设置绝对定位    注意 如果是width fontSize等 不需要输入 +或-
 *
 *
 *@obj = 执行的参数的对象 包括执行类型 目标终点  执行步长 执行缓冲 缓冲步长等   
 *
 *执行类型和目标终点必须输入  
 *
 *目标终点类型如  100 表示向前 -100表示向后   如果是opacity类型 ‘+10’ 理解成+0.1透明度 依次类推 opacity类型 上限为100 下限为0
 *
 * 注意 style.left如果不定义取不到值为空  改用offsetLeft改    //这里不行offsetLeft != style.left  off的距离有margin影响
 *
 *
 * 注意 使用动画功能必须设置
 * 如果要使用left right必须设置   left:xxxx; 
 * 如果要使用 top buttom 必须设置 buttom
 * position: absolute;
 *
 *@执行步长默认值：30像素    执行缓冲默认：缓冲   缓冲步长默认：7像素
 *
 *
 *@time = 单次执行时间
 *
 *
 * 返回自身add方法 用来添加动画 和一个start开始方法用来循环队列执行动画
 */

//封装动画
$Wk_Base.prototype.action =function(){

	var Queue = [];         //动画队列
	var action_lock = false;        //动画锁 用来防止重复触发
	var add_lock = true;            //用来阻止后续添加的函数触发执行
    
   
	

	var make = function(element,obj,time,fn){   // 动画效果在这里执行

	    //判断用户输入
		if(arguments.length < 2 ){

	       alert('执行对象和执行时间必须输入');
	       return null;

		}else if(typeof obj !== 'object'){

			alert('对象参数并不是object类型');
			return null;

		}
        
        //行动类型
	    var attr;
      
	    //目标位置提前声明
	    var transfer;


        //用于同步动画的锁
        var syn_lock = true;

	   
	    //获取执行步长
	    var step = obj['step'] !== undefined ? obj['step']:10;  //步长不输入默认为30


	    //获得是否启动缓冲
	    var type = obj['type'] !== undefined ? obj['type'] : 1; //缓冲不输入默认为0 不缓冲


	    //如果不开启缓冲那么不读取缓冲步长
	    if(type === 1){
	    	var type_step = obj['type_step'] !== undefined ? obj['type_step'] : 5;//默认缓冲步长为7
	    }



	     //判断是否是同步动画
	     if(obj['syn'] !== undefined){
            

			   //开始启动定时器处理任务 定时装入队列

			   element.time = setInterval( function(){

			   	for(var k in obj['syn']){

	             	attr =  (k ==='x') ? 'left' :
                            (k ==='y') ? 'top':
                            (k ==='o') ? 'opacity':k;

                    transfer = obj['syn'][k];

                    if(transfer < getStyle(element, attr)) {step = -step;}
                    
				    if(type === 1){
				        step =  (attr === 'opacity')? (transfer - parseFloat(getStyle(element, attr))*100 )/type_step:
				        	                          (transfer - parseInt(getStyle(element,attr)) )/ type_step;
				        step = step > 0? Math.ceil(step):Math.floor(step);

				       // console.log((transfer - parseInt(getStyle(element,attr)) )/ type_step) ;
				    }

                    //执行动画部分

				    if(attr === 'opacity'){   //透明度
               
				        if(step === 0){
				        	Stop_Opacity();
				        }else if(step >0 && Math.abs(parseFloat(getStyle(element,attr))*100 - transfer)<= step ){
				        	Stop_Opacity();
				        }else if(step <0 && (parseFloat(getStyle(element,attr))*100 - transfer) <= Math.abs(step) ){
				        	Stop_Opacity();
				        }else{
				        	element.style[attr] = (parseFloat(getStyle(element,attr))*100 + step) /100;
				        	element.style.filter = 'alpha(opacity='+parseInt(parseFloat(getStyle(element,attr))*100 + step)+')';
				        }
				     
				    }else{   //非透明度，其他行动
                 
				        if(step === 0){
				        	Stop();
				        }else if(step >0 && Math.abs(parseInt(getStyle(element,attr)) - transfer)<= step ){
				        	Stop();
				        }else if(step <0 && (parseInt(getStyle(element,attr)) - transfer) <= Math.abs(step) ){
				        	Stop();
				        }else{
				        	element.style[attr] = parseInt(getStyle(element,attr)) + step+'px';
				        }

				    } 
                     

                    if(transfer !== parseInt(getStyle(element,attr)) ) {syn_lock = false;}


                    if(syn_lock){   //全部完结
                    	clearInterval(element.time);
				             fn();
                    }


				    function Stop_Opacity(){ //透明度停止
				    	if(transfer === 0){
				    		element.style.opacity = transfer;
				    	}else{
				    		element.style.opacity = transfer/100;
				    	}
				    	element.style.filter="alpha(opacity="+transfer+")"; 
				    	syn_lock=true;
				    }

				    function Stop(){  //行动停止

				    	element.style[attr] = transfer+'px';
				    	syn_lock=true;
				    }

			 }  //FOR IN END

	       },time);
            
	     }else{            //非同步动画

		    //开始启动定时器处理任务 定时装入队列

			   element.time = setInterval( function(){

			   
	             	attr =  (obj['x'] !==undefined) ? 'left' :
                            (obj['y'] !==undefined) ? 'top':
                            (obj['o'] !==undefined) ? 'opacity':null;
                    

                    if(attr === null){
	                    var f = 0 //用来获取第一个obj的值 attr类型 随后销毁
	                    for(types in obj){
	                    	if(f === 0){
	                    		attr = types;
	                    		f++;
	                    	}
	                    }

	                    f=null;  //等待销毁
                    }

                    transfer =  (attr === 'left')? obj['x']:
                                (attr === 'top')? obj['y']:
                                (attr === 'opacity')? obj['o']:obj[attr];


                    if(transfer < getStyle(element, attr)) {step = -step;}
                    
				    if(type === 1){
				        step =  (attr === 'opacity') ? (transfer - parseFloat(getStyle(element, attr))*100 )/type_step:
				        	                           (transfer - parseInt(getStyle(element,attr)) ) / type_step;
				        step = step > 0? Math.ceil(step):Math.floor(step);

				       // console.log((transfer - parseInt(getStyle(element,attr)) )/ type_step) ;
				    }

                    //执行动画部分

				    if(attr === 'opacity'){   //透明度
               
				        if(step === 0){
				        	Stop_Opacity();
				        }else if(step >0 && Math.abs(parseFloat(getStyle(element,attr))*100 - transfer)<= step ){
				        	Stop_Opacity();
				        }else if(step <0 && (parseFloat(getStyle(element,attr))*100 - transfer) <= Math.abs(step) ){
				        	Stop_Opacity();
				        }else{
				        	element.style[attr] = (parseFloat(getStyle(element,attr))*100 + step) /100;
				        	element.style.filter = 'alpha(opacity='+parseInt(parseFloat(getStyle(element,attr))*100 + step)+')';
				        }
				     
				    }else{   //非透明度，其他行动
                 
				        if(step === 0){
				        	Stop();
				        }else if(step >0 && Math.abs(parseInt(getStyle(element,attr)) - transfer)<= step ){
				        	Stop();
				        }else if(step <0 && (parseInt(getStyle(element,attr)) - transfer) <= Math.abs(step) ){
				        	Stop();
				        }else{
				        	element.style[attr] = parseInt(getStyle(element,attr)) + step+'px';
				        }

				    } 
                    

				    function Stop_Opacity(){ //透明度停止
				    	if(transfer === 0){
				    		element.style.opacity = transfer;
				    	}else{
				    		element.style.opacity = transfer/100;
				    	}
				    	element.style.filter="alpha(opacity="+transfer+")";
				    	clearInterval(element.time);
				        fn(); 
				    }

				    function Stop(){  //行动停止

				    	element.style[attr] = transfer+'px';
				    	clearInterval(element.time);
				        fn();
				    }


				//console.log(parseFloat(getStyle(element,attr))) ;

	       },time);

		}
    }


	var start = function(){

		if(! action_lock){
			var action_run = Queue.shift();   //动画出队

			if(action_run){  //如果存在

				action_lock = true;       //执行就锁上

				action_run(function(){
					action_lock = false;   //解锁
					start();               //递归循环自身
				});

			}else{
				action_lock = false;   //不存在就解锁
				add_lock = true;       //队列空了就解锁
			} 
		}

	}


	return {   //返回自身对象方法

		//动画进队
		add:function(element,obj,time){
			Queue.push(function(fn){
				make(element,obj,time,fn);
			});

			if(add_lock && Queue.length){
				//阻止后续动画执行
				add_lock = false;

				start(); //第一个开始执行
			}
		}

	}
}();



/*
 *  index为需要处理的节点 不输入默认为this.Element[0]
 *
 *  
 *  @obj 动画需要的参数
 *
 *  @time 单步执行时间
 *
 *
 *
 *
*/
//动画提供给外部的接口
$Wk_Base.prototype.animation = function(obj,time,index){

	var element;

	if(arguments.length === 3){
        element = this.Element[index];
	}else{
		element = this.Element[0];
	}

	this.action.add(element,obj,time);
	return this;

}










/*
 *********************************************
 *库名封装
 *********************************************
 */
var wk = function(tag){
   return new $Wk_Base(tag);
}