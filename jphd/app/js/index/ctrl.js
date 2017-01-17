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