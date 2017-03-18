
const fetchMiddleware = store => next => action =>{

	if(!action.request || !Array.isArray(action.type)){
		return next(action);
	}

	const [ LOADING , SUCCESS ,ERROR ] = action.type;

	next({
		type : LOADING,
		loading : true,
		// ...action,
	});

	var params = action.params? action.params: null;
		
	action.request( params ).then(function(data){
		//请求是否接受
		if(data.code === '00000'){
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