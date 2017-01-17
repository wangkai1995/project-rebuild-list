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