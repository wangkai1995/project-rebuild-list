

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
}


export default new TokenServer;