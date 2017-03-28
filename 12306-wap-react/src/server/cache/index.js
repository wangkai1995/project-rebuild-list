import LocalServer from '../local/index';


class CacheServer {
	constructor(){
		this.cacheData = {};
	}
	
	//获取缓存
	getCache(key){
		var cacheData = LocalServer.get(key);
		//判断是否有缓存
		if(!cacheData){
			return false;
		}

		//判断缓存是是否过期
		if(new Date().getTime() > cacheData.cacheDate ){
			return false;
		}

		return cacheData.cacheData;
	}
	
	//设置缓存
	//@time = 缓存天数
	setCache(key,value,time){
		if( typeof time !== 'number'){
			console.log('错误的缓存时间,必须是整数类型');
			return false;
		}
		var cacheDate = new Date( (new Date().getTime() + ( time*1000*60*60*24 ) ) ).getTime();
		var cache = {
			cacheDate :cacheDate,
			cacheData: value,
		}
		LocalServer.set(key,cache);
	}
	

}



export default new CacheServer;