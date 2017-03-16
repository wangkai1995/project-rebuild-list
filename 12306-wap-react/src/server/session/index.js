

class SessionServer {
	constructor(){
		if(!window.sessionStorage){
			console.log('sessionServer 出错了 没有找到window.sessionStorage')
		}
	}

	set(key,value){
		var value = JSON.stringify(value);
		sessionStorage.setItem(key,value);
	}

	get(key){
		return JSON.parse( sessionStorage.getItem(key) );
	}

	remove(key){
		sessionStorage.removeItem(key)
	}
}


export default new SessionServer;