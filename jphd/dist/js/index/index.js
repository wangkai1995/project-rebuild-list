(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\detaill\\ctrl.js":[function(require,module,exports){
'use strict';

module.exports=['$scope', '$cookies' ,'$stateParams' ,'shadeServices' ,'viewDataServices' ,'goodsModel' ,'oHasLoggin','oDetail',function($scope ,$cookies ,$stateParams ,shadeServices ,viewDataServices ,goodsModel ,oHasLoggin ,oDetail){
	console.log(oHasLoggin);
	console.log(oDetail);

	var vm = this;
		vm.popModel = shadeServices;
		vm.detail = oDetail;
		vm.activityId = $stateParams.activityId;


	//判断是否在其他设备登录
	vm.initHasloggin = function(){
		if(oHasLoggin.error){
			if(oHasLoggin.error.code === -20109){
				$cookies.remove('token');
				vm.popModel.confirm({
					content:'您的账号在其他设备登录',
					button:[
						{
							text:'确定',
							callback:function(){
								vm.popModel.hide();
							}
						}
					]
				});
			}
		}
	}

	//判断是否获奖
	vm.InitactivityResult = function(){
		if(vm.detail.status === 3){
			activityResult();
		}
	}

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('cloudBuy_detail').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.DataList = data;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//获取获奖结果
	function activityResult() {
        var params = {
			"id": vm.activityId,
		};
		goodsModel.goods_result(params).then(function(data){
			if(!data.error){
				vm.tmp = data.result;
				vm.winTime =  new Date(data.result.winTime).Format("yyyy-MM-dd HH:mm:ss");
				console.log(vm.tmp)
			}
		})
    }



	vm.initHasloggin();
	vm.InitactivityResult();

}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\detaill\\route.js":[function(require,module,exports){
'use strict';

module.exports = {
	url: '/detaill/:activityId',
	templateUrl: 'index/cloudBuy/detaill/tpl/index.html',
	resolve:{
		oHasLoggin:['$cookies', 'userModel',function($cookies, userModel){
			if($cookies.getObject('token')){
				var session = $cookies.getObject('token').sessionId;
				var params = {
					"sessionId": session,
				};
				return userModel.user_hasLoggedIn(params).then(function(data){
					return data;
				})
			}else{
				return false;
			}
		}],
		oDetail:['$stateParams','viewDataServices',function($stateParams, viewDataServices){
			var params = {
				'id': $stateParams.activityId,
				'sessionId': '',
			}
			return viewDataServices.requestData('cloudBuy_detail',params).then(function(data){
				return data;
			})
		}],
	},
	controller: 'CloudBuyDetaillCtrl',
	controllerAs:'vm',
}
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index.js":[function(require,module,exports){
'use strict';

angular.module('cloudbuy', [])


.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/index','/cloudbuy/index');
    $stateProvider
    .state('cloudbuy', {
            url: '/cloudbuy',
            templateUrl: 'index/layout.html'
        })
    .state('cloudbuy.index', require('./index/route'))
    .state('cloudbuy.detaill',require('./detaill/route'))
})

//CloudBuyIndex controller
.controller('CloudBuyIndexCtrl', require('./index/ctrl'))

//cloundBuyDetaill controller
.controller('CloudBuyDetaillCtrl',require('./detaill/ctrl'))



},{"./detaill/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\detaill\\ctrl.js","./detaill/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\detaill\\route.js","./index/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index\\ctrl.js","./index/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index\\route.js"}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index\\ctrl.js":[function(require,module,exports){
'use strict';

module.exports = ['$scope', '$state', '$stateParams', 'viewDataServices', 'shadeServices', 'oTabList', 'oDataList', 'oLottery', 'oNotice', 'oActivityNotice', function($scope, $state, $stateParams, viewDataServices , shadeServices,oTabList ,oDataList ,oLottery ,oNotice ,oActivityNotice) {
	
	var vm = this;
	// console.log(oTabList);
	// console.log(oDataList);
	// console.log(oLottery);
	console.log(oActivityNotice,'活动邀请通知还没处理');
	
	vm.notice = oNotice;
	vm.activityNotice = oActivityNotice;
	vm.tabList = oTabList;
	vm.DataList = oDataList;
	vm.LotteryList = oLottery;
	vm.activeList = oTabList[0];
	vm.isMore = true;
	vm.popModel = shadeServices;


	//初始化Swipe 这个需要操作 dom和ng-repeact一起使用需要延时先生成dom
	setTimeout(function(){
		//分类tab
		vm.swipeTab = Swipe({
		    queryClass: 'cloudbuy-tab-list',
		    rollBack: 50,
		    inlineMode: true,
		    rollBackDelay:500
		 });
		//即将揭晓
		vm.swipeLottery = Swipe({
		    queryClass: 'lottery-list',
		    rollBack: 50,
		    inlineMode: true,
		    rollBackDelay:500
		 });
	},200);
	

	//tab改变
	vm.tabChange = function(item){
		vm.activeList = item;
		var params = {
    			categoryId: vm.activeList.id,
    			page: 1,
    			pageSize: 10,
    		}
		viewDataServices.requestData('cloudBuy_list',params).then(function(data){
			if(data){
		 		vm.DataList = data;
			}
		});
	}

	//跳转读取信息
	vm.goNotice = function(){
		console.log('读取消息');
	}

	//跳转云购商品详细
	vm.goCloundBuyDetail = function(item){
		$state.go('cloudbuy.detaill',{
			activityId: item.activityId
		});
	}

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('cloudBuy_list').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.DataList = data;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//上拉加载
	vm.loadMore = function(){
		viewDataServices.loadMore('cloudBuy_list').then(function(data){
			console.log(data,'cloudBuy_list');
			if(data){
				vm.DataList.objects = vm.DataList.objects.concat(data.objects);
			}else{
				vm.isMore = false;
			}
			
		},function(error){
			console.log(error);
		})
	}


}]


},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index\\route.js":[function(require,module,exports){
'use strict';

module.exports = {
    url: '/index',
    templateUrl: 'index/cloudBuy/index/tpl/index.html',
    resolve: {
    	oTabList: ['viewDataServices', function(viewDataServices){
    		return viewDataServices.requestData('cloudBuy_tabList').then(function(data){
    		 		var home = {
                        name: '首页',
                        id: 0
                    };
                    data.unshift(home);
    		 		return data;
    		});
    	}],
    	oDataList: ['viewDataServices', function(viewDataServices){
    		var params = {
    			categoryId: 0,
    			page: 1,
    			pageSize: 10,
    		}
    		return viewDataServices.requestData('cloudBuy_list',params).then(function(data){
    		 		return data;
    		});
    	}],
        oLottery: ['viewDataServices', function(viewDataServices){
            var params = {
                page: 1,
                pageSize: 6,
            }
            return viewDataServices.requestData('activity_inLotteryList',params).then(function(data){
                    return data;
            });
        }],
        oNotice: ['$cookies', 'noticeModel', function($cookies, noticeModel){
            if($cookies.getObject('token')){
                var sessionId = $cookies.getObject('token').sessionId;
                var params = {
                    sessionId: sessionId,
                };
                return noticeModel.notice_getNoticeCount(params).then(function(data){
                    if(!data.error){
                        return data.result;
                    }else{
                        return null;
                    }
                })
            }else{
                return null;
            }
        }],
        oActivityNotice: ['$cookies', 'noticeModel', function($cookies, noticeModel){
            if($cookies.getObject('token')){
                var sessionId = $cookies.getObject('token').sessionId;
                var params = {
                    sessionId: sessionId,
                };
                return noticeModel.notice_getActivityCount(params).then(function(data){
                    if(!data.error){
                        return data.result;
                    }else{
                        return null;
                    }
                });
            }else{
                return null;
            }
        }],
    },
    controller: 'CloudBuyIndexCtrl',
    controllerAs:'vm',
}





},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\ctrl.js":[function(require,module,exports){
'use strict';

module.exports = ['$rootScope' , '$scope', '$state', '$stateParams', 'Constants', 'shadeServices' ,function($rootScope,  $scope, $state, $stateParams ,Constants ,shadeServices) {

		$scope.shade = shadeServices

		//路由状态改变
		$scope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
			$scope.shade.loading();
		});

		//路由跳转完成
		$scope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
			$scope.shade.hide();
			$scope.title = Constants.locales[toState.name];
			var routeState = {
				to:toState,
				from:fromState
			};
			sessionStorage.setItem('routeState',JSON.stringify(routeState));
		});

}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\index.js":[function(require,module,exports){
'use strict';

angular.module('goods', [])


.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('goods', {
            url: '/goods',
            templateUrl: 'index/layout.html'
        })
    .state('goods.participate',require('./participate/route'))
    .state('goods.towards',require('./towards/route'));
})


//GoodsParticipate controller
.controller('GoodsParticipateCtrl',require('./participate/ctrl'))

//GoodsTowards controller
.controller('GoodsTowardsCtrl',require('./towards/ctrl'))
},{"./participate/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\participate\\ctrl.js","./participate/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\participate\\route.js","./towards/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\towards\\ctrl.js","./towards/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\towards\\route.js"}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\participate\\ctrl.js":[function(require,module,exports){
'use strict';

module.exports=['$scope' ,'$state' ,'shadeServices' ,'viewDataServices', 'oBuyList', function($scope ,$state ,shadeServices ,viewDataServices ,oBuyList){
	var vm = this;
		vm.isMore = true;
		vm.buyList = oBuyList.objects;
		
		console.log(vm.buyList);

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('goods_BuyList').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.buyList = data.objects;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//上拉加载
	vm.loadMore = function(){
		viewDataServices.loadMore('goods_BuyList').then(function(data){
			console.log(data,'loadMore');
			if(data){
				vm.buyList = vm.buyList.concat(data.objects);
			}else{
				vm.isMore = false;
			}
			
		},function(error){
			console.log(error);
		})
	}

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	//回到首页
	vm.goHome = function(){
		$state.go('cloudbuy.index');
	}
	
}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\participate\\route.js":[function(require,module,exports){
'use strict';

module.exports = {
	url: '/participate/:activityId',
	templateUrl: 'index/goods/participate/tpl/index.html',
	resolve:{
		oBuyList:['$stateParams','viewDataServices',function($stateParams, viewDataServices){
			var params = {
				"id": $stateParams.activityId,
				"page": 1,
				"pageSize": 10,
			};
			return viewDataServices.requestData('goods_BuyList',params).then(function(data){
				return data;
			})
		}],
	},
	controller: 'GoodsParticipateCtrl',
	controllerAs:'vm',
}
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\towards\\ctrl.js":[function(require,module,exports){
'use strict';

module.exports=['$scope' ,'$state' ,'shadeServices' ,'viewDataServices', 'oBuyList', function($scope ,$state ,shadeServices ,viewDataServices ,oBuyList){
	var vm = this;
		vm.isMore = true;
		vm.buyList = oBuyList.objects;
		
		console.log(vm.buyList);

	//下拉刷新
	vm.doRefresh = function(){
		viewDataServices.doRefresh('goods_toward').then(function(data){
			console.log(data,'doRefresh');
			if(data){
				vm.buyList = data.objects;
				vm.isMore = true;
			}
		},function(error){
			console.log(error);
		})
	}

	//上拉加载
	vm.loadMore = function(){
		viewDataServices.loadMore('goods_toward').then(function(data){
			console.log(data,'loadMore');
			if(data){
				vm.buyList = vm.buyList.concat(data.objects);
			}else{
				vm.isMore = false;
			}
			
		},function(error){
			console.log(error);
		})
	}

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	
}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\towards\\route.js":[function(require,module,exports){
'use strict';

module.exports = {
	url: '/towards/:goodsId',
	templateUrl: 'index/goods/towards/tpl/index.html',
	resolve:{
		oBuyList:['$stateParams','viewDataServices',function($stateParams, viewDataServices){
			var params = {
				"id": $stateParams.goodsId,
				"page": 1,
				"pageSize": 10,
			};
			return viewDataServices.requestData('goods_toward',params).then(function(data){
				return data;
			})
		}],
	},
	controller: 'GoodsTowardsCtrl',
	controllerAs:'vm',
}
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\index.js":[function(require,module,exports){
'use strict';

require('./cloudBuy/index');
require('./user/index');
require('./goods/index');

angular.module('app', [
    //插件依赖
    // 'ionic'
    'ngCookies',
    'ui.router',

    //公共部分
    'template',
    'constants',
    'directives',
    'services',
    'factories',
    'models',
    'filters',

    //业务代码
    'cloudbuy',
    'user',
    'goods',
])

.config(function($urlRouterProvider) {

    $urlRouterProvider.when('','/index');
    // redirect
    // $urlRouterProvider.otherwise('/error/404');
})

.controller('AppCtrl', require('./ctrl'))


},{"./cloudBuy/index":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\cloudBuy\\index.js","./ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\ctrl.js","./goods/index":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\goods\\index.js","./user/index":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index.js"}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index.js":[function(require,module,exports){
'use strict';

angular.module('user', [])

.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/user','/user/index');
    $stateProvider
    .state('user', {
            url: '/user',
            templateUrl: 'index/layout.html'
        })
    .state('user.index', require('./index/route'))
    .state('user.login',require('./login/route'))
})

//UserIndex controller
.controller('UserIndexCtrl', require('./index/ctrl'))

//UserLogin controller
.controller('UserLoginCtrl',require('./login/ctrl'))




},{"./index/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index\\ctrl.js","./index/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index\\route.js","./login/ctrl":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\login\\ctrl.js","./login/route":"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\login\\route.js"}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index\\ctrl.js":[function(require,module,exports){
'user strict';

module.exports=['$scope', '$state', '$cookies', 'shadeServices', 'oHasLoggin', 'oUserInfo', function($scope ,$state ,$cookies ,shadeServices ,oHasLoggin ,oUserInfo){
	var vm = this;
		vm.popModel = shadeServices;
		vm.userInfo = oUserInfo? oUserInfo.result : false;

		console.log(vm.userInfo);

	//判断是否在其他设备登录
	vm.initHasloggin = function(){
		if(oHasLoggin.error){
			if(oHasLoggin.error.code === -20109){
				$cookies.remove('token');
				vm.popModel.confirm({
					content:'您的账号在其他设备登录',
					button:[
						{
							text:'确定',
							callback:function(){
								vm.popModel.hide();
							}
						}
					]
				});
			}
		}
	}

	//去登录
	vm.goLogin = function(){
		$state.go('user.login');
	}


	vm.initHasloggin();
}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\index\\route.js":[function(require,module,exports){
'use strict';


module.exports={
	url: '/index',
	templateUrl: 'index/user/index/tpl/index.html',
	controller: 'UserIndexCtrl',
	resolve: {
		oHasLoggin:['$cookies', 'userModel',function($cookies, userModel){
			if($cookies.getObject('token')){
				var session = $cookies.getObject('token').sessionId;
				var params = {
					"sessionId": session,
				};
				return userModel.user_hasLoggedIn(params).then(function(data){
					return data;
				})
			}else{
				return false;
			}
		}],
		oUserInfo:['$cookies', 'userModel',function($cookies, userModel){
			if($cookies.getObject('token')){
				var session = $cookies.getObject('token').sessionId;
				var params = {
					"sessionId": session,
				};
				return userModel.user_info(params).then(function(data){
					return data;
				})
			}else{
				return false;
			}
		}]
	},
    controllerAs:'vm',
}
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\login\\ctrl.js":[function(require,module,exports){
'user strict';

module.exports=['$scope', '$cookies', '$interval', '$timeout', 'tonkenServices', 'userModel', 'shadeServices', function($scope ,$cookies ,$interval ,$timeout ,tonkenServices ,userModel ,shadeServices ){
	var vm = this;
		vm.popModel = shadeServices;
		vm.radioChecked = true;
		vm.countDown = false;
		vm.verification = '发送验证码';
		vm.user = {
			mobile: '',
			password: '',
			platform: 3,
			promoCode: tonkenServices.getLoginPromoCode()
		};

	//回退
	vm.goBack = function(){
		window.history.back();
	}

	//发送验证码
	vm.getVerification = function(){
		if(!vm.countDown){
			vm.countDown = 60;
			vm.verification = vm.countDown+'秒后重新发送';
			var timer = $interval(function(){
				vm.countDown--;
				if(vm.countDown < 0){
					$interval.cancel(timer);
					vm.countDown = false;
					vm.verification = '发送验证码';
				}else{
					vm.verification = vm.countDown+'秒后重新发送';
				}
				 $timeout(function() {
		            $interval.cancel(timer);
		        }, 61000);
			},1000,200);

			var params = {
				'mobile' : vm.user.mobile,
			};
			userModel.user_mvcode(params).then(function(data){
				if(!data.error){
					vm.popModel.confirm({
						content: '验证码已发送',
						button:[
							{
								text:'确定',
								callback:function(){
									vm.popModel.hide();
								}
							}
						]
					});
				}else{
					$interval.cancel(timer);
					vm.popModel.confirm({
						content:data.error.message,
						button:[
							{
								text:'确定',
								callback:function(){
									vm.countDown = false;
									vm.verification = '发送验证码';
									vm.popModel.hide();
								}
							}
						]
					});
				}
			});
		}
	}
	

	//登录
	vm.submitLogin = function(){
		var params = {
			"mobile": vm.user.mobile,
			"password": vm.user.password,
			"platform": vm.user.platform,
			"promoCode": vm.user.promoCode,
		};
		userModel.user_login(params).then(function(data){
			if(!data.error){
				tonkenServices.loginSucces(data.result);
				window.history.back();
			}else{
				vm.popModel.error(data.error.code);
			}
		});
	}

	//协议点击
	vm.radioClick = function(){
		vm.radioChecked = !vm.radioChecked;
	}

}]
},{}],"E:\\project-rebuild-list\\jphd\\app\\js\\index\\user\\login\\route.js":[function(require,module,exports){
'use strict';


module.exports={
	url: '/login',
	templateUrl: 'index/user/login/tpl/index.html',
	controller: 'UserLoginCtrl',
    controllerAs:'vm',
}
},{}]},{},["E:\\project-rebuild-list\\jphd\\app\\js\\index\\index.js"]);
