import CacheServer from '../server/cache/index';


const fetchMiddleware = store => next => action =>{

	if(!action.request || !Array.isArray(action.type)){
		return next(action);
	}

	const [ LOADING , SUCCESS ,ERROR ] = action.type;

	//loading
	next({
		type : LOADING,
		loading : true,
	});

	//判断是否存在参数
	var params = action.params? action.params: null;

	//判断是否存在缓存要求
	var cache = action.cache? action.cache: null;

	//如果存在缓存要求
	if(cache){
		//尝试从读取缓存
		var cacheData = CacheServer.getCache(cache.key);
		if(cacheData){
			next({
				type : SUCCESS,
				loading : false,
				payload : cacheData,
			});
			return false;
		}
	}

	//发送请求
	action.request( params ).then(function(data){
		//请求是否接受
		if(data.code === '00000'){
			//检查是否有缓存要求
			if(cache){
				//设置缓存
				CacheServer.setCache(cache.key, data.data , cache.time);
			}
			next({
				type : SUCCESS,
				loading : false,
				payload : data.data,
			});
		}else{
			next({
				type : ERROR,
				loading : false,
				error: data.message,
			});
		}
	},function(err){
		next({
			type : ERROR,
			loading : false,
			error: err,
		});
	}).catch(function(err){
		next({
			type : ERROR,
			loading : false,
			error: err,
		});
	})

}



export default fetchMiddleware;