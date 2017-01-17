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