




class TokenServer {

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



	removeToken(){
		this.remove('token');
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
       		this.set('token',token,new Date(currentTime));
       		if(onSuccess){
       			onSuccess();
       		}
		}else{
			console.log('设置token失败');
		}
	}


}


export default new TokenServer;