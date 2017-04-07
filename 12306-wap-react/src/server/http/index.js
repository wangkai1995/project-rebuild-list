
import Constant from '../../constant/config';
import Browser from '../../lib/explorer';

import Promises from 'core-js/library//es6/promise';
Promise = Promises;

console.log(JSON.stringify(Browser) );


function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

//fetch
function fetchQequest(config){
	var url = Constant.host + config.url;
	var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if(config.params){
    	url +='?';
    	var keys = Object.keys(config.params);
    	for(var i=0 ;i<keys.length ;i++){
    		if(i+1 < keys.length){
    			url += ''+keys[i]+'='+config.params[ keys[i] ]+'&'
    		}else{
    			url += ''+keys[i]+'='+config.params[ keys[i] ];
    		}	
    	}
    }


    var defer = new Promise(function(resolve, reject){
    	switch(config.method){
			case 'GET':
				fetch(url,{
					method:'GET',
					headers:headers,	
				}).then( result =>{
					result.json().then( data =>{
						resolve(data);
					}); 
				})
				.catch( err =>{
					reject(err);
				});
				break;

			case 'POST':
				fetch(url,{
					method:'POST',
					headers:headers,
					body:toQueryString(config.data),
				}).then( result =>{
					result.json().then( data =>{
						resolve(data);
					}); 
				})
				.catch( err =>{
					reject(err);
				});
				break;

			default:
				resolve('fetch method error');
				break;
	    }
    });

    return defer;
}
 
//ajax
function ajaxQequest(config){
	var ajax = new XMLHttpRequest();
 	var url = Constant.host + config.url;
	 if(config.params){
    	url +='?';
    	var keys = Object.keys(config.params);
    	for(var i=0 ;i<keys.length ;i++){
    		if(i+1 < keys.length){
    			url += ''+keys[i]+'='+config.params[ keys[i] ]+'&'
    		}else{
    			url += ''+keys[i]+'='+config.params[ keys[i] ];
    		}	
    	}
    }
      var defer = new Promise(function(resolve, reject){
    	switch(config.method){
			case 'GET':
				//回调
				ajax.onreadystatechange = function(){
					console.log(ajax.readyState);
					if(ajax.readyState === 4 ){
						if(ajax.status === 200){
							resolve(JSON.parse(ajax.responseText));
						}else{
							reject('错误代码'+ajax.status+'错误信息:'+ajax.statusText);
						}
					}

				}
				ajax.open('GET' , url, true) ;
				ajax.send(null);
				break;

			case 'POST':
				//回调
				ajax.onreadystatechange = function(){
					if(ajax.readyState === 4 ){
						if(ajax.status === 200){
							resolve(JSON.parse(ajax.responseText));
						}else{
							reject('错误代码'+ajax.status+'错误信息:'+ajax.statusText);
						}
					}
				}
				ajax.open('POST' , url, true) ;
			   	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded charset=utf-8");
			   	ajax.send(config.data);
				break;

			default:
				resolve('fetch method error');
				break;
	    }
    });

    return defer;
}


class httpServer {
	constructor(){	
	}
	
	request(config){
		//不兼容浏览器换ajax
		if( (Browser.browser.ie && Browser.engine.ie <10) || (Browser.browser.safari && Browser.browser.safari < 6.1) ){
			console.log(1111111);
			return ajaxQequest(config);
		}else{
			return fetchQequest(config);
		}
	}
}



export default new httpServer;


