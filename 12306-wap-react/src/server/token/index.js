

class TokenServer {
	constructor(){
		if(!document.cookie){
			console.log('tokenServer 出错了 没有找到document.cookie')
		}
	}


	set(key,value,time){
		var value = JSON.stringify(value);
		document.cookie = key+'='+value+';path=/;expires='+time.toGMTString();
	}


	get(key){
		var CookieName = key+'=';
	  	var CookieStart = document.cookie.indexOf(CookieName);
		var CookieValue = null;

		if(CookieStart > -1){
		    var CookieEnd = document.cookie.indexOf(';',CookieStart);
	    	if(CookieEnd === -1){
		      CookieEnd = document.cookie.length;
		    }
		    CookieValue  = JSON.parse( document.cookie.substring(CookieStart+CookieName.length,CookieEnd) );
	    }

		return CookieValue;
	}


	remove(key){

		document.cookie = key +"=; expires ="+new Date(0)+" ; path=/";
	}


	queryToken(){
		var token = this.get('token');
		if(!token){
			return false;
		}
		return token;
	}


	getToken(onDefeated){
		var token = this.get('token');
		if(!token){
			if(onDefeated){
				onDefeated();
			}
			return false;
		}
		return token;
	}


	setToken(token,onSuccess){
		if(token){
			var currentDate = new Date(),
            	currentTime = currentDate.getTime();
       		currentTime = currentTime + token.expires_in*1000;
       		this.set('token',token,currentTime);
       		if(onSuccess){
       			onSuccess();
       		}
		}
		console.log('设置token失败');
	}


}


export default new TokenServer;