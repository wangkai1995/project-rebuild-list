

class LocalServer {
	constructor(){
		if(!window.localStorage){
			console.log('localStorage 出错了 没有找到window.localStorage')
		}
	}

	set(key,value){
		var value = JSON.stringify(value);
		localStorage.setItem(key,value);
	}

	get(key){
		return JSON.parse( localStorage.getItem(key) );
	}

	remove(key){
		localStorage.removeItem(key)
	}
}


export default new LocalServer;