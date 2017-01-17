'user strict';


module.exports = ['$q', 'cloudBuyModel', 'activityModel', 'goodsModel',function( $q, cloudBuyModel ,activityModel ,goodsModel){
	var self = this;

	//视图数据对象数组
	self.viewData = {};

	//配置请求
	//@method = 输入方法名
	self.requestData = function(method,data){
		var deferred = $q.defer();
		var data = data || '';
		var requestMethod = getRequestMethod(method);

		if(requestMethod){
			//配置Data
			data = setRequestData(method,data);
			//请求数据
			requestMethod(data).then(function(result){
				if(!result.error){
					deferred.resolve(result.result);
				}else{
					deferred.reject({
                        message: '请求出错!',
                        error: result.error
                    });
				}
			});
		}else{
			deferred.reject({
                message: '不存在该方法',
                error: true
            });
		}

		return deferred.promise;
	};

  	//刷新数据
  	//@method = 输入方法名
  	self.doRefresh = function(method){
  		var deferred = $q.defer();
  		if( self.viewData[method] ){
  			var requestMethod = getRequestMethod( self.viewData[method].method );
  			//存在列表的刷新
			if(typeof  self.viewData[method].isMore !== 'undefined'){
				 self.viewData[method].data.page = 1;
				 self.viewData[method].isMore = true;
				requestMethod( self.viewData[method].data).then(function(result){
					if(!result.error){
						deferred.resolve(result.result);
					}else{
						deferred.reject({
	                        message: '请求出错!',
	                        error: result.error
	                    });
					}
				});
			}else{
			//不存在列表的刷新
				requestMethod( self.viewData[method].data ).then(function(result){
					if(!result.error){
						deferred.resolve(result.result);
					}else{
						deferred.reject({
							message: '请求出错',
							error: result.error
						});
					}
				});
			}
  		}else{
  			console.log('刷新数据错误,没有该方法记录');
  			deferred.reject({
                message: '不存在该方法',
                error: true
            });
  		}

  		return deferred.promise;
  	};

  	//加载更多数据
  	//@method = 输入方法名
  	self.loadMore = function(method){
  		var deferred = $q.defer();
  		if(self.viewData[method]){
  			if(self.viewData[method].promise){
	  			var time = setInterval(function(){
	  				if(!self.viewData[method].promise){
	  					clearInterval(time);
			  			loadMoreRequest(deferred,method);
	  				}
	  			},100);
	  		}else{
	  			loadMoreRequest(deferred,method);
	  		}
  		}else{
  			console.log('刷新数据错误,没有该方法记录');
  			deferred.reject({
                message: '不存在该方法',
                error: true
            });
  		}
  		return deferred.promise;
  	}

  	//离开路由范围清空视图对象
  	self.exit = function(){
  		self.viewData = {};
  	}

  	//加载更多数据的发送请求函数
  	//@method = 输入方法名
  	//@deferred = $q服务创建的异步对象
  	function loadMoreRequest(deferred,method){

  		var requestMethod = getRequestMethod(self.viewData[method].method);
  			//存在列表的刷新
			if(typeof self.viewData[method].isMore !== 'undefined'){
				if(self.viewData[method].isMore){
					self.viewData[method].data.page++;
					requestMethod(self.viewData[method].data).then(function(result){
						if(!result.error){
							//判断后续数据是否还有
							if(typeof result.result.total !== 'undefined'){
								if(self.viewData[method].data.page*self.viewData[method].data.pageSize >= result.result.total){
									self.viewData[method].isMore = false;
								}
								deferred.resolve(result.result);
							}
						}else{
							deferred.reject({
		                        message: '请求出错!',
		                        error: result.error
		                    });
						}
						self.viewData[method].promise = false;
					});
					//这个属性用于解决连续多次调用异步的执行顺序问题
					self.viewData[method].promise = true;	
				}else{
					deferred.resolve(false)
				}
			}else{
			//不存在列表的刷新直接返回false
				deferred.resolve(false);
			}
  	}

	//通过方法名获取请求方法
	//@method = 输入方法名
	//#返回请求方法
	function getRequestMethod(method){
		var model = method.split('_')[0];
		switch(model){
			case 'cloudBuy': return cloudBuyModel[method];
			case 'activity': return activityModel[method];
			case 'goods' : return goodsModel[method];

			default : return null;
		}
	};

	//处理请求数据
	//同步self.viewData的page,pageSize为后续的下拉刷新,上拉加载做准备
	function setRequestData(method,data){
		var viewData = {};
		//该方法是否存在页列表
		if(data.page && data.pageSize){
			//方法名,这个值用也作KEY
			viewData.method = method;
			//是否允许加载更多
			viewData.isMore = true;
			//请求数据
			viewData.data = data;
			//放入对象中为后续的下拉刷新,上拉加载做准备
			self.viewData[method] = viewData;
		}else{
			viewData.method = method;
			viewData.data = data;
			//放入对象中为后续的下拉刷新,上拉加载做准备
			self.viewData[method] = viewData;
		}

		return data;
	};


}]